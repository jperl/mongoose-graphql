/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import { modelToType } from '../lib/index';
import { BookModel, BookTypes, BookTypesExtended, OrderModel, OrderTypes, StoreModel, StoreType } from './models';

test('flat StoreModel converts to a type string', (t) => {
  const schema = modelToType(StoreModel);
  t.is(schema, StoreType);
});

test('nested OrderModel converts to a type string', (t) => {
  const schema = modelToType(OrderModel);
  t.is(schema, OrderTypes, `Expected\n${schema}\nto equal\n${OrderTypes}`);
});

test('embedded BookModel converts to a type string', (t) => {
  const schema = modelToType(BookModel);
  t.is(schema, BookTypes, `Expected\n${schema}\nto equal\n${BookTypes}`);
});

test('can extend generated types', (t) => {
  const schema = modelToType(BookModel, {
    extend: {
      Book: {
        publishers: '[Publisher]',
      },
      BookCategory: {
        genre: 'Genre',
      },
    },
  });

  t.is(schema, BookTypesExtended, `Expected\n${schema}\nto equal\n${BookTypesExtended}`);
});
