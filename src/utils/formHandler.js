/**
 * Brief form handler — serialized data contract, ready for any backend.
 * Point FORM_ENDPOINT at Formspree / your API: zero refactor needed.
 * Validation via native constraint API; payload built explicitly.
 */
const FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxx'

export async function handleBriefSubmit(e, onSuccess, onError) {
  e.preventDefault();
  const form = e.target;
  if (!form.reportValidity()) return;

  const payload = {
    name: form.name?.value || '',
    email: form.email?.value || '',
    types: Array.from(form.querySelectorAll('input[name="type"]:checked')).map((i) => i.value),
    location: form.querySelector('input[name="location"]:checked')?.value || null,
    budget: form.budget?.value || null,
    message: form.message?.value || '',
    sentAt: new Date().toISOString(),
  };

  try {
    if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Form submission failed');
    }
    onSuccess?.(payload);
    form.reset();
  } catch (err) {
    onError?.(err);
  }
}
