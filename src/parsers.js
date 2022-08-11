import { extname } from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const parseData = (filepath) => {
  switch (extname(filepath)) {
    case '.yaml':
    case '.yml':
      return yaml.load(readFileSync(filepath, 'utf8'));
    case '.json':
      return JSON.parse(readFileSync(filepath, 'utf8'));
    default: throw new Error('File format is not supported');
  }
};

export default parseData;
