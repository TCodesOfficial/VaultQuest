/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the NestJS API, no trailing slash. */
  readonly VITE_API_BASE_URL?: string;
  /** Socket.IO server URL, used by the real-time slice. */
  readonly VITE_WS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
