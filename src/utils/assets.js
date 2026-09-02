/** Resolves repo-hosted assets against Vite base; passes external URLs through. */
export const asset = (p) => (/^https?:/.test(p) ? p : `${import.meta.env.BASE_URL}assets/${p}`);
