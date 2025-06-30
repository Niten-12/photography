// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    "react/react-in-jsx-scope": "off", // not needed in React 17+
  },
};
