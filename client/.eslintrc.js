module.exports = {
    env: {
        browser: true,
        es6: true,
        amd: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "simple-import-sort"],
    rules: {
        "react/react-in-jsx-scope": "off",
    },
};
