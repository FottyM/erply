module.exports = {
    "extends": [
        "standard",
        "plugin:flowtype/recommended",
        "plugin:react/recommended",
        "prettier",
        "prettier/flowtype",
        "prettier/react",
        "prettier/standard"
      ],
      "plugins": [
        "flowtype",
        "react",
        "prettier",
        "standard"
      ],
      "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "env": {
        "es6": true,
        "node": true
      },
      "rules": {
        "prettier/prettier": "error"
      }
}