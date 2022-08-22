import path from 'path';
import _ from 'lodash';
import parseData from './parsers.js';
import treeBuilder from './treeBuilder.js'
import diffBuilder from './stylish.js';



const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
  const pathToFile1 = getPath(filepath1);
  const pathToFile2 = getPath(filepath2);

  const data1 = parseData(pathToFile1);
  const data2 = parseData(pathToFile2);
  
  return diffBuilder(treeBuilder(data1, data2));
};

export default genDiff;
