import useSmartConfiguration from "@/hooks/useSmartConfiguration.ts";
import { useContext, useEffect, useMemo } from "react";
import { responseIsTokenResponse } from "@/utils/oauth.ts";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";

interface useRequestTokenProps {
  grantType: string;
  code: string | null;
  redirectUri: string;
  clientId: string;
}

export function useRequestTokenCode(props: useRequestTokenProps): {
  tokenStatus: "loading" | "error";
} {
  const { grantType, code, redirectUri, clientId } = props;

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
    if (tokenEndpoint && code) {
      // Perform token request
      fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: grantType,
          code: code,
          redirect_uri: redirectUri,
          client_id: clientId,
        }),
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
    grantType,
    code,
    redirectUri,
    clientId,
    tokenEndpoint,
    setTokenResponse,
    navigate,
    enqueueSnackbar,
  ]);

  // Token endpoint not found, return error
  if (tokenEndpoint === null) {
    return { tokenStatus: "error" };
  }

  // Token request in progress, return loading
  return { tokenStatus: "loading" };
}

export default useRequestTokenCode;
