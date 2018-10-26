const R = require('ramda');

const cleanComments = (str) => {
  const patterns = [/\/\*(.|\n)*?\*\//gm, /^\s*?\/\/.*$/gm];
  return patterns.reduce((acum, current) => acum.replace(current, ''), str).trim();
};

const cleanLines = (str) => {
  const pattern = /^\s*[\r\n]/gm;
  return str.replace(pattern, '').trim();
};

const countLines = (str) => str.split('\n').length;

const getLineNumber = R.pipe(cleanComments, cleanLines, countLines);

module.exports = {
  cleanComments,
  cleanLines,
  countLines,
  getLineNumber,
};