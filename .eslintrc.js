// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["eslint-plugin-react-compiler", "react-hooks", "prettier"],
  rules: {
    "react-compiler/react-compiler": "error",
    'react-hooks/exhaustive-deps': 'off',
    "prettier/prettier": "error",
  },
  ignorePatterns: ["/dist/*"],
};
