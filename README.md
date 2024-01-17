<div align='center'>
  <h1>vite-plugin-class-mangler</h1>
  <p>Vite plugin for obfuscating classes in production builds. Compatible with Tailwind or imported styles.</p>
  ![image](https://github.com/kekovina/vite-css-class-mangler/assets/49250681/1ac90de5-9367-4906-a743-f702a7545307)

</div>

## Supported frameworks

- Vite

## Installation

> This plugin is still a work-in-progress. Be careful when using it :) Please report all erroneous cases in the issue

## Usage

Add to your vite config:

```js
import { defineConfig } from 'vite';
import ClassMangler from 'vite-plugin-class-mangler';

export default defineConfig({
  plugins: [ClassMangler()]
});
```

Optionally, customize any of the following options:

```js
ClassMangler({
  dev: false,
  min: 2,
  max: 8,
  length: 8,
  unwatchedClasses: ['burger-menu']
});
```

unwatchedClasses - a list of classes used in .js, .ts files, these classes are not yet tracked automatically and they need to be entered manually to avoid failures

## Known bugs

- Avoid the names of classes that can be used in .js, .ts files as method names

## Testing

Run unit tests:

```bash
yarn test
```

## Credits

Forked from [vite-plugin-class-mangler](https://github.com/kiosion/vite-plugin-class-mangler/)
