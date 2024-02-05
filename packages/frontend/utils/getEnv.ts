export function getEnv() {
  const env = process.env.NEXT_PUBLIC_ENV ?? "development";

  if (!env || !["development", "testnet", "mainnet"].includes(env)) {
    throw new Error("Invalid NEXT_PUBLIC_ENV");
  }

  return env as "development" | "testnet" | "mainnet";
}
