import { supabase } from './supabase';

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session || null;
}

export async function signInWithPassword(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut({ scope: 'global' });
  if (error) throw error;

  try {
    localStorage.removeItem('mvip_collaborator_ref');
    sessionStorage.clear();
  } catch {
    // ignore
  }
}

export async function getUserRole(user) {
  if (!user?.id) return null;

  const [{ data: adminRow, error: adminError }, { data: collabRow, error: collabError }] =
    await Promise.all([
      supabase.from('admin_users').select('user_id, email').eq('user_id', user.id).maybeSingle(),
      supabase
        .from('collaborator_users')
        .select('user_id, email, collaborator_id, role, is_active')
        .eq('user_id', user.id)
        .maybeSingle(),
    ]);

  if (adminError) throw adminError;
  if (collabError) throw collabError;

  if (adminRow) {
    return {
      role: 'admin',
      user,
      admin: adminRow,
    };
  }

  if (collabRow && collabRow.is_active) {
    return {
      role: 'collaborator',
      user,
      collaboratorUser: collabRow,
    };
  }

  return null;
}