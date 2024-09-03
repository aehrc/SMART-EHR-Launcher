function useValidateCodeAndState() {
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code") ?? null;
  const state = queryParams.get("state") ?? null;

  if (!code || !state) {
    return { code, stateIsValid: false };
  }

  // Compare state from session storage with state from URL
  const storedState = sessionStorage.getItem("state");
  if (state !== storedState) {
    console.error("State mismatch");
    return { code, stateIsValid: false };
  }

  return { code, stateIsValid: true };
}

export default useValidateCodeAndState;
