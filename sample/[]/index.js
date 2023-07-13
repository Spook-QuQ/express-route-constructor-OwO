/*
  * http://localhost:3000/
  */

var express = require('express');
var router = express.Router({ mergeParams: true });
// margeParams: true がないと、親routerのparamsを子routerからアクセスできない

const path = 'sample_desu/:shop' // path が無い場合フォルダ名がルート名になる
// この場合で path がなかった時、フォルダ名である sample がルート名になる

router.get('/', function(req, res, next) {

  console.log(req.params)
  const { shop, sushi } = req.params
  res.send(`
    <span>
      <h1>Index - Index</h1>
    </span>
  `)
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
