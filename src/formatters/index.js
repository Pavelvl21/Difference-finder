import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const diffFormatter = (tree, formatter = 'stylish') => {
  switch (formatter) {
    case 'stylish':
      return stylishFormatter(tree);
    case 'plain':
      return plainFormatter(tree);
    default: throw new Error(`Formatter '${formatter}' is not supported`);
  }
};

export default diffFormatter;
