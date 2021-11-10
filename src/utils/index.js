const path = require("path");

function getSrcPath(dirname) {
  const parts = dirname.split(path.sep).slice(0, -1);
  return parts.join(path.sep);
}

module.exports = {
  getSrcPath,
};
