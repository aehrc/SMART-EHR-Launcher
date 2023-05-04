import { LauncherQuery } from "../hooks/useLauncherQuery.ts";
import type { LaunchParams } from "./codec.ts";

export function getValidationErrors(
  launch: LaunchParams,
  query: LauncherQuery
) {
  const { launch_type } = launch;
  const { launch_url } = query;
  const isStandaloneLaunch = launch_type.includes("standalone");
  const isBackendService = launch_type === "backend-service";
  const isAsymmetric =
    launch_type === "backend-service" ||
    launch.client_type === "confidential-asymmetric";

  const validationErrors: string[] = [];
  if (!isStandaloneLaunch && !isBackendService) {
    if (!launch_url) {
      validationErrors.push("Missing app launch URL");
    } else if (!launch_url.match(/^https?:\/\/.+/)) {
      validationErrors.push("Invalid app launch URL");
    }
  }

  if (isAsymmetric) {
    try {
      JSON.parse(launch.jwks || "null");
    } catch {
      validationErrors.push("Invalid JWKS JSON");
    }

    if (launch.jwks_url) {
      try {
        new URL(launch.jwks_url);
      } catch {
        validationErrors.push("Invalid JWKS URL");
      }
    }
  }

  return validationErrors;
}
