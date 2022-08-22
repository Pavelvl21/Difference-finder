import _ from 'lodash';

const treeBuilder = (tree1, tree2) => _.sortBy(_.union(_.keys(tree1), _.keys(tree2)))
  .map((key) => {
    const value1 = tree1[key];
    const value2 = tree2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        children: treeBuilder(value1, value2),
        key,
        spaceMark: '  ',
        status: 'nested',
      };
    }
    if (_.has(tree1, key) && !_.has(tree2, key)) {
      return {
        diffMark: '- ',
        key,
        status: 'deleted',
        value: value1,
      };
    }
    if (!_.has(tree1, key) && _.has(tree2, key)) {
      return {
        diffMark: '+ ',
        key,
        status: 'added',
        value: value2,
      };
    }
    if (value1 !== value2) {
      return {
        addDiffMark: '+ ',
        key,
        status: 'changed',
        remDiffMark: '- ',
        value1,
        value2,
      };
    }
    return {
      key,
      spaceMark: '  ',
      status: 'unchanged',
      value: value1,
    };
  });

export default treeBuilder;
