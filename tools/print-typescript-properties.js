const plugin = require('@typescript-eslint/eslint-plugin');

const isTrue = val => val !== undefined && val !== false;
const recommended = key => isTrue(plugin.rules[key].meta.docs.recommended);
const requiresTypeChecking = key => isTrue(plugin.rules[key].meta.docs.requiresTypeChecking);
const extendsBaseRule = key => isTrue(plugin.rules[key].meta.docs.extendsBaseRule);
const print = keys => {
    const results = {};
    keys.forEach(key => { results[`@typescript-eslint/${key}`] = ''; });
    global.console.log(JSON.stringify(results, null, 4));
};

const typeScriptExtensions = Object.keys(plugin.rules)
    .filter(key => extendsBaseRule(key))
    .filter(key => !requiresTypeChecking(key));

const typeScriptExtensionsRequiringTypeChecks = Object.keys(plugin.rules)
    .filter(key => extendsBaseRule(key))
    .filter(key => requiresTypeChecking(key));

const typeScript = Object.keys(plugin.rules)
    .filter(key => !extendsBaseRule(key))
    .filter(key => !recommended(key))
    .filter(key => !requiresTypeChecking(key));

const typeScriptRequiringTypeChecks = Object.keys(plugin.rules)
    .filter(key => !extendsBaseRule(key))
    .filter(key => !recommended(key))
    .filter(key => requiresTypeChecking(key));

const typeScriptRecommended = Object.keys(plugin.rules)
    .filter(key => !extendsBaseRule(key))
    .filter(key => recommended(key))
    .filter(key => !requiresTypeChecking(key));

const typeScriptRecommendedTypeChecks = Object.keys(plugin.rules)
    .filter(key => !extendsBaseRule(key))
    .filter(key => recommended(key))
    .filter(key => requiresTypeChecking(key));

global.console.log('Note: When printing this does not print the default config and assumes "error"');
global.console.log('TypeScript Recommended:');
print(typeScriptRecommended);
global.console.log('TypeScript Recommended Requiring Type Checks:');
print(typeScriptRecommendedTypeChecks);
global.console.log('TypeScript Extensions:');
print(typeScriptExtensions);
global.console.log('TypeScript Extensions Requiring Type Checks:');
print(typeScriptExtensionsRequiringTypeChecks);
global.console.log('Remaining TypeScript Rules:');
print(typeScript);
global.console.log('Remaining TypeScript Rules Requiring Type Checks:');
print(typeScriptRequiringTypeChecks);
