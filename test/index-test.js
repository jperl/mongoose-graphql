/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import { getTypeTree, getTypeObjects, getTypeString, modelToTypeString } from '../lib/index';
import { OrderModel, OrderTypes, StoreModel, StoreType } from './models';

const paths = {
  name: {
    instance: 'String',
  },
  'location.deliveryInstructions': {
    instance: 'String',
  },
  'location.placeId': {
    instance: 'ObjectID',
  },
  'location.child.name': {
    instance: 'String',
  },
};

const typeTree = {
  name: 'String',
  location: {
    deliveryInstructions: 'String',
    placeId: 'String',
    child: {
      name: 'String',
    },
  },
};

const typeObjects = [
  {
    type: 'StoreLocationChild',
    properties: {
      name: 'String',
    },
  },
  {
    type: 'StoreLocation',
    properties: {
      deliveryInstructions: 'String',
      placeId: 'String',
      child: {
        type: 'StoreLocationChild',
      },
    },
  },
  {
    type: 'Store',
    properties: {
      name: 'String',
      location: {
        type: 'StoreLocation',
      },
    },
  },
];

test('getTypeTree converts schema paths to a type tree', (t) => {
  t.deepEqual(getTypeTree(paths), typeTree);
});

test('getTypeObjects converts a tree to type objects ordered by deepest descendant -> root', (t) => {
  t.deepEqual(getTypeObjects('Store', typeTree), typeObjects);
});

test('getTypeString converts a type object to a type string', (t) => {
  const StoreLocationType = `type StoreLocation {
  child: StoreLocationChild
  deliveryInstructions: String
  placeId: String
}`;

  const StoreLocationObject = typeObjects[1];
  t.deepEqual(getTypeString(StoreLocationObject), StoreLocationType);
});

test('flat StoreModel converts to a type string', (t) => {
  const schema = modelToTypeString(StoreModel);
  t.is(schema, StoreType);
});

test('nested OrderModel converts to a type string', (t) => {
  const schema = modelToTypeString(OrderModel);
  t.is(schema, OrderTypes);
});

