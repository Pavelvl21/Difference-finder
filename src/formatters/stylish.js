import _ from 'lodash';

const currentIndent = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - 2);
const bracketIndent = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - spacesCount);


  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return (`${currentValue}`);
    }

    const subLines = _.entries(currentValue)
      .map(([key, value]) => `${currentIndent(depth)}  ${key}: ${iter(value, depth + 1)}`)
      .join('\n');

    return `{\n${subLines}\n${bracketIndent(depth)}}`;
  };

  const statusStyle = {
    added: ({ key, value }, depth) => `${currentIndent(depth)}+ ${key}: ${iter(value, depth + 1)}`,
    nested: ({ key, children }, depth, fn) => `${currentIndent(depth)}  ${key}: ${fn(children, depth + 1)}`,
    removed: ( { key, value }, depth) => `${currentIndent(depth)}- ${key}: ${iter(value, depth + 1)}`,
    unchanged: ( { key, value }, depth) => `${currentIndent(depth)}  ${key}: ${iter(value, depth + 1)}`,
    updated: ({ key, value1, value2 }, depth) => `${currentIndent(depth)}- ${key}: ${iter(value1, depth + 1)}\n${currentIndent(depth)}+ ${key}: ${iter(value2, depth + 1)}`
  };

  const stylishFormatter = (tree) => {
    const formatDiff = (coll, depth = 1) => {
      const lines = coll
        .flatMap(({ status }, i) => statusStyle[status](coll[i], depth, formatDiff))
        .join('\n')
      return `{\n${lines}\n${bracketIndent(depth)}}`;
  };

  return formatDiff(tree);
};

export default stylishFormatter;
