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
        props: {
            version: getVersion(args.version)     
        }
})
```
options: 

inputFile: Existing manifest file.

outputFile: Newly created manifest file.

replace: Array of objects with the follwing keys: 
        pattern: pattern to search for.
        value: value to be replaced with.
        
props: add new or overwrite manifest entries.



