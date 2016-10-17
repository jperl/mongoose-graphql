import { filter, sortBy } from 'lodash';

const instanceToType = (instance) => {
  if (instance === 'ObjectID' || instance === 'String') {
    return 'String';
  }

  if (instance === 'Number') {
    return 'Number';
  }

  throw `${instance} not implemented yet in instanceToType`;
};

export const getTypeString = (model) => {
  let typeString = `type ${model.modelName} {\n`;

  const schema = model.schema;
  const paths = filter(
    sortBy(schema.paths, path => path.path),
    path => path.path !== '__v'
  );

  typeString += paths
    .map(path => `  ${path.path}: ${instanceToType(path.instance)}\n`)
    .join('');

  typeString += '}';

  return typeString;
};
