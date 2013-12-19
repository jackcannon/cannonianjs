var Cannonian = require('../cannonianjs-latest.js');
var assert = require('assert');

var tests = {};

var checkSixFortyFive = function (cann) {
  assert.strictEqual('6', cann.toStan(1));
  assert.strictEqual('6:45', cann.toStan(2));
  assert.strictEqual('6:45:00', cann.toStan(3));
  assert.strictEqual('6:45:00:000', cann.toStan(4));
  assert.strictEqual('6:45:00:000', cann.toStan());

  assert.strictEqual('28', cann.toCann(1));
  assert.strictEqual('28.1', cann.toCann(2));
  assert.strictEqual('28.125', cann.toCann(3));
  assert.strictEqual('28.125000', cann.toCann(4));
  assert.strictEqual('28.125000', cann.toCann());

  assert.strictEqual(0.3, cann.toDec(1));
  assert.strictEqual(0.28, cann.toDec(2));
  assert.strictEqual(0.281, cann.toDec(3));
  assert.strictEqual(0.2813, cann.toDec(4));
  assert.strictEqual(0.28125, cann.toDec(5));
  assert.strictEqual(0.28125, cann.toDec());
}

tests.fromDate = function () {
  var cann = new Cannonian('Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)', 0);
  checkSixFortyFive(cann);
}

tests.fromDateString = function () {
  var cann = new Cannonian('Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)', 0);
  checkSixFortyFive(cann);
}

tests.fromCannonianObject = function () {
  var param = new Cannonian('Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)', 0);
  var cann = new Cannonian(param);
  checkSixFortyFive(cann);
}

tests.fromDecimal = function () {
  var cann = new Cannonian(0.28125);
  checkSixFortyFive(cann);
}

for(var t in tests) {
  tests[t]();
}