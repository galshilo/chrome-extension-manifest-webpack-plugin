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
