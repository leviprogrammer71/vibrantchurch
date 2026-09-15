/**
 * Submit form data to the "vibrant-church-form" Google Sheet
 * via a deployed Google Apps Script Web App.
 *
 * The URL is read from VITE_GOOGLE_SHEET_URL at build time.
 * If the env var is missing the submission is silently skipped
 * (the form still saves to localStorage and tries the email API).
 */

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL as string | undefined;

interface FormPayload {
  /** Which form submitted: "Contact" | "Visit" | etc. */
  form: string;
  name: string;
  email: string;
  subject?: string;
  message?: string;
}

/**
 * Fire-and-forget POST to the Google Sheet endpoint.
 * Returns `true` on success, `false` on any failure.
 * Never throws — callers don't need to wrap this in try/catch.
 */
export async function submitToGoogleSheet(payload: FormPayload): Promise<boolean> {
  if (!SHEET_URL) {
    console.warn('[GoogleSheet] VITE_GOOGLE_SHEET_URL not set — skipping sheet submission');
    return false;
  }

  try {
    const res = await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script doesn't support preflight; no-cors is fine for fire-and-forget
      headers: { 'Content-Type': 'text/plain' }, // avoid preflight
      body: JSON.stringify(payload),
    });

    // With no-cors the response is opaque — we can't read .ok or body.
    // A successful Apps Script POST returns 302 → 200, which fetch follows
    // transparently. If we get here without throwing, assume success.
    return true;
  } catch (err) {
    console.warn('[GoogleSheet] Submission failed:', err);
    return false;
  }
}
