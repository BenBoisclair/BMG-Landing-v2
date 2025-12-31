/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Contact configuration environment variables
  readonly CONTACT_ADDRESS?: string;
  readonly CONTACT_PHONES?: string;
  readonly CONTACT_EMAIL?: string;
  readonly CONTACT_SOCIALS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
