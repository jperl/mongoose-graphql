/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import getType from '../lib/getType';

test('converts a type object to a type string', (t) => {
  const typeObject = {
    type: 'OrderNote',
    properties: {
      author: 'String',
      message: 'String',
    },
  };

  const typeString = `type OrderNote {
  author: String
  message: String
}`;

  t.is(getType(typeObject), typeString);
});
