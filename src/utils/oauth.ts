export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  practitioner: string | null;
  id_token?: string;
  refresh_token?: string;
}

export function responseIsAccessTokenResponse(
  response: any
): response is AccessTokenResponse {
  return (
    response.access_token !== undefined &&
    response.token_type !== undefined &&
    response.expires_in !== undefined &&
    response.scope !== undefined
  );
}
