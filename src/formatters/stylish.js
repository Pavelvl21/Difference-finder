import _ from 'lodash';

const currentIndent = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - 2);
const bracketIndent = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - spacesCount);

const stylishFormatter = (tree) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return (`${currentValue}`);
    }

    const subLines = _.entries(currentValue)
      .map(([key, value]) => `${currentIndent(depth)}  ${key}: ${iter(value, depth + 1)}`)
      .join('\n');

    return `{\n${subLines}\n${bracketIndent(depth)}}`;
  };

  const formatDiff = (node, depth = 1) => {
    const lines = node.map(({
      children,
      key,
      status,
      value,
      value1,
      value2,
    }) => {
      switch (status) {
        case 'added':
          return `${currentIndent(depth)}+ ${key}: ${iter(value, depth + 1)}`;
        case 'changed':
          return `${currentIndent(depth)}- ${key}: ${iter(value1, depth + 1)}\n${currentIndent(depth)}+ ${key}: ${iter(value2, depth + 1)}`;
        case 'deleted':
          return `${currentIndent(depth)}- ${key}: ${iter(value, depth + 1)}`;
        case 'nested':
          return `${currentIndent(depth)}  ${key}: ${formatDiff(children, depth + 1)}`;
        default:
          return `${currentIndent(depth)}  ${key}: ${iter(value, depth + 1)}`;
      }
    }).join('\n');

    return `{\n${lines}\n${bracketIndent(depth)}}`;
  };

  return formatDiff(tree);
};

export default stylishFormatter;
