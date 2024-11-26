export function nameFromFilePath(path) {
  return path.split("/").pop().split(".")[0]
}
