export function nameFromFilePath(path) {
  return path.split("/").pop().split(".")[0]
}

export function urlWithParams(urlString, params) {
  const url = new URL(urlString, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  return url.toString()
}

export function cacheBustedUrl(urlString) {
  return urlWithParams(urlString, { reload: Date.now() })
}
