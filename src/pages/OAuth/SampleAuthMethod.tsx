import { Button } from "@/components/ui/button.tsx";
import { OAUTH_CLIENT_ID, OAUTH_GRANT_TYPE, OAUTH_SCOPE } from "@/globals.ts";
import { getFhirServerBaseUrl } from "@/utils/misc.ts";
import useSampleRequestTokenMethod from "@/hooks/useRequestTokenClientCredentials.ts";

// This is a sample implementation of a React functional component for your own OAuth2.0 methods, does not work out of the box

const clientId = OAUTH_CLIENT_ID;
const scope = OAUTH_SCOPE;
const aud = getFhirServerBaseUrl();
const grantType = OAUTH_GRANT_TYPE;
// Add other parameters here as required

function SampleAuthMethod() {
  const { protocol, host } = window.location;

  // Sample token request hook, does not work out of the box
  const { tokenStatus } = useSampleRequestTokenMethod({
    grantType,
    scope,
    aud,
    clientId,
    // Add other parameters here as required
  });

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

export default SampleAuthMethod;
