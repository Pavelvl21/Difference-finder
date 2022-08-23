import stylishFormatter from './stylish.js';

const diffFormatter = (tree, formatter = 'stylish') => {
  switch (formatter) {
    case 'stylish':
      return stylishFormatter(tree);
    default: try {
      throw new Error(`Formatter '${formatter}' is not supported`);
    } catch (error) {
      return error.message;
    }
  }
};

export default diffFormatter;
