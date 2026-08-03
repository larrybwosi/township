const getRuntimeEnv = (key: string, fallback: string): string => {
  if (typeof window !== "undefined") {
    return (window as typeof window & { __ENV?: Record<string, string> }).__ENV?.[key] || fallback;
  }
  return process.env[key] || fallback;
};

export const apiVersion =
  getRuntimeEnv("NEXT_PUBLIC_SANITY_API_VERSION", "2026-08-01");

export const dataset =
  getRuntimeEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

export const projectId =
  getRuntimeEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "mock-project-id");
