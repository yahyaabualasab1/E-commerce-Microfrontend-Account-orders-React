type Environment = {
  apiBaseUrl: string;
};

export const environment: Environment = {
  apiBaseUrl: String(import.meta.env.VITE_API_BASE_URL ?? '/api'),
};
