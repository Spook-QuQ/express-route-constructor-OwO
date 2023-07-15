const requireDir = require('require-dir')
const path = require('path')

const setRouter = (router, routes) => {
  Object.keys(routes).forEach(routeName => {
    const routeIndex = routes[routeName].index

    if (!routeIndex) return

    // const routeNameList = Object.keys(routes[routeName]).filter(n => n !== 'index')
    setRouter(routeIndex.router, routes[routeName])

    //[]の中に文字があるものがurlのparamになる
    //[]が空白の場合は/(最上位)のルートになる
    // paramは複数設定できる
    // 例）test_root[param1][param2]
    // -> test_root/:param1/:param2
    const regex = /\[([^\[\]]+)\]/g
    const params = routeName.match(regex)?.map(param => param.slice(1, -1))

    const routePath = 'path' in routeIndex  // router に path が無ければ ファイル名 を path にする
      ? routeIndex.path
      : routeName.replace(regex, '').replace(/(\[|\])/g, '') + ((params && params.length) ? params.unshift('') && params.join('/:') : '')

  // console.log(routePath)
    if ('middleware' in routeIndex && Array.isArray(routeIndex.middleware) && routeIndex.middleware.length)
      router.use(`/${ routePath }`, ...routeIndex.middleware, routeIndex.router)
    else
      router.use(`/${ routePath }`, routeIndex.router)
  })
}

module.exports = (router, dirPath) => {
  const routes = requireDir(path.join(module.parent.path, dirPath) || '/', { recurse: true })

  setRouter(router, routes)
}
