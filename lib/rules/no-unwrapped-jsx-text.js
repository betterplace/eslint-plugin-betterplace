'use strict'

const {
  removeSpecialCharacters, filterSiblings, jsxTextFixer
} = require('../utils/jsx')

const {
  LITERAL, TEMPLATE_LITERAL, LOGICAL_EXPRESSION, CONDITIONAL_EXPRESSION, JSX_ELEMENT, JSX_TEXT, CALL_EXPRESSION, MEMBER_EXPRESSION
} = require('../utils/constants')

/***
 ***  CONSTANTS
 */

const RULE_DESCRIPTION = 'JSX text that share a common parent with other elements should be wrapped by a <span> tag'

const TRANSLATE_OBJECT = 'I18n'
const TRANSLATE_PROPERTY = 't'

/***
 ***  RULE DEFINITION
 */

module.exports = {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: RULE_DESCRIPTION,
      category: 'Possible Errors',
      url: 'https://github.com/facebook/react/issues/11538#issuecomment-390386520'
    },
    messages: {
      noUnwrappedJSX: 'No unwrapped JSX text'
    }
  },
  create: (context) => ({
    JSXExpressionContainer(element) {
      const { expression, range, parent } = element

      if (filterSiblings(range, parent.children).length === 0) {
        return null
      }

      if (expression.type === LOGICAL_EXPRESSION) {
        const { right } = expression

        if (right.type === LITERAL) {
          return (
            context.report({
              node: expression.right,
              messageId: 'noUnwrappedJSX',
              fix: (fixer) => fixer.replaceText(right, `<span>${right.value}</span>`)
            })
          )
        } else if (right.type === TEMPLATE_LITERAL) {
          return (
            context.report({
              node: element,
              messageId: 'noUnwrappedJSX',
              fix: (fixer) => ([
                fixer.insertTextBefore(element, '<span>'),
                fixer.insertTextAfter(element, '</span>')
              ])
            })
          )
        } else if (right.type === CALL_EXPRESSION && 
          right.callee.type === MEMBER_EXPRESSION && 
          right.callee.object.name === TRANSLATE_OBJECT && 
          right.callee.property.name === TRANSLATE_PROPERTY
        ) {
          return (
            context.report({
              node: element,
              messageId: 'noUnwrappedJSX',
              fix: (fixer) => ([
                fixer.insertTextBefore(element, '<span>'),
                fixer.insertTextAfter(element, '</span>')
              ])
            })
          )
        }

      } else if (expression.type === TEMPLATE_LITERAL || (
        expression.type === CONDITIONAL_EXPRESSION &&
        expression.consequent.type !== JSX_ELEMENT &&
        expression.alternate.type !== JSX_ELEMENT
      )) {
        return (
          context.report({
            node: element,
            messageId: 'noUnwrappedJSX',
            fix: (fixer) => ([
              fixer.insertTextBefore(element, '<span>'),
              fixer.insertTextAfter(element, '</span>')
            ])
          })
        )
      } else if (expression.type === CALL_EXPRESSION && 
        expression.callee.type === MEMBER_EXPRESSION && 
        expression.callee.object.name === TRANSLATE_OBJECT && 
        expression.callee.property.name === TRANSLATE_PROPERTY
      ) {
        return (
          context.report({
            node: element,
            messageId: 'noUnwrappedJSX',
            fix: (fixer) => ([
              fixer.insertTextBefore(element, '<span>'),
              fixer.insertTextAfter(element, '</span>')
            ])
          })
        )
      }

      return null
    },
    JSXText(element) {
      const { range, parent } = element

      const siblings = filterSiblings(range, parent.children)
      if (siblings.length === 0 || siblings.every(({ type }) => type === JSX_TEXT)) {
        return null
      }

      if (removeSpecialCharacters(element.value)) {
        const { loc, text } = jsxTextFixer(element)

        return context.report({
          loc,
          node: element,
          messageId: 'noUnwrappedJSX',
          fix: (fixer) => fixer.replaceText(element, text)
        })
      }
    }
  })
}
