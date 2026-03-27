import { supabase } from './supabase';

export async function getSetting(key) {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', key)
    .single();

  if (error) throw error;
  return data?.value ?? null;
}

export async function upsertSetting(key, value) {
  const { data, error } = await supabase
    .from('site_settings')
    .upsert({ key, value }, { onConflict: 'key' })
    .select()
    .single();

  if (error) throw error;
  return data;
}