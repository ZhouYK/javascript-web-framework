module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
  "env": {
    "es6": true,
    "node": true
  },

  "plugins": [
    "react",
    "import"
  ],

  "globals": {
    "document": false,
    "navigator": false,
    "window": false,
    "Image": true,
    "JSX": true
  },

  "rules": {
    "react/jsx-filename-extension": ["warn", {"extensions": [".js", ".jsx", ".tsx"]}],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["server/config/development.js"]}],
    "react/forbid-prop-types": ["error", {
      forbid: [],
      checkContextTypes: true,
      checkChildContextTypes: true,
    }],
    "react/destructuring-assignment": "warn"
  },
  "extends": "airbnb",
}