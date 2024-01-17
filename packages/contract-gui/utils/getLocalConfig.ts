export async function getLocalConfig() {
  if (
    process.env.NEXT_PUBLIC_USE_LOCAL_CONFIG !== "true" ||
    process.env.NODE_ENV === "production"
  ) {
    return null;
  }

  const config = await import("../local-config/index");
  return config.default;
}
