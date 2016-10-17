/* eslint-disable import/prefer-default-export */
import { capitalize, forOwn } from 'lodash';

const instanceToType = (instance) => {
  switch (instance) {
    case 'ObjectID':
    case 'String':
      return 'String';
    case 'Date':
    case 'Number':
      return 'Float';
    default:
      throw new Error(`${instance} not implemented yet in instanceToType`);
  }
};

export const getTypeTree = (schemaPaths) => {
  const typeTree = {};

  forOwn(schemaPaths, (path, key) => {
    if (key === '__v') {
      return;
    }

    let parentTree = typeTree;

    // Build the children paths
    const splitPath = key.split('.');
    for (let i = 0; i < splitPath.length - 1; i += 1) {
      const ancestor = splitPath[i];
      parentTree[ancestor] = parentTree[ancestor] || {};
      parentTree = parentTree[ancestor];
    }

    const property = splitPath[splitPath.length - 1];
    parentTree[property] = instanceToType(path.instance);
  });

  return typeTree;
};

export const getTypeObjects = (name, typeTree) => {
  let typeObjects = [];

  const currentType = {
    type: name,
    properties: {},
  };

  forOwn(typeTree, (value, key) => {
    if (typeof value === 'object') {
      const childTypeName = `${name}${capitalize(key)}`;
      const children = getTypeObjects(childTypeName, value);
      typeObjects = children.concat(typeObjects);
      currentType.properties[key] = {
        type: childTypeName,
      };
    } else {
      currentType.properties[key] = value;
    }
  });

  if (Object.keys(currentType.properties).length > 0) {
    typeObjects.push(currentType);
  }

  return typeObjects;
};

export const getTypeString = (typeObject) => {
  let typeString = `type ${typeObject.type} {\n`;

  Object.keys(typeObject.properties)
    .sort()
    .forEach((key) => {
      const value = typeObject.properties[key];
      typeString += `  ${key}: ${value.type || value}\n`;
    });

  typeString += '}';

  return typeString;
};

export const modelToTypeString = (model) => {
  const schema = model.schema;
  const typeTree = getTypeTree(schema.paths);
  const typeObjects = getTypeObjects(model.modelName, typeTree);
  const typeStrings = typeObjects.map(getTypeString);
  return typeStrings.join('\n');
};
