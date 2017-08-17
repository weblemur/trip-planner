/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

var Day = db.define('day', {
  number: Sequelize.INTEGER
}, {
  hooks: {
    afterDestroy: (instance, opts) => {
      return Day.findAll({ where: { number: { $gt: instance.number } } })
      .then(days => {
        return Promise.all(days.map(day => day.update({ number: day.number - 1 })));
      });
    }
  }
});

Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, { through: 'day_restaurant' });
Day.belongsToMany(Activity, { through: 'day_activity' });

module.exports = Day;
