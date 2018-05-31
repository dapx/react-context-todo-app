module.exports = {
  "extends" : [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb-base",
    "plugin:flowtype/recommended",
    "prettier"
  ],
  "plugins": [
    "react",
    // Warns about potential accessibility issues with your React elements.
    "jsx-a11y",
    "flowtype",
  ],
  "rules": {
    // Allow .js files with jsx
    "react/jsx-filename-extension": "off",
    // Disables the need to use `this` on class methods.
    "class-methods-use-this": "off",
  },
};
