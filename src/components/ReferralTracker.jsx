import { useEffect } from 'react';
import { captureCollaboratorRefFromUrl } from '../lib/referral';

export default function ReferralTracker() {
  useEffect(() => {
    captureCollaboratorRefFromUrl();
  }, []);

  return null;
}