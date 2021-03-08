var fs = require('fs');
var path = require('path');
var join = path.join;

function ChromeExtensionManifest(options) {
  this.options = options || {};
  this.context = path.dirname(module.parent.filename);
  this.options.inputFile = path.isAbsolute(this.options.inputFile) ? this.options.inputFile : join(this.context, this.options.inputFile);
  this.outputFile = path.isAbsolute(this.options.outputFile) ? this.options.outputFile : join(this.context, this.options.outputFile);
  this.props = this.options.props instanceof Object ? this.options.props : {};
  this.replace = this.options.replace || [];
}

// hook into webpack
ChromeExtensionManifest.prototype.apply = function(compiler) {
  var self = this;
  compiler.hooks.done.tap("done", () => {
    self.createManifst.call(self);
  });
};

// package the extension
ChromeExtensionManifest.prototype.createManifst = function() {
  var manifestContent = require(this.options.inputFile);
  var newManifestContent = Object.assign(manifestContent, this.props);
  var newManifestStringContent = JSON.stringify(newManifestContent, null, 4);
  if (this.replace.length){
    for (var i=0; i<this.replace.length; i++){
      if (this.replace[i].pattern && this.replace[i].value) {
        newManifestStringContent = newManifestStringContent.replace(this.replace[i].pattern, this.replace[i].value);
      }
    }
  }
  fs.writeFileSync(this.outputFile, newManifestStringContent);
};

module.exports = ChromeExtensionManifest;
