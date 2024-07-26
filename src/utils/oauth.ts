export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  id_token: string;
  practitioner: string | null;
  refresh_token?: string;
}

export function responseIsAccessTokenResponse(
  response: any
): response is AccessTokenResponse {
  return (
    response.access_token !== undefined &&
    response.token_type !== undefined &&
    response.expires_in !== undefined &&
    response.scope !== undefined &&
    response.id_token !== undefined
  );
}

export interface IdToken {
  at_hash: string;
  aud: string;
  auth_time: number;
  exp: string;
  fhirUser: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  profile: string;
  sub: string;
}

export function IsValidIdToken(idToken: any): idToken is IdToken {
  return (
    idToken.aud !== undefined &&
    idToken.fhirUser !== undefined &&
    idToken.iss !== undefined
  );
}
