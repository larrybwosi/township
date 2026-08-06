import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getApiEnv, getFrontendEnv } from "../src";

/* eslint-disable turbo/no-undeclared-env-vars */
describe("Environment Variables Package", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should successfully parse valid API environment variables", () => {
    process.env.PORT = "4000";
    process.env.DATABASE_URL = "postgresql://root:secret@localhost:5432/db";
    process.env.JWT_SECRET = "superSecret";
    process.env.RABBITMQ_URL = "amqp://user:pass@localhost:5672";

    const env = getApiEnv();
    expect(env.PORT).toBe(4000);
    expect(env.DATABASE_URL).toBe("postgresql://root:secret@localhost:5432/db");
    expect(env.JWT_SECRET).toBe("superSecret");
    expect(env.RABBITMQ_URL).toBe("amqp://user:pass@localhost:5672");
  });

  it("should parse default API environment variables when optional or missing", () => {
    // Delete potential actual env vars to test defaults
    delete process.env.PORT;
    delete process.env.DATABASE_URL;
    delete process.env.JWT_SECRET;
    delete process.env.RABBITMQ_URL;

    const env = getApiEnv();
    expect(env.PORT).toBe(3000);
    expect(env.DATABASE_URL).toBe("postgresql://user:password@postgres:5432/township?schema=public");
    expect(env.JWT_SECRET).toBe("mySuperSecretKey");
    expect(env.RABBITMQ_URL).toBe("amqp://guest:guest@rabbitmq:5672");
  });

  it("should successfully parse frontend environment variables", () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "my-sanity-project";
    process.env.NEXT_PUBLIC_SANITY_DATASET = "staging";
    process.env.NEXT_PUBLIC_API_URL = "https://api.my-app.com";
    process.env.SANITY_API_TOKEN = "my-token";

    const env = getFrontendEnv();
    expect(env.NEXT_PUBLIC_SANITY_PROJECT_ID).toBe("my-sanity-project");
    expect(env.NEXT_PUBLIC_SANITY_DATASET).toBe("staging");
    expect(env.NEXT_PUBLIC_API_URL).toBe("https://api.my-app.com");
    expect(env.SANITY_API_TOKEN).toBe("my-token");
  });

  it("should parse default Frontend environment variables when missing", () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    delete process.env.NEXT_PUBLIC_SANITY_DATASET;
    delete process.env.NEXT_PUBLIC_API_URL;
    delete process.env.SANITY_API_TOKEN;

    const env = getFrontendEnv();
    expect(env.NEXT_PUBLIC_SANITY_PROJECT_ID).toBe("mock-project-id");
    expect(env.NEXT_PUBLIC_SANITY_DATASET).toBe("production");
    expect(env.NEXT_PUBLIC_API_URL).toBe("http://localhost:3000");
    expect(env.SANITY_API_TOKEN).toBe("");
  });
});
/* eslint-enable turbo/no-undeclared-env-vars */
