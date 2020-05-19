var s = '\uD842\uDFB7'; // 𠮷
var s1 = '\u20BB7'; // ₻7
var s2 = '\u{20BB7}'; // 𠮷
console.log(s, s1, s2);

// 模板编译

function compile(template) {
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`').replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  function parse(data) {
    let output = '';

    function echo(html) {
      output += html;
    }

    eval(template);

    return output;
  }

  return parse;
}

let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
let parse = compile(template);
let htm = parse({ supplies: ['broom', 'mop', 'cleaner'] });
console.log(htm);

// ----------------
const REGEX = /a/gy;
var aa = 'aaxa'.replace(REGEX, '-'); // '--xa'
console.log(aa);

// ----------------

console.log('a1a2a3'.match(/a\d/y)); // [ 'a1', index: 0, input: 'a1a2a3', groups: undefined ]

// ----------------
console.log(/(?<=(\d+)(\d+))$/.exec('1053')); // [ '', '1', '053', index: 4, input: '1053', groups: undefined ]

// ----------------
console.log(/(?<=(o)d\1)r/.exec('hodor')); // null
// 注意这里是反向的，需要先捕获后面的o
console.log(/(?<=\1d(o))r/.exec('hodor')); // [ 'r', 'o', index: 4, input: 'hodor', groups: undefined ]
console.log(/(?<=bc)d/.exec('abcd')); // [ 'd', index: 3, input: 'abcd', groups: undefined ]
