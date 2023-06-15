module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "google", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    "require-jsdoc": "off",
    "react/prop-types": "off",
    "no-unused-vars": "warn",
  },
  root: true,
};
