const VueTemplateCompiler = require('vue-template-compiler');

let r2 = VueTemplateCompiler.compile(`<keep-alive>
<component :is="view"></component>
</keep-alive>
`);

console.log(r2)