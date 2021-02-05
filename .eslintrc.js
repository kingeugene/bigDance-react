module.exports = {
    extends: ['airbnb-typescript-prettier'],
    plugins: ["simple-import-sort", "import"],
    "rules": {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "sort-imports": "off",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error"
    },
};
