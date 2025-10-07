module.exports = {
    parser: '@typescript-eslint/parser', // use TS parser
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        node: true,
        es2021: true,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        // Example rules (you can adjust later)
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'prettier/prettier': 'warn',
    },
};
