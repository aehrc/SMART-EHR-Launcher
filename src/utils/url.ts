export function transformUrlWithVersion(baseUrl: string, requestUrl: string) {
  const fullUrlString = baseUrl + requestUrl;

  try {
    const fullUrl = new URL(fullUrlString);

    if (fullUrl.href.includes("|")) {
      const [, version] = fullUrl.href.split("|");
      if (version) {
        const requestUrlWithoutVersion = requestUrl.split("|")[0];
        return `${requestUrlWithoutVersion}&version=${encodeURIComponent(
          version
        )}`;
      }
    }

    return requestUrl;
  } catch (error) {
    console.error(
      "Error while transforming URL with version, omitting version:",
      error
    );

    // Return the original URL without the piped version
    return requestUrl.split("|")[0];
  }
}
