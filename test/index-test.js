/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import { modelToTypeString } from '../lib/index';
import { OrderModel, OrderTypes, StoreModel, StoreType } from './models';

test('flat StoreModel converts to a type string', (t) => {
  const schema = modelToTypeString(StoreModel);
  t.is(schema, StoreType);
});

test('nested OrderModel converts to a type string', (t) => {
  const schema = modelToTypeString(OrderModel);
  t.is(schema, OrderTypes, `Expected\n${schema}\nto equal\n${OrderTypes}`);
});
