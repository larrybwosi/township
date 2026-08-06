import { z } from "zod";

// Helper to determine runtime environment extraction (browser vs server)
const getRuntimeEnv = (key: string, fallback: string = ""): string => {
  if (typeof window !== "undefined") {
    const win = window as unknown as { __ENV?: Record<string, string> };
    return win.__ENV?.[key] || fallback;
  }
  return (process.env[key] as string) || fallback;
};

// -------------------------------------------------------------
// 1. Backend (API) Environment Schema & Parser
// -------------------------------------------------------------
export const apiEnvSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("3000"),
  DATABASE_URL: z
    .string()
    .url()
    .default("postgresql://user:password@postgres:5432/township?schema=public"),
  JWT_SECRET: z.string().min(1).default("mySuperSecretKey"),
  RABBITMQ_URL: z.string().url().default("amqp://guest:guest@rabbitmq:5672"),
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

export const getApiEnv = (): ApiEnv => {
  /* eslint-disable turbo/no-undeclared-env-vars */
  const rawEnv = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    RABBITMQ_URL: process.env.RABBITMQ_URL,
  };
  /* eslint-enable turbo/no-undeclared-env-vars */

  const parsed = apiEnvSchema.safeParse(rawEnv);
  if (!parsed.success) {
    console.error("❌ Invalid API Environment Variables:", parsed.error.format());
    throw new Error("Invalid API Environment Variables");
  }
  return parsed.data;
};

// -------------------------------------------------------------
// 2. Frontend Environment Schema & Parser
// -------------------------------------------------------------
export const frontendEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1).default("mock-project-id"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).default("production"),
  NEXT_PUBLIC_API_URL: z.string().min(1).default("http://localhost:3000"),
  SANITY_API_TOKEN: z.string().optional().default(""),
});

export type FrontendEnv = z.infer<typeof frontendEnvSchema>;

export const getFrontendEnv = (): FrontendEnv => {
  /* eslint-disable turbo/no-undeclared-env-vars */
  const rawEnv = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: getRuntimeEnv("NEXT_PUBLIC_SANITY_PROJECT_ID") || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: getRuntimeEnv("NEXT_PUBLIC_SANITY_DATASET") || process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_API_URL: getRuntimeEnv("NEXT_PUBLIC_API_URL") || process.env.NEXT_PUBLIC_API_URL,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  };
  /* eslint-enable turbo/no-undeclared-env-vars */

  const parsed = frontendEnvSchema.safeParse(rawEnv);
  if (!parsed.success) {
    console.error("❌ Invalid Frontend Environment Variables:", parsed.error.format());
    throw new Error("Invalid Frontend Environment Variables");
  }
  return parsed.data;
};

// -------------------------------------------------------------
// 3. Export evaluated environment objects
// -------------------------------------------------------------
// Safe wrapper for environments so importing doesn't crash during build or testing if we just need types/objects.
export const apiEnv = typeof process !== "undefined" && process.env ? getApiEnv() : {} as ApiEnv;
export const frontendEnv = getFrontendEnv();
