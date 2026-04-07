const REFERRAL_STORAGE_KEY = 'mvip_collaborator_ref';

export function normalizeCollaboratorCode(value) {
  return String(value || '').trim().toUpperCase();
}

export function saveCollaboratorRef(code) {
  const normalized = normalizeCollaboratorCode(code);
  if (!normalized) return null;

  const payload = {
    code: normalized,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export function getSavedCollaboratorRef() {
  try {
    const raw = localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.code) return null;

    return {
      code: normalizeCollaboratorCode(parsed.code),
      savedAt: parsed.savedAt || null,
    };
  } catch {
    return null;
  }
}

export function getSavedCollaboratorCode() {
  return getSavedCollaboratorRef()?.code || '';
}

export function clearCollaboratorRef() {
  localStorage.removeItem(REFERRAL_STORAGE_KEY);
}

export function captureCollaboratorRefFromUrl() {
  if (typeof window === 'undefined') return '';

  const url = new URL(window.location.href);
  const ref = url.searchParams.get('ref') || url.searchParams.get('ctv');

  if (!ref) return getSavedCollaboratorCode();

  saveCollaboratorRef(ref);
  return normalizeCollaboratorCode(ref);
}