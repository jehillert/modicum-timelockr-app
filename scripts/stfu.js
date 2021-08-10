// source: https://github.com/facebook/metro/issues/287#issuecomment-470026886
// purpose: suppress require cycle warnings

// In package.json, if still needed:
// "postinstall": "node ./scripts/stfu.js"

const fs = require('fs');

const codeToObscure = /console.warn\([\s]*`Require cycle[^;]*;/;
const problemFilePath = './node_modules/metro/src/lib/polyfills/require.js';
const problemFileContent = fs.readFileSync(problemFilePath, 'utf8');
fs.writeFileSync(problemFilePath, problemFileContent.replace(codeToObscure, ''), { encoding: 'utf8' });
