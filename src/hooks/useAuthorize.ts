import useSmartConfiguration from "@/hooks/useSmartConfiguration.ts";
import { useEffect, useMemo } from "react";

interface useAuthorizeProps {
  responseType: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  aud: string;
  enabled: boolean;
}

export function useAuthorize(props: useAuthorizeProps): {
  authorizeStatus: "complete" | "loading" | "error";
} {
  const {
    responseType,
    clientId,
    redirectUri,
    scope,
    aud,
    enabled = true,
  } = props;

  // Get authorize endpoint
  const smartConfiguration = useSmartConfiguration();

  const authorizationEndpoint = useMemo(() => {
    if (smartConfiguration) {
      try {
        return smartConfiguration.authorization_endpoint;
      } catch (e) {
        console.error(e);
        return null;
      }
    }

    return "";
  }, [smartConfiguration]);

  // Create authorize request
  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (authorizationEndpoint) {
      const state = createNonce();

      // Save state to session storage
      sessionStorage.setItem("state", state);

      // Manually encode scope
      const encodedScope = encodeURIComponent(scope);

      // Redirect to constructed authorize URL
      window.location.href =
        authorizationEndpoint +
        "?" +
        new URLSearchParams({
          response_type: responseType,
          client_id: clientId,
          redirect_uri: redirectUri,
          aud: aud,
          state: state,
        }) +
        "&scope=" +
        encodedScope;
    }
  }, [
    authorizationEndpoint,
    responseType,
    clientId,
    redirectUri,
    aud,
    scope,
    enabled,
  ]);

  // Authorization endpoint not found, return error
  if (authorizationEndpoint === null) {
    return { authorizeStatus: "error" };
  }

  // Authorization request already completed, return complete
  if (!enabled) {
    return { authorizeStatus: "complete" };
  }

  // Authorization request in progress, return loading
  return { authorizeStatus: "loading" };
}

function createNonce() {
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let nonce = "";
  for (let i = 0; i < 40; i++) {
    nonce += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }

  return nonce;
}

export default useAuthorize;
