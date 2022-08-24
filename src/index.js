import { extname, resolve } from 'path';
import { readFileSync } from 'fs';
import parseData from './parsers.js';
import diffBuilder from './diffBuilder.js';
import diffFormatter from './formatters/index.js';

const getData = (filepath) => {
  const fileFormat = extname(filepath);
  const pathToFile = readFileSync(resolve(process.cwd(), filepath), 'utf8');
  return parseData(pathToFile, fileFormat);
};

const genDiff = (filepath1, filepath2, formatter) => {
  const diff = diffBuilder(getData(filepath1), getData(filepath2));
  return diffFormatter(diff, formatter);
};

export default genDiff;
