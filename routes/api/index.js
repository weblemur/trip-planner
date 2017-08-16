var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models').Hotel;
var Restaurant = require('../../models').Restaurant;
var Activity = require('../../models').Activity;

router.use('/days', require('./days'));

router.get('/options', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.json({
      hotels: dbHotels,
      restaurants: dbRestaurants,
      activities: dbActivities
    });
  })
  .catch(next);
});

router.get('/hotels', function(req, res, next) {
  Hotel.findAll()
  .then(function(hotels) {
    res.json(hotels);
  })
  .catch(next);
});

router.get('/restaurants', function(req, res, next) {
  Restaurant.findAll()
  .then(function(restaurants) {
    res.json(restaurants);
  })
  .catch(next);
});

router.get('/activities', function(req, res, next) {
  Activity.findAll()
  .then(function(activities) {
    res.json(activities);
  })
  .catch(next);
});


module.exports = router;
