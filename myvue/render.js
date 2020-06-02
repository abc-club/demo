// function baseCompile(template, options) {
//   const ast = parse(template.trim(), options); // 1.将模板转化成ast语法树
//   if (options.optimize !== false) {
//     // 2.优化树
//     optimize(ast, options);
//   }
//   const code = generate(ast, options); // 3.生成树
//   return {
//     ast,
//     render: code.render,
//     staticRenderFns: code.staticRenderFns,
//   };
// }

// import compiler from 'vue-template-compiler';

// console.log(
//   compiler.compile(`
// <div id='container'><p>hello<span>zf</span></p></div>
// `),
// );

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是 标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+| ([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >

function createASTElement(tagName, attrs) {
  return { tag: tagName, type: 1, children: [], attrs, parent: null };
}

function parse(template,options) {
  let root;
  let stack = [];
  let currentParent;
  parseHTML(template, {
    start(tagName, attrs) {
      let element = createASTElement(tagName, attrs);
      if (!root) {
        root = element;
      }
      currentParent = element;
      stack.push(element);
    },
    end(tagName) {
      const element = stack[stack.length - 1];
      stack.length--;
      currentParent = stack[stack.length - 1];
      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    },
    chars(text) {
      currentParent.children.push({ type: 3, text });
    },
  })
  return root
}

function parseHTML(html, options) {
  while (html) {
    let textEnd = html.indexOf('<');
    if (textEnd == 0) {
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        options.start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        options.end(endTagMatch[1]);
      }
    }
    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);

      options.chars(text);
    }
  }
  function advance(n) {
    html = html.substring(n);
  }

  function parseStartTag() {
    const start = html.match(startTagOpen);

    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };

      advance(start[0].length);
      let attr, end;

      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push({ name: attr[1], value: attr[3] }); // 这里不对，3？？？
      }
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }
}

function gen(node) {
  if (node.type == 1) {
    return generate(node);
  } else {
    return `_v(${JSON.stringify(node.text)})`;
  }
}
function genChildren(el) {
  const children = el.children;
  if (el.children) {
    return `[${children.map((c) => gen(c)).join(',')}]`;
  } else {
    return false;
  }
}
function genProps(attrs) {
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];

    str += `${attr.name}:${attr.value},`;
  }
  return `{attrs:{${str.slice(0, -1)}}}`;
}

function genElement(el) {
  let code
  let data = genData(el)
  let children = genChildren(el);
  code = `_c('${el.tag}'${
    data ? `,${data}` : '' // data
  }${
    children ? `,${children}` : '' // children
  })`
  return code
}

function genData(el) {
  let data = '{'
  if(el.attrs) {
    data += `attrs:${genProps(el.attrs)},`
  }
  data = data.replace(/,$/, '') + '}'
  return data
}

function generate(ast, options) {
  const code = ast ? genElement(ast) : '_c("div")'
  return {
    render: `with(this){return ${code}}`
  };
}


function baseCompile(template, options) {
  const ast = parse(template.trim(), options); // 1.将模板转化成ast语法树
  console.log(ast);
  // if (options.optimize !== false) {
  //   // 2.优化树
  //   optimize(ast, options);
  // }
  const code = generate(ast, options); // 3.生成树
  return {
    ast,
    render: code.render,
    // staticRenderFns: code.staticRenderFns,
  };
}


baseCompile(`<div id='container'><p>hello<span>zf</span></p></div>`)
