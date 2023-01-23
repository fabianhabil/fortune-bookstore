module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'next'
    ],
    parser: '@typescript-eslint/parser',
    // parserOptions: {
    //     ecmaVersion: 'latest',
    //     project: ['./tsconfig.json'],
    //     tsconfigRootDir: __dirname
    // },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
    },
    plugins: ['@typescript-eslint', 'import'],
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' }
        ],
        // "no-nested-ternary": "off",
        '@typescript-eslint/no-explicit-any': 'off',
        // "linebreak-style": 0,
        // "react-hooks/exhaustive-deps": "off",
        // "@next/next/no-img-element": "off",

        // React
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 0,
        // TypeScript
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
        '@typescript-eslint/consistent-indexed-object-style': [
            'error',
            'record'
        ],
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface'
        ],
        '@typescript-eslint/member-delimiter-style': ['error'],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports' }
        ],
        '@typescript-eslint/consistent-type-exports': [
            'error',
            { fixMixedExportsWithInlineTypeSpecifier: true }
        ],

        '@next/next/no-img-element': 'off',
        // Import
        'import/first': 'error',
        'import/no-absolute-path': 'error',
        'import/no-self-import': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/exports-last': 'error',
        'import/newline-after-import': 'error',
        'import/extensions': ['error', 'never'],
        'import/no-unresolved': 'off',

        // Security
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',

        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-return': 'error',
        'no-useless-call': 'error',
        'no-unused-expressions': 'error',
        'no-unneeded-ternary': 'error',
        'no-undef-init': 'error',
        'no-unreachable-loop': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-new-object': 'error',
        'no-new-wrappers': 'error',
        'no-trailing-spaces': 'error',
        'no-throw-literal': 'error',
        'no-await-in-loop': 'error',
        'no-array-constructor': 'error',
        'no-labels': 'error',
        'no-label-var': 'error',
        'no-lone-blocks': 'error',
        'no-self-compare': 'error',
        'no-empty-function': 'warn',
        'no-template-curly-in-string': 'error',
        'no-whitespace-before-property': 'error',
        'no-octal-escape': 'error',
        'no-constructor-return': 'error',
        'no-tabs': 'error',
        'no-void': 'error',
        'no-var': 'error',
        'no-empty': 'warn',

        'prefer-const': 'error',
        'prefer-exponentiation-operator': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-object-has-own': 'error',
        'prefer-object-spread': 'error',
        'prefer-regex-literals': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',

        'space-before-blocks': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'space-in-parens': 'error',

        'array-bracket-spacing': 'error',
        'arrow-spacing': 'error',
        'arrow-parens': 'error',

        'comma-spacing': 'error',
        'comma-style': 'error',
        'computed-property-spacing': 'error',
        'max-depth': 'off',
        'dot-notation': 'error',
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'default-case-last': 'error',
        'func-call-spacing': 'error',
        'rest-spread-spacing': 'error',
        'template-curly-spacing': 'error',
        'brace-style': 'error',
        'block-spacing': 'error',
        'quote-props': ['error', 'as-needed'],
        'object-curly-spacing': ['error', 'always'],
        'dot-location': ['error', 'property'],
        eqeqeq: 'error',
        curly: 'off',
        semi: 'error',
        yoda: 'warn',

        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array'
            }
        ],
        quotes: [
            'error',
            'single',
            {
                // Allows to use other quotes when necessary
                avoidEscape: true
            }
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                asyncArrow: 'always',
                named: 'never'
            }
        ],
        'padded-blocks': [
            'error',
            {
                classes: 'always'
            }
        ],
        'spaced-comment': [
            'error',
            'always',
            {
                // Allow comment to start without space for '*'
                exceptions: ['*']
            }
        ],
        'max-nested-callbacks': [
            'error',
            {
                max: 4
            }
        ],
        'func-style': [
            'error',
            'declaration',
            {
                allowArrowFunctions: true
            }
        ],
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: true
            }
        ]
    }
};
