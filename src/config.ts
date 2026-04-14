/**
 * Site-wide configuration constants.
 * Source unique — modifier ici si le base path ou les URLs changent.
 */

/** Base path du site (sans slash final) */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** URL racine du site */
export const SITE_URL = 'https://zacharierousselon.github.io';

/** Lien HelloAsso */
export const HELLOASSO_URL = 'https://www.helloasso.com/associations/perou-amitie-solidarite/';

/** Lien Facebook */
export const FACEBOOK_URL = 'https://www.facebook.com/perouamitiesolidariteofficiel';

/** Image OG par défaut */
export const DEFAULT_OG_IMAGE = `${BASE}/assets/images/reg-cus-ville001-1280x800.jpeg`;
