var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;

router.use('/api', require('./api'));

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
