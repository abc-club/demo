function View(name, options) {
  var opts = options || {};

  this.defaultEngine = opts.defaultEngine;
  this.root = opts.root;

  this.ext = path.extname(name);
  this.name = name;

  var fileName = name;
  if (!this.ext) {
    // get extension from default engine name
    this.ext = this.defaultEngine[0] !== '.' ? '.' + this.defaultEngine : this.defaultEngine;

    fileName += this.ext;
  }

  // store loaded engine
  this.engine = opts.engines[this.ext];

  // lookup path
  this.path = this.lookup(fileName);
}

View.prototype.render = function render(options, callback) {
  this.engine(this.path, options, callback);
};
exports = module.exports = View;
