module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': [
        'value',
        'include'
      ]
    }],
    'property-no-unknown': [true, {
      'ignoreProperties': [
        'composes'
      ]
    }],
    'string-quotes': 'single',
    'value-no-vendor-prefix': true,
    'declaration-no-important': true,
    'selector-max-id': 0,
    'selector-max-class': 1,
    'max-nesting-depth': 3,
    'selector-max-specificity': '0,2,2', /* id, class, type */
    'selector-max-compound-selectors': 4
  }
};
