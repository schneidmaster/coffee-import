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

## Contributing

1. Fork it ( https://github.com/schneidmaster/coffee-import/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## License

MIT
