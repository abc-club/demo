export default function(context) {
  console.log('正在执行中间件')
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
