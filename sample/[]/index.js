/*
  * http://localhost:3000/
  */

var express = require('express');
var router = express.Router({ mergeParams: true });
// margeParams: true がないと、親routerのparamsを子routerからアクセスできない

let indexPageHtmlCache = null;
router.get('/', function(req, res, next) {

  // console.log(req.params)
  const { shop, sushi } = req.params

  if (indexPageHtmlCache) res.send(indexPageHtmlCache)
  else res.render('index', { title: 'Index page!'}, (err, html) => {
    console.log('store the html cache of this page')
    indexPageHtmlCache = html
    res.send(html)
  })
})

module.exports = {
  router,
  // path, // なければapp.js上で path はファイル名になる
  middleware: [
    (req, res, next) => {
      console.log('test middleware 1')
      next()
    },
    (req, res, next) => {
      console.log('test middleware 2')
      next()
    }
  ]
}
