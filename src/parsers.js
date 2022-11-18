import yaml from 'js-yaml';

const parseData = (filepath, fileFormat) => {
  switch (fileFormat) {
    case '.yaml':
    case '.yml':
      return yaml.safeLoad(filepath);
    case '.json':
      return JSON.parse(filepath);
    default:
      throw new Error(`The file format '${fileFormat}' is not supported`);
  }
};

export default parseData;
