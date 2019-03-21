var fs = require('fs');
var path = require('path');
var join = path.join;

function Plugin(options) {
  this.options = options || {};
  this.context = path.dirname(module.parent.filename);
  this.options.inputFile = path.isAbsolute(this.options.inputFile) ? this.options.inputFile : join(this.context, this.options.inputFile);
  if (!fs.existsSync(this.options.inputFile)){
    throw 'Input file does not exists';
  }
  this.outputFile = path.isAbsolute(this.options.outputFile) ? this.options.outputFile : join(this.context, this.options.outputFile);
  this.props = this.options.props instanceof Object ? this.options.props : throw 'props must be an object';
}

// hook into webpack
Plugin.prototype.apply = function(compiler) {
  var self = this;
  return compiler.plugin('done', function() {
    self.package.call(self);
  });
}

// package the extension
Plugin.prototype.createManifst = function() {
  var self = this;
  var manifestContent = require(this.options.inputFile);
  if (!manifestContent){
    throw 'Corrupted manifest content'
  }
  let newManifestContent = {
    ...manifestContent,
    ...this.props
  };
  fs.writeFile(self.outputFile, newManifestContent);
};

module.exports = Plugin;
