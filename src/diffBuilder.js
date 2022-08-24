import _ from 'lodash';

const diffBuilder = (tree1, tree2) => {
  const sotredKeys = _.sortBy(_.union(_.keys(tree1), _.keys(tree2)));
  return sotredKeys.map((key) => {
    const value1 = tree1[key];
    const value2 = tree2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        children: diffBuilder(value1, value2),
        key,
        status: 'nested',
      };
    }
    if (_.has(tree1, key) && !_.has(tree2, key)) {
      return {
        key,
        status: 'removed',
        value: value1,
      };
    }
    if (!_.has(tree1, key) && _.has(tree2, key)) {
      return {
        key,
        status: 'added',
        value: value2,
      };
    }
    if (value1 !== value2) {
      return {
        key,
        status: 'updated',
        value1,
        value2,
      };
    }
    return {
      key,
      status: 'unchanged',
      value: value1,
    };
  });
};

export default diffBuilder;
