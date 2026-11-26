export default {
  "*.js": "eslint --fix",
  "*.ts": [
    "eslint --fix",
    // apparently running tsc on a single file is a hard problem; use the
    // function syntax to compile the entire project.
    () => "npm run typecheck",
  ],
  "*.{json,yml,yaml}": "prettier -w",
  "*.md": "prettier -w",
};
