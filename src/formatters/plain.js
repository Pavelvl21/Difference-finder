import _ from 'lodash';

const iter = (currentValue) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  return typeof currentValue === 'string' ? `'${currentValue}'` : `${currentValue}`;
};

const statusStyle = {
  added: ({ key, value }, path) => `Property '${path}${key}' was added with value: ${iter(value)}`,
  nested: ({ key, children }, path, seporator, fn) => fn(children, `${path}${key}${seporator}`),
  removed: ({ key }, path) => `Property '${path}${key}' was removed`,
  unchanged: () => [],
  updated: ({ key, value1, value2 }, path) => `Property '${path}${key}' was updated. From ${iter(value1)} to ${iter(value2)}`,
};

const plainFormatter = (tree) => {
  const formatDiff = (coll, path = '', seporator = '.') => coll
    .flatMap(({ status }, i) => statusStyle[status](coll[i], path, seporator, formatDiff))
    .join('\n');
  return formatDiff(tree);
};

export default plainFormatter;
