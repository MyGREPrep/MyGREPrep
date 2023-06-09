declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      POSTGRES_DBNAME: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
    }
  }
}

export {}
