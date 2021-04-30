module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb-typescript-prettier"],
    plugins: ["simple-import-sort", "import"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
    },
    rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "sort-imports": "off",
        "import/prefer-default-export": "off",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "import/no-unresolved": "off",
        "react/jsx-props-no-spreading": "off",
        "react/no-array-index-key": 1,
        "consistent-return": 1,
        "@typescript-eslint/no-this-alias": 1,
        "no-debugger": 0,
        "camelcase": 1,
        "jsx-a11y/no-static-element-interactions": 1,
        "jsx-a11y/click-events-have-key-events": 1,
        "react-hooks/exhaustive-deps": 1,
        // need remove when fix type
        "@typescript-eslint/ban-ts-comment": 0,
    },
};
