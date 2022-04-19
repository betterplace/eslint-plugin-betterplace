# eslint-plugin-betterplace

Custom rules built for betterplace

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-betterplace`:

```
$ npm install eslint-plugin-betterplace --save-dev
```

## Usage

### Option 1

Add the `betterplace` plugin recommended config to the extends section of your `.eslintrc` configuration file.

```json
{
  "extends": ["plugin:betterplace/recommended"]
}
```

### Option 2

Add `betterplace` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["betterplace"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "betterplace/rule-name": 2
  }
}
```

## Supported Rules

`strict-mui-imports`:
  - prevents styles imported from `@material-ui` to come from `@material-ui/core/styles` to help the import tranformer to minimize final bundle

`no-unwrapped-jsx-text`:
  - requires that when JSX text shares a common parent with other elements, the text be wrapped in a `<span>` tag
  - this prevents issues with [this React bug](https://github.com/facebook/react/issues/11538#issuecomment-390386520) when conflicted with things like google translate

`polyfill-resize-observer`:
  - imorts the polyfill build from react-resize-detector to avoid browser compatability conflicts when accessing the ResizeObserver API