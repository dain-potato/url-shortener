/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // add more env vars here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
