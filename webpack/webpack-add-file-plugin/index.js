class AddFilePlugin {
  constructor(options = { filename: 'default.txt', content: 'xxx'}) {
    this.filename = options.filename
    this.content = options.content
  }
  apply(compiler) {
    compiler.hooks.emit.tap('AddFilePlugin', (compilation) => {
      compilation.assets[this.filename] = {
        source: () => this.content,
        size: () => this.content.length,
      }
    })
  }
}

module.exports = AddFilePlugin