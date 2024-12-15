export function nameFromFilePath(path) {
  return path.split("/").pop().split(".")[0]
}

export function withoutAssetDigest(path) {
  return path.replace(/-[a-z0-9]+\.(\w+)$/, ".$1");
}

export function urlWithParams(urlString, params) {
  const url = new URL(urlString, window.location.origin)
  Object.entries(params).forEach(([ key, value ]) => {
    url.searchParams.set(key, value)
  })
  return url.toString()
}

export function cacheBustedUrl(urlString) {
  return urlWithParams(urlString, { reload: Date.now() })
}

export async function reloadHtmlDocument() {
  let currentUrl = cacheBustedUrl(urlWithParams(window.location.href, { hotwire_spark: "true" }))
  const response = await fetch(currentUrl)

  if (!response.ok) {
    throw new Error(`${response.status} when fetching ${currentUrl}`)
  }

  const fetchedHTML = await response.text()
  const parser = new DOMParser()
  return parser.parseFromString(fetchedHTML, "text/html")
}

