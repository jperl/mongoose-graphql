# mongoose-graphql

[mongoose-graphql](https://github.com/zipdrug/mongoose-graphql) converts a mongoose model to a graphql type string.

## Installation

Using [npm](https://www.npmjs.org/):

    $ npm install --save mongoose-graphql

```js
// using ES6 modules
import { modelToTypeString } from 'mongoose-graphql';

// using CommonJS modules
var mongooseGraphQL = require('mongoose-graphql');
var modelToTypeString = mongooseGraphQL.modelToTypeString;
```
## API

### modelToTypeString

> `modelToTypeString(model)`

Convert a mongoose model to a graphql type string.

You can use this type string in [graphql-tools](https://github.com/apollostack/graphql-tools) to build an executable schema.

```js
const location = mongoose.model('Location',
  new mongoose.Schema({
    name: String,
    type: String
  })
);

console.log(modelToTypeString(location));
```

Outputs:
```
type Location {
  _id: String
  name: String
  type: String
}
```
