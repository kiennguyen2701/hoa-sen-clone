import { supabase } from './supabase';

export async function listTours() {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTourBySlug(slug) {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function listToursForAdmin() {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createTour(payload) {
  const { data, error } = await supabase
    .from('tours')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTour(id, payload) {
  const { data, error } = await supabase
    .from('tours')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTour(id) {
  const { error } = await supabase.from('tours').delete().eq('id', id);
  if (error) throw error;
}

export async function uploadTourImage(file) {
  const ext = file.name.split('.').pop();
  const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('tour-images')
    .upload(filePath, file, { upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from('tour-images').getPublicUrl(filePath);
  return data.publicUrl;
}