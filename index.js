/**
 * @fileoverview Custom rules built for betterplace
 * @author Sayari Analytics
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const allRules = {
  'strict-mui-imports': require('./lib/rules/strict-mui-imports'),
  'no-unwrapped-jsx-text': require('./lib/rules/no-unwrapped-jsx-text'),
  'polyfill-resize-observer': require('./lib/rules/polyfill-resize-observer')
}

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports = {
  rules: allRules,
  configs: {
    recommended: {
      plugins: ['betterplace'],
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      rules: {
        'betterplace/no-unwrapped-jsx-text': 2,
      }
    }
  }
}

