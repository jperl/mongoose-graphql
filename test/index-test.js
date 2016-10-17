/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import { getTypeString } from '../lib/index';
import { LocationModel, locationTypeString } from './models';

test('convert flat model to graphql type string', (t) => {
  const schema = getTypeString(LocationModel);
  t.is(schema, locationTypeString);
});
