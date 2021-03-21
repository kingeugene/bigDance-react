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
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "import/no-unresolved": "off",
        "react/jsx-props-no-spreading": "off"
    },
};
