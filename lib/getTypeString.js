/* eslint-disable import/prefer-default-export */

const getTypeString = (typeObject) => {
  let typeString = `type ${typeObject.type} {\n`;

  Object.keys(typeObject.properties)
    .sort()
    .forEach((key) => {
      typeString += `  ${key}: ${typeObject.properties[key]}\n`;
    });

  typeString += '}';

  return typeString;
};

export default getTypeString;
