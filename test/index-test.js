/* eslint-disable import/no-extraneous-dependencies */
import { getTypeString } from '../lib/index';
import { LocationModel, OrderModel, locationTypeString } from './models';
import test from 'ava';

test('convert flat model to graphql type string', (t) => {
  const schema = getTypeString(LocationModel);
  t.is(schema, locationTypeString);
});
