/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_EVE_CLIENT_ID?: string;
  readonly VITE_EVE_SSO_REDIRECT_URI?: string;
  readonly VITE_EVE_SSO_SCOPES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
