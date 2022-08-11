import path from 'path';
import _ from 'lodash';
import parseData from './parsers.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
  const pathToFile1 = getPath(filepath1);
  const pathToFile2 = getPath(filepath2);

  const data1 = parseData(pathToFile1);
  const data2 = parseData(pathToFile2);

  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const result = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.has(data1, key) && !_.has(data2, key)) {
      return `  - ${key}: ${value1}`;
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return `  + ${key}: ${value2}`;
    }
    return value1 === value2 ? `    ${key}: ${value2}` : `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
  });

  return (`{\n${result.join('\n')}\n}`);
};

export default genDiff;
