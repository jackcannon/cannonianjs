var Cannonian = require('../cannonianjs-latest.js');
var assert = require('assert');

var tests = {};

var testHasProperties = function (cann) {
  // has cannonian times object
  assert.ok(cann.cann, 'has property "cann"');

  assert.equal('number', typeof cann.cann.hour, 'has property "cann.hour"');
  assert.equal('number', typeof cann.cann.minu, 'has property "cann.minu"');
  assert.equal('number', typeof cann.cann.cent, 'has property "cann.cent"');
  assert.equal('number', typeof cann.cann.mill, 'has property "cann.mill"');

  assert.equal('number', typeof cann.cann.minute, 'has property "cann.minute"');
  assert.equal('number', typeof cann.cann.centiminute, 'has property "cann.centiminute"');
  assert.equal('number', typeof cann.cann.milliminute, 'has property "cann.milliminute"');

  assert.equal(cann.cann.minute, cann.cann.minu, '"cann.minute" is same as "cann.minu"');
  assert.equal(cann.cann.centiminute, cann.cann.cent, '"cann.centiminute" is same as "cann.cent"');
  assert.equal(cann.cann.milliminute, cann.cann.mill, '"cann.milliminute" is same as "cann.mill"');

  // has standard times object
  assert.ok(cann.stan, 'has property "stan"');

  assert.equal('number', typeof cann.stan.hour, 'has property "stan.hour"');
  assert.equal('number', typeof cann.stan.minu, 'has property "stan.minu"');
  assert.equal('number', typeof cann.stan.seco, 'has property "stan.seco"');
  assert.equal('number', typeof cann.stan.mill, 'has property "stan.mill"');

  assert.equal('number', typeof cann.stan.minute, 'has property "stan.minute"');
  assert.equal('number', typeof cann.stan.second, 'has property "stan.second"');
  assert.equal('number', typeof cann.stan.millisecond, 'has property "stan.millisecond"');

  assert.equal(cann.stan.minute, cann.stan.minu, '"stan.minute" is same as "stan.minu"');
  assert.equal(cann.stan.second, cann.stan.seco, '"stan.second" is same as "stan.seco"');
  assert.equal(cann.stan.millisecond, cann.stan.mill, '"stan.millisecond" is same as "stan.mill"');


  assert.equal('number', typeof cann.cannTimezone, 'has property "cannTimezone"');
  assert.equal('number', typeof cann.stanTimezone, 'has property "stanTimezone"');
};

tests.testNewObjectWhenGivenNothing = function () {
  var cann = new Cannonian();
  testHasProperties(cann);
};

tests.testNewObjectWhenGivenDateObject = function () {
  var date = new Date('Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)');
  var cann = new Cannonian(date);
  testHasProperties(cann);
};

tests.testNewObjectWhenGivenCannObject = function () {
  var obj = {
    hour: 1,
    minu: 2,
    cent: 3
  };
  var cann = new Cannonian(obj, 0);
  testHasProperties(cann);
};

tests.testNewObjectWhenGivenStanObject = function () {
  var obj = {
    hour: 1,
    minu: 2,
    seco: 3
  };
  var cann = new Cannonian(obj, 0);
  testHasProperties(cann);
};

for(var t in tests) {
  tests[t]();
}