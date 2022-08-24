import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const diffFormatter = (tree, formatter = 'stylish') => {
  switch (formatter) {
    case 'stylish':
      return stylishFormatter(tree);
    case 'plain':
      return plainFormatter(tree);
    case 'json':
      return jsonFormatter(tree);
    default: throw new Error(`Formatter '${formatter}' is not supported`);
  }
};

export default diffFormatter;
