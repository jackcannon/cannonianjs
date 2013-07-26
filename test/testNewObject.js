var CannonianJS = require('../cannonianjs-latest.js');
var assert = require('assert');

var tests = {};

tests.testNewObjectWhenGivenNothing = function () {
  var cann = new CannonianJS();

  // has shortened variables
  assert.ok(cann.hour, 'has property "hour"');
  assert.ok(cann.minu, 'has property "minu"');
  assert.ok(cann.cent, 'has property "cent"');
  assert.ok(cann.mill, 'has property "mill"');
  assert.ok(cann.micr, 'has property "micr"');


  // has full name variables
  assert.equal(cann.minute, cann.minu, 'has property "minute"');
  assert.equal(cann.centiminute, cann.cent, 'has property "centiminute"');
  assert.equal(cann.milliminite, cann.mill, 'has property "milliminute"');
  assert.equal(cann.microminute, cann.micr, 'has property "microminute"');


  // has cannonian times object
  assert.ok(cann.cann, 'has property "cann"');
  assert.ok(cann.cannonian, 'has property "cannonian"');

  assert.ok(cann.cann.minu, 'has property "minu"');
  assert.ok(cann.cann.cent, 'has property "cent"');
  assert.ok(cann.cann.mill, 'has property "mill"');
  assert.ok(cann.cann.micr, 'has property "micr"');

  assert.equal(cann.cann.minute, cann.cann.minu, 'has property "minute"');
  assert.equal(cann.cann.centiminute, cann.cann.cent, 'has property "centiminute"');
  assert.equal(cann.cann.milliminite, cann.cann.mill, 'has property "milliminute"');
  assert.equal(cann.cann.microminute, cann.cann.micr, 'has property "microminute"');


  // has standard times object
  assert.ok(cann.stan, 'has property "stan"');
  assert.equal(cann.standard, cann.stan, 'has property "standard"');

  assert.ok(cann.stan.hour, 'has property "stan.hour"');
  assert.ok(cann.stan.minu, 'has property "stan.minu"');
  assert.ok(cann.stan.seco, 'has property "stan.seco"');
  assert.ok(cann.stan.mill, 'has property "stan.mill"');

  assert.ok(cann.stan.hour, 'has property "stan.hour"');
  assert.ok(cann.stan.minute, 'has property "stan.minute"');
  assert.ok(cann.stan.second, 'has property "stan.second"');
  assert.ok(cann.stan.millisecond, 'has property "stan.millisecond"');


  assert.ok(cann.stan, 'has property "stan"');
  assert.ok(cann.standard, 'has property "standard"');

  assert.ok(cann.stan.hour, 'has property "hour"');
  assert.ok(cann.stan.minu, 'has property "minu"');
  assert.ok(cann.stan.seco, 'has property "seco"');
  assert.ok(cann.stan.mill, 'has property "mill"');

  assert.equal(cann.stan.hour, cann.stan.hour, 'has property "hour"');
  assert.equal(cann.stan.minute, cann.stan.minu, 'has property "minute"');
  assert.equal(cann.stan.second, cann.stan.seco, 'has property "second"');
  assert.equal(cann.stan.millisecond, cann.stan.mill, 'has property "millisecond"');

  tests.testNewObjectWhenGivenDateObject();
}

tests.testNewObjectWhenGivenDateObject = function () {
  var date = new Date('Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)');

  var cann = new CannonianJS();


    // has shortened variables
  assert.ok(cann.hour, 'has property "hour"');
  assert.ok(cann.minu, 'has property "minu"');
  assert.ok(cann.cent, 'has property "cent"');
  assert.ok(cann.mill, 'has property "mill"');
  assert.ok(cann.micr, 'has property "micr"');


  // has full name variables
  assert.equal(cann.minute, cann.minu, 'has property "minute"');
  assert.equal(cann.centiminute, cann.cent, 'has property "centiminute"');
  assert.equal(cann.milliminite, cann.mill, 'has property "milliminute"');
  assert.equal(cann.microminute, cann.micr, 'has property "microminute"');


  // has cannonian times object
  assert.ok(cann.cann, 'has property "cann"');
  assert.ok(cann.cannonian, 'has property "cannonian"');

  assert.ok(cann.cann.minu, 'has property "minu"');
  assert.ok(cann.cann.cent, 'has property "cent"');
  assert.ok(cann.cann.mill, 'has property "mill"');
  assert.ok(cann.cann.micr, 'has property "micr"');

  assert.equal(cann.cann.minute, cann.cann.minu, 'has property "minute"');
  assert.equal(cann.cann.centiminute, cann.cann.cent, 'has property "centiminute"');
  assert.equal(cann.cann.milliminite, cann.cann.mill, 'has property "milliminute"');
  assert.equal(cann.cann.microminute, cann.cann.micr, 'has property "microminute"');


  // has standard times object
  assert.ok(cann.stan, 'has property "stan"');
  assert.equal(cann.standard, cann.stan, 'has property "standard"');

  assert.ok(cann.stan.hour, 'has property "stan.hour"');
  assert.ok(cann.stan.minu, 'has property "stan.minu"');
  assert.ok(cann.stan.seco, 'has property "stan.seco"');
  assert.ok(cann.stan.mill, 'has property "stan.mill"');

  assert.ok(cann.stan.hour, 'has property "stan.hour"');
  assert.ok(cann.stan.minute, 'has property "stan.minute"');
  assert.ok(cann.stan.second, 'has property "stan.second"');
  assert.ok(cann.stan.millisecond, 'has property "stan.millisecond"');


  assert.ok(cann.stan, 'has property "stan"');
  assert.ok(cann.standard, 'has property "standard"');

  assert.ok(cann.stan.hour, 'has property "hour"');
  assert.ok(cann.stan.minu, 'has property "minu"');
  assert.ok(cann.stan.seco, 'has property "seco"');
  assert.ok(cann.stan.mill, 'has property "mill"');

  assert.equal(cann.stan.hour, cann.stan.hour, 'has property "hour"');
  assert.equal(cann.stan.minute, cann.stan.minu, 'has property "minute"');
  assert.equal(cann.stan.second, cann.stan.seco, 'has property "second"');
  assert.equal(cann.stan.millisecond, cann.stan.mill, 'has property "millisecond"');

  // has correct values
  assert.equal(cann.hour);
}



for(var first in tests) break;
tests[first]();