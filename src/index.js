import path from 'path';
import parseData from './parsers.js';
import diffBuilder from './diffBuilder.js';
import diffFormatter from './formatters/index.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, formatter) => {
  const pathToFile1 = getPath(filepath1);
  const pathToFile2 = getPath(filepath2);

  const data1 = parseData(pathToFile1);
  const data2 = parseData(pathToFile2);

  return diffFormatter(diffBuilder(data1, data2), formatter);
};

export default genDiff;
