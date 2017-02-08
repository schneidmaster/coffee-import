# Deprecated

[As of 1.11.0](https://github.com/jashkenas/coffeescript/issues/3162#issuecomment-249377792), CoffeeScript has native support for ES6 imports and exports, so this package is no longer necessary (and the official version is better because it allows you to use real ES6 modules, while this package merely provided syntactic sugar for CommonJS requires).

# coffee-import

coffee-import is a utility package to transpile ES6 `import` statements in CoffeeScript files before they're passed to the CoffeeScript compiler.

## Installation

```
npm install coffee-import --save-dev
```

## How it works

CoffeeScript lacks native support for ES6 `import` syntax:

``` coffeescript
import * as MyModule from 'a-package';
import { SomeModule } from 'neat-package';
import SomeDefaultModule from 'other-package';

# error: reserved word 'import'
```

coffee-import transpiles those `import` statements into the equivalent block of CommonJS `require`s, giving you succinct syntax while keeping the CoffeeScript compiler happy.

``` coffeescript
import * as MyModule from 'a-package';
import { SomeModule } from 'neat-package';
import SomeDefaultModule from 'other-package';

# transpiled

MyModule = require('a-package')
SomeModule = require('neat-package').SomeModule
SomeDefaultModule = require('other-package')
```

## Usage

``` javascript
var coffee = require('coffee-script');
var coffeeImport = require('coffee-import');

var transpiled = coffeeImport(fs.readFileSync('some-file.coffee').toString());
var compiled = coffee.compile(transpiled);
```

Alternatively, use the [webpack loader](https://www.npmjs.com/package/coffee-import-loader).

## Testing

* `npm run test` to run the mocha tests

## Contributing

1. Fork it ( https://github.com/schneidmaster/coffee-import/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## License

MIT
