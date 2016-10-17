/* eslint-disable import/prefer-default-export */
import getTypeObjects from './getTypeObjects';
import getTypeTree from './getTypeTree';
import getTypeString from './getTypeString';

export const modelToTypeString = (model) => {
  const schema = model.schema;
  const typeTree = getTypeTree(schema.paths);
  const typeObjects = getTypeObjects(model.modelName, typeTree);
  const typeStrings = typeObjects.map(getTypeString);
  return typeStrings.join('\n');
};
