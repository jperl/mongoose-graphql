# mongoose-graphql [![CircleCI](https://circleci.com/gh/zipdrug/mongoose-graphql.svg?style=svg)](https://circleci.com/gh/zipdrug/mongoose-graphql)

[mongoose-graphql](https://github.com/zipdrug/mongoose-graphql) converts a mongoose model to graphql types.

## Installation

Using [npm](https://www.npmjs.org/):

    $ npm install --save mongoose-graphql

```js
// using ES6 modules
import { modelToType } from 'mongoose-graphql';

// using CommonJS modules
var mongooseGraphQL = require('mongoose-graphql');
var modelToType = mongooseGraphQL.modelToType;
```
## API

### modelToType

> `modelToType(model, options)`

Convert a mongoose model to graphql types.

You can use this type definition in [graphql-tools](https://github.com/apollostack/graphql-tools) to build an executable schema.

```js
const CategorySchema = new Schema({
  type: String,
});

const BookModel = mongoose.model('Book', new Schema({
  category: CategorySchema,
  name: String,
}));

const typeDef = modelToType(BookModel, {
  extend: {
    Book: {
      publishers: '[Publisher]',
    },
    BookCategory: {
      genre: 'Genre',
    },
  },
});

console.log(typeDef);
```

Outputs:
```
type BookCategory {
  _id: String
  genre: Genre
  type: String
}
type Book {
  _id: String
  category: BookCategory
  name: String
  publishers: [Publisher]
}
```

## Graphql private properties

Graphql does not allow properties beginning with "__" in types. Otherwise, it will print a message error like this :
```
Name "__t" must not begin with "__", which is reserved by GraphQL introspection. In a future release of graphql this will become a hard error.
````

By default, this kind of properties is removed by mongoose-graphql.
