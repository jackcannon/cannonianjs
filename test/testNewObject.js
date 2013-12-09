var Cannonian = require('../cannonianjs-latest.js');
var assert = require('assert');

var tests = {};

tests.testNewObjectWhenGivenNothing = function () {
  var cann = new Cannonian();

  // has cannonian times object
  assert.ok(cann.cann, 'has property "cann"');

  assert.ok(cann.cann.hour, 'has property "cann.hour"');
  assert.ok(cann.cann.minu, 'has property "cann.minu"');
  assert.ok(cann.cann.cent, 'has property "cann.cent"');
  assert.ok(cann.cann.mill, 'has property "cann.mill"');

  assert.ok(cann.cann.minute, 'has property "cann.minute"');
  assert.ok(cann.cann.centiminute, 'has property "cann.centiminute"');
  assert.ok(cann.cann.milliminute, 'has property "cann.milliminute"');

  assert.equal(cann.cann.minute, cann.cann.minu, '"cann.minute" is same as "cann.minu"');
  assert.equal(cann.cann.centiminute, cann.cann.cent, '"cann.centiminute" is same as "cann.cent"');
  assert.equal(cann.cann.milliminute, cann.cann.mill, '"cann.milliminute" is same as "cann.mill"');


  // has standard times object
  assert.ok(cann.stan, 'has property "stan"');

  assert.ok(cann.stan.hour, 'has property "stan.hour"');
  assert.ok(cann.stan.minu, 'has property "stan.minu"');
  assert.ok(cann.stan.seco, 'has property "stan.seco"');
  assert.ok(cann.stan.mill, 'has property "stan.mill"');

  assert.ok(cann.stan.minute, 'has property "stan.minute"');
  assert.ok(cann.stan.second, 'has property "stan.second"');
  assert.ok(cann.stan.millisecond, 'has property "stan.millisecond"');

  assert.equal(cann.stan.minute, cann.stan.minu, '"stan.minute" is same as "stan.minu"');
  assert.equal(cann.stan.second, cann.stan.seco, '"stan.second" is same as "stan.seco"');
  assert.equal(cann.stan.millisecond, cann.stan.mill, '"stan.millisecond" is same as "stan.mill"');

  tests.testNewObjectWhenGivenDateObject();
}

tests.testNewObjectWhenGivenDateObject = function () {
  var date = new Date('Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)');

  var cann = new Cannonian();
}



for(var first in tests) break;
tests[first]();