/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Contact configuration environment variables
  readonly CONTACT_ADDRESS?: string;
  readonly CONTACT_PHONES?: string;
  readonly CONTACT_EMAIL?: string;
  readonly CONTACT_SOCIALS?: string;

  // Sanity CMS configuration
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_SANITY_API_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
