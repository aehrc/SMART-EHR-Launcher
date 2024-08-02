import useSmartConfiguration from "@/hooks/useSmartConfiguration.ts";
import { useContext, useEffect, useMemo } from "react";
import { responseIsTokenResponse } from "@/utils/oauth.ts";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";

// This is a sample implementation of a hook that requests a token using your own OAuth2.0 method.
// It does not work out of the box and requires you to replace the fetch method with your own.

interface useSampleRequestTokenMethodProps {
  grantType: string;
  scope: string;
  aud: string;
  clientId: string;
  // Add other parameters here as required
}

export function useSampleRequestTokenMethod(
  props: useSampleRequestTokenMethodProps
): {
  tokenStatus: "loading" | "error";
} {
  const { grantType, scope, aud, clientId } = props;

  const { setTokenEndpoint, setTokenResponse } = useContext(FhirServerContext);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Get token endpoint
  const smartConfiguration = useSmartConfiguration();

  const tokenEndpoint = useMemo(() => {
    if (smartConfiguration) {
      try {
        return smartConfiguration.token_endpoint;
      } catch (e) {
        console.error(e);
        return null;
      }
    }

    return "";
  }, [smartConfiguration]);

  // Create token request
  useEffect(() => {
    if (tokenEndpoint) {
      // Sample token request

      fetch(tokenEndpoint, {
        /*
          Replace with your own OAuth2.0 method
        */
      })
        .then(async (res) => {
          const resBody = await res.json();
          if (responseIsTokenResponse(resBody)) {
            setTokenEndpoint(tokenEndpoint);
            setTokenResponse(resBody);

            // Retrieve saved search params and navigate
            const paramsString = sessionStorage.getItem("initialSearchParams");
            const searchParams = paramsString
              ? new URLSearchParams(paramsString)
              : new URLSearchParams();

            navigate({
              pathname: "/",
              search: `${searchParams.toString()}`,
            });
          } else {
            console.error(resBody);
            enqueueSnackbar(
              `There is an issue performing a token request. View console for details.`,
              {
                variant: "error",
                preventDuplicate: true,
              }
            );
          }
        })
        .catch((e) => {
          console.error(e);
          enqueueSnackbar(
            `There is an issue performing a token request. View console for details.`,
            {
              variant: "error",
              preventDuplicate: true,
            }
          );
        });
    }
  }, [
    tokenEndpoint,
    grantType,
    scope,
    aud,
    clientId,
    setTokenResponse,
    navigate,
    enqueueSnackbar,
    setTokenEndpoint,
  ]);

  // Token endpoint not found, return error
  if (tokenEndpoint === null) {
    return { tokenStatus: "error" };
  }

  // Token request in progress, return loading
  return { tokenStatus: "loading" };
}

export default useSampleRequestTokenMethod;
