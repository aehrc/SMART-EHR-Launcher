import useValidateCodeAndState from "@/hooks/useValidateCodeAndState.ts";
import { LAUNCH_CLIENT_ID, LAUNCH_SCOPE } from "@/globals.ts";
import { getFhirServerBaseUrl } from "@/utils/misc.ts";
import { Button } from "@/components/ui/button.tsx";
import useRequestToken from "@/hooks/useRequestToken.ts";
import useAuthorize from "@/hooks/useAuthorize.ts";

const responseType = "code";
const clientId = LAUNCH_CLIENT_ID;
const scope = LAUNCH_SCOPE;
const aud = getFhirServerBaseUrl();
const grantType = "authorization_code";

function AuthCallback() {
  const { protocol, host } = window.location;

  const redirectUri = `${protocol}//${host}/authcallback`;

  // Check if code and state are present/valid
  const { code, stateIsValid } = useValidateCodeAndState();

  // Perform authorize() if code missing or state is invalid
  const { authorizeStatus } = useAuthorize({
    responseType,
    clientId,
    redirectUri,
    scope,
    aud,
    enabled: !stateIsValid,
  });

  // Perform token() if authorisation is complete i.e. code and state are valid
  const { tokenStatus } = useRequestToken({
    grantType,
    code,
    redirectUri,
    clientId,
  });

  if (authorizeStatus === "error") {
    return (
      <div className="container flex items-center h-screen mx-auto">
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            Authorisation error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            We are unable to authorise your request
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            It is likely that an authorisation endpoint is not available at the
            source server.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button
              className="text-white bg-blue-500 hover:bg-blue-600"
              size="sm"
              onClick={() => {
                window.location.href = `${protocol}//${host}`;
              }}
            >
              Retry authorisation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (tokenStatus === "error") {
    return (
      <div className="container flex items-center h-screen mx-auto">
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            Token request error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            We are unable to request an access token
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Authorisation is successful, but there is an issue performing a
            token request from the source server.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button
              className="text-white bg-blue-500 hover:bg-blue-600"
              size="sm"
              onClick={() => {
                window.location.href = `${protocol}//${host}`;
              }}
            >
              Retry authorisation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Every other status should show loading spinner
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <div className="border-gray-200 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      <div className="sr-only">Loading</div>
    </div>
  );
}

export default AuthCallback;
