function getSize(size) {
  let inSize = size;
  if (inSize < 1024) {
    return `${inSize.toFixed(1)} B`;
  }
  inSize /= 1024;
  if (inSize < 1024) {
    return `${inSize.toFixed(1)} KB`;
  }
  inSize /= 1024;
  if (inSize < 1024) {
    return `${inSize.toFixed(1)} MB`;
  }
  inSize /= 1024;
  return `${inSize.toFixed(1)} GB`;
}
export default getSize;
