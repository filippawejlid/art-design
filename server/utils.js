function getUniqueFilename(filename) {
  const timeStamp = Date.now();

  const extension = filename.split(".").pop();

  return `${timeStamp}.${extension}`;
}
module.exports = {
  getUniqueFilename,
};
