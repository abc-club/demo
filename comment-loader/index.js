const loaderUtils = require('loader-utils');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  console.log(options)
  return options && options.comment ? `// ${options.comment}
    ${source}
  ` : source
}