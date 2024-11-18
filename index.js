var fs = require('fs');
var path = require('path');
var join = path.join;

var defaultReplaceOptions = {
  allowEmpty: false
}

function ChromeExtensionManifest(options) {
  this.options = options || {};
  this.context = path.dirname(module.parent.filename);
  this.options.inputFile = path.isAbsolute(this.options.inputFile) ? this.options.inputFile : join(this.context, this.options.inputFile);
  this.outputFile = path.isAbsolute(this.options.outputFile) ? this.options.outputFile : join(this.context, this.options.outputFile);
  this.props = this.options.props instanceof Object ? this.options.props : {};
  this.replace = this.options.replace || [];
  this.hash = this.options.hash || false;
}

// hook into webpack
ChromeExtensionManifest.prototype.apply = function(compiler) {
  var self = this;
  compiler.hooks.done.tap("done", (stats) => {
    self.createManifst.call(self, stats);
  });
};

// package the extension
ChromeExtensionManifest.prototype.createManifst = function(stats) {
  var manifestContent = require(this.options.inputFile);
  var newManifestContent = Object.assign(manifestContent, this.props);
  var newManifestStringContent = JSON.stringify(newManifestContent, null, 4);
  if (this.replace.length){
    for (var i=0; i<this.replace.length; i++){
      var replaceOptions = this.replace[i].options || defaultReplaceOptions;
      if (this.replace[i].pattern && (this.replace[i].value || replaceOptions.allowEmpty)) {
        newManifestStringContent = newManifestStringContent.replaceAll(this.replace[i].pattern, this.replace[i].value);
      }
    }
  }

  if (this.hash){
    var hash = stats.compilation.hash;
    var hashPattern = this.hash.pattern || /\[hash\]/g;
    if (hash){
      newManifestStringContent = newManifestStringContent.replace(hashPattern, hash);
    }
  }

  fs.writeFileSync(this.outputFile, newManifestStringContent);
};

module.exports = ChromeExtensionManifest;
