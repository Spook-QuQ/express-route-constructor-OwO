const requireDir = require('require-dir')
const path = require('path')

const setRouter = (router, routes) => {
  Object.keys(routes).forEach(routeName => {
    const routeIndex = routes[routeName].index

    if (!routeIndex) return

    // const routeNameList = Object.keys(routes[routeName]).filter(n => n !== 'index')
    setRouter(routeIndex.router, routes[routeName])

    const routePath = routeName == 'index' ? // index は root path（ / : スラッシュ ）にする
        ''
      :
        'path' in routeIndex ?  // router に path が無ければ ファイル名 を path にする
            routeIndex.path
          :
            routeName

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
