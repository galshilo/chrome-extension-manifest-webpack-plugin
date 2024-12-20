# chrome-extension-manifest-webpack-plugin
Webpack plugin which allows you to modify your extension manifest


Usage:

```
const ChromeExtensionManifest = require('chrome-extension-manifest-webpack-plugin');
```

```
new ChromeExtensionManifest({
        inputFile: '../path/to/manifest.json',
        outputFile: '../path/to/manifest.json',
        replace: [{
           pattern: /__FOO__/g,
           value: args.foo
        }],
        hash: {
          pattern: /\[hash\]/g,
        },
        props: {
            version: getVersion(args.version)     
        }
})
```

Options: 

* inputFile: Existing manifest file.

* outputFile: Newly created manifest file

* hash: An object containing the pattern to search for the hash value. 
* This is useful when you want to replace the hash value in the manifest file with the actual hash value generated by webpack.
* for example, index.bundle.[hash].js -> index.bundle.123456.js
* The pattern should be a regular expression, default: /\[hash\]/g

* replace: Array of objects with the follwing keys:\
        pattern: pattern to search for\
        value: value to be replaced with
* options: An object containing optional flags
  * allowEmpty: Allow defining an empty replacement value, default: false.
* props: add new or overwrite manifest entries



