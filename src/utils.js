function camelToTitleCase(string) {
  const result = string.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

module.exports = { camelToTitleCase }; // eslint-disable-line no-undef
