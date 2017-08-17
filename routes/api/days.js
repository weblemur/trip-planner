var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models').Hotel;
var Restaurant = require('../../models').Restaurant;
var Activity = require('../../models').Activity;
var Day = require('../../models').Day;

router.param('id', function(req, res, next, id) {
  Day.findById(id)
  .then(day => {
    req.day = day;
    next();
  }).catch(next);
});

router.get('/', function(req, res, next) {
  Day.findAll({ include: [ Hotel, Restaurant, Activity ], order: [['number', 'ASC']]})
  .then(function(days) {
    res.json(days);
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  res.json(req.day);
});

router.post('/', function(req, res, next) {
  Day.create(req.body)
  .then(function(day) {
    res.json(day);
  })
  .catch(next);
});

router.delete('/:id', function(req, res, next) {
  req.day.destroy()
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
});

router.get('/:id/hotel', function(req, res, next) {
  req.day.getHotel()
  .then(hotel => {
    res.json(hotel);
  })
  .catch(next);
});

router.post('/:id/hotel', function(req, res, next) {
  req.day.setHotel(req.body.hotelId)
  .then(day => {
    console.log(req.body, day);
    res.sendStatus(200);
  })
  .catch(next);
});

router.get('/:id/restaurants', function(req, res, next) {
  req.day.getRestaurants()
  .then(restaurants => {
    res.json(restaurants);
  })
  .catch(next);
});

router.get('/:id/activities', function(req, res, next) {
  req.day.getActivities()
  .then(activities => {
    res.json(activities);
  })
  .catch(next);
});

module.exports = router;
