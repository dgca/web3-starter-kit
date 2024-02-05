import { contractAddresses } from "contracts";

import { getEnv } from "@/utils/getEnv";

export function getContractAddresses() {
  const env = getEnv();

  if (env === "development") {
    return contractAddresses.localhost;
  }

  throw new Error(`Contract addresses not found for env: ${env}`);
}
