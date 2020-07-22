// 执行 node node_modules/echarts/build/build.js --min -i echarts.custom.js -o lib/echarts.custom.min.js
// 需要先给echarts装依赖

// 引入 echarts 主模块。
export * from 'echarts/src/echarts';
// 引入饼图。
import 'echarts/src/chart/pie';
// 在这个场景下，可以引用 `echarts/src` 或者 `echarts/lib` 下的文件（但是不可混用），
// 参见下方的解释：“引用 `echarts/lib/**` 还是 `echarts/src/**`”。