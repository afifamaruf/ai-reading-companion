const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable "${key}" is not defined`);
  }

  return value;
};

export const env = {
  API_BASE_URL: getEnvVar("NEXT_PUBLIC_API_URL", "http://localhost:8000"),
  APP_ENV: getEnvVar("NEXT_PUBLIC_APP", "development"),
  isDevelopment: process.env.NEXT_PUBLIC_API_ENV !== "production",
} as const;
