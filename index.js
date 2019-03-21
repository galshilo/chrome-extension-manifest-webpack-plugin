var fs = require('fs');
var path = require('path');
var join = path.join;

function ChromeExtensionManifest(options) {
  this.options = options || {};
  this.context = path.dirname(module.parent.filename);
  this.options.inputFile = path.isAbsolute(this.options.inputFile) ? this.options.inputFile : join(this.context, this.options.inputFile);
  this.outputFile = path.isAbsolute(this.options.outputFile) ? this.options.outputFile : join(this.context, this.options.outputFile);
  this.props = this.options.props instanceof Object ? this.options.props : {};
}

// hook into webpack
ChromeExtensionManifest.prototype.apply = function(compiler) {
  var self = this;
  return compiler.plugin('done', function() {
    self.createManifst.call(self);
  });
};

// package the extension
ChromeExtensionManifest.prototype.createManifst = function() {
  var self = this;
  var manifestContent = require(this.options.inputFile);
  var newManifestContent = Object.assign(manifestContent, this.props);
  fs.writeFileSync(self.outputFile, JSON.stringify(newManifestContent, null, 4));
};

module.exports = ChromeExtensionManifest;
