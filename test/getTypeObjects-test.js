/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import getTypeObjects from '../lib/getTypeObjects';

test('getTypeObjects supports primitive paths', (t) => {
  const primitiveTree = {
    name: 'String',
    no: 'Float',
  };

  const primitiveTypeObjects = [
    {
      type: 'Order',
      properties: {
        name: 'String',
        no: 'Float',
      },
    },
  ];

  t.deepEqual(getTypeObjects('Order', primitiveTree), primitiveTypeObjects);
});

test('getTypeObjects supports complex paths', (t) => {
  const complexTree = {
    name: 'String',
    location: {
      instructions: 'String',
      placeId: 'String',
    },
  };

  const complexTypeObjects = [
    {
      type: 'OrderLocation',
      properties: {
        instructions: 'String',
        placeId: 'String',
      },
    },
    {
      type: 'Order',
      properties: {
        location: 'OrderLocation',
        name: 'String',
      },
    },
  ];

  t.deepEqual(getTypeObjects('Order', complexTree), complexTypeObjects);
});

test('getTypeObjects supports primitive arrays', (t) => {
  const primitiveArrayTree = {
    statuses: ['String'],
  };

  const primitiveArrayObjects = [
    {
      type: 'Order',
      properties: {
        statuses: '[String]',
      },
    },
  ];

  t.deepEqual(getTypeObjects('Order', primitiveArrayTree), primitiveArrayObjects);
});

test('getTypeObjects supports complex arrays', (t) => {
  const complexArrayTree = {
    notes: [{
      author: 'String',
      message: 'String',
    }],
  };

  const complexArrayObjects = [
    {
      type: 'OrderNote',
      properties: {
        author: 'String',
        message: 'String',
      },
    },
    {
      type: 'Order',
      properties: {
        notes: '[OrderNote]',
      },
    },
  ];

  t.deepEqual(getTypeObjects('Order', complexArrayTree), complexArrayObjects);
});
