import _ from 'lodash';

const currentIndent = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - 2);
const bracketIndent = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - spacesCount);

const diffBuilder = (tree) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return (`${currentValue}`);
    }

    const subLines = _.entries(currentValue)
      .map(([key, value]) => `${currentIndent(depth)}  ${key}: ${iter(value, depth + 1)}`)
      .join('\n');

    return `{\n${subLines}\n${bracketIndent(depth)}}`;
  };

  const diffFormatter = (node, depth = 1) => {
    const lines = node.map(({
      addDiffMark,
      children,
      diffMark,
      key,
      remDiffMark,
      spaceMark,
      status,
      value,
      value1,
      value2,
    }) => {
      switch (status) {
        case 'added':
          return `${currentIndent(depth)}${diffMark}${key}: ${iter(value, depth + 1)}`;
        case 'changed':
          return `${currentIndent(depth)}${remDiffMark}${key}: ${iter(value1, depth + 1)}\n${currentIndent(depth)}${addDiffMark}${key}: ${iter(value2, depth + 1)}`;
        case 'deleted':
          return `${currentIndent(depth)}${diffMark}${key}: ${iter(value, depth + 1)}`;
        case 'nested':
          return `${currentIndent(depth)}${spaceMark}${key}: ${diffFormatter(children, depth + 1)}`;
        default:
          return `${currentIndent(depth)}${spaceMark}${key}: ${iter(value, depth + 1)}`;
      }
    }).join('\n');

    return `{\n${lines}\n${bracketIndent(depth)}}`;
  };

  return diffFormatter(tree);
};

export default diffBuilder;
