var Cannonian = require('../cannonianjs-latest.js');
var assert = require('assert');

var tests = {};

var checkSixFortyFive = function (cann) {

  assert.strictEqual(cann.toStan(1), '6');
  assert.strictEqual(cann.toStan(2), '6:45');
  assert.strictEqual(cann.toStan(3), '6:45:00');
  assert.strictEqual(cann.toStan(4), '6:45:00:000');
  assert.strictEqual(cann.toStan(), '6:45:00:000');

  assert.strictEqual(cann.toCann(1), '28');
  assert.strictEqual(cann.toCann(2), '28.1');
  assert.strictEqual(cann.toCann(3), '28.125');
  assert.strictEqual(cann.toCann(4), '28.125000');
  assert.strictEqual(cann.toCann(), '28.125000');

  assert.strictEqual(cann.toDec(1), 0.3);
  assert.strictEqual(cann.toDec(2), 0.28);
  assert.strictEqual(cann.toDec(3), 0.281);
  assert.strictEqual(cann.toDec(4), 0.2813);
  assert.strictEqual(cann.toDec(5), 0.28125);
  assert.strictEqual(cann.toDec(), 0.28125);

  assert.deepEqual(cann.toCannObject(), { hour: 28, minu: 1, cent: 25, mill: 0, minute: 1, centiminute: 25, milliminute: 0 });
  assert.deepEqual(cann.toStanObject(), { hour: 6, minu: 45, seco: 0, mill: 0, minute: 45, second: 0, millisecond: 0 });
};

tests.fromDate = function () {
  var cann = new Cannonian('Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)', 0);
  checkSixFortyFive(cann);
};

tests.fromDateString = function () {
  var cann = new Cannonian('Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)', 0);
  checkSixFortyFive(cann);
};

tests.fromCannonianObject = function () {
  var param = new Cannonian('Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)', 0);
  var cann = new Cannonian(param, 0);
  checkSixFortyFive(cann);
};

tests.fromDecimal = function () {
  var cann = new Cannonian(0.28125, 0);
  checkSixFortyFive(cann);
};

tests.fromCannonianString = function () {
  var cann = new Cannonian('28.125', 0);
  checkSixFortyFive(cann);
};

tests.fromStandardString = function () {
  var cann = new Cannonian('6:45:00', 0);
  checkSixFortyFive(cann);
};

tests.fromCannObject = function () {
  var obj = {
    hour: 28,
    minu: 1,
    cent: 25
  };
  var cann = new Cannonian(obj, 0);
  checkSixFortyFive(cann);
};

tests.fromStanObject = function () {
  var obj = {
    hour: 6,
    minu: 45,
    seco: 0
  };
  var cann = new Cannonian(obj, 0);
  checkSixFortyFive(cann);
};

for(var t in tests) {
  tests[t]();
}