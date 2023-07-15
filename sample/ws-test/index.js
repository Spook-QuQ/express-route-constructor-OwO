/*
  * http://localhost:3000/ws-test
  */

var express = require('express');
var router = express.Router({ mergeParams: true });

router.get('/', function(req, res, next) {
  res.render('ws-test')
})

module.exports = {
  router,
  // path, 
  // middleware: []
}
