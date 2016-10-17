import { forOwn, upperFirst } from 'lodash';
import pluralize from 'pluralize';

const getTypeObjects = (name, typeTree) => {
  let typeObjects = [];

  const currentType = {
    type: name,
    properties: {},
  };

  forOwn(typeTree, (value, key) => {
    const isArray = Array.isArray(value);
    const typeValue = isArray ? value[0] : value;

    let type;
    if (typeof typeValue === 'object') {
      const childTypeName = pluralize(`${name}${upperFirst(key)}`, 1);

      // Add the child type objects to the front
      const childTypeObjects = getTypeObjects(childTypeName, typeValue);
      typeObjects = childTypeObjects.concat(typeObjects);

      type = childTypeName;
    } else {
      type = typeValue;
    }

    if (isArray) {
      type = `[${type}]`;
    }

    currentType.properties[key] = type;
  });


  if (Object.keys(currentType.properties).length > 0) {
    typeObjects.push(currentType);
  }

  return typeObjects;
};

export default getTypeObjects;
