function bytesInMBs(bytes) {
  return (bytes / 1000000).toFixed(2);
}

function camelToTitleCase(string) {
  const result = string.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

module.exports = { bytesInMBs, camelToTitleCase }; // eslint-disable-line no-undef
