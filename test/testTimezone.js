var Cannonian = require('../cannonianjs-latest.js');
var assert = require('assert');

var tests = {};

tests.testUTCCorrection = function () {
  var cann = new Cannonian('06:45:00', -10);
  assert.strictEqual(cann.stan.hour, 16); // 6 + 10
  assert.strictEqual(cann.toStan(1), '6'); // 16 - 10

  assert.strictEqual(cann.cann.hour, 69);
  assert.strictEqual(cann.toCann(1), '24'); // 69 - (9 * 5)
};

tests.testCannTZIsCorrect = function () {
  assert.strictEqual(new Cannonian('06:45:00', -12).cannTimezone, 10);
  assert.strictEqual(new Cannonian('06:45:00', -11).cannTimezone, 10);
  assert.strictEqual(new Cannonian('06:45:00', -10).cannTimezone, -9);
  assert.strictEqual(new Cannonian('06:45:00', -9).cannTimezone, -8);
  assert.strictEqual(new Cannonian('06:45:00', -8).cannTimezone, -7);
  assert.strictEqual(new Cannonian('06:45:00', -7).cannTimezone, -6);
  assert.strictEqual(new Cannonian('06:45:00', -6).cannTimezone, -5);
  assert.strictEqual(new Cannonian('06:45:00', -5).cannTimezone, -5);
  assert.strictEqual(new Cannonian('06:45:00', -4).cannTimezone, -4);
  assert.strictEqual(new Cannonian('06:45:00', -3).cannTimezone, -3);
  assert.strictEqual(new Cannonian('06:45:00', -2).cannTimezone, -2);
  assert.strictEqual(new Cannonian('06:45:00', -1).cannTimezone, -1);
  assert.strictEqual(new Cannonian('06:45:00', 0).cannTimezone, 0);

  assert.strictEqual(new Cannonian('06:45:00', 1).cannTimezone, 0);
  assert.strictEqual(new Cannonian('06:45:00', 2).cannTimezone, 1);
  assert.strictEqual(new Cannonian('06:45:00', 3).cannTimezone, 2);
  assert.strictEqual(new Cannonian('06:45:00', 4).cannTimezone, 3);
  assert.strictEqual(new Cannonian('06:45:00', 5).cannTimezone, 4);
  assert.strictEqual(new Cannonian('06:45:00', 6).cannTimezone, 5);
  assert.strictEqual(new Cannonian('06:45:00', 7).cannTimezone, 5);
  assert.strictEqual(new Cannonian('06:45:00', 8).cannTimezone, 6);
  assert.strictEqual(new Cannonian('06:45:00', 9).cannTimezone, 7);
  assert.strictEqual(new Cannonian('06:45:00', 10).cannTimezone, 8);
  assert.strictEqual(new Cannonian('06:45:00', 11).cannTimezone, 9);
  assert.strictEqual(new Cannonian('06:45:00', 12).cannTimezone, 10);
};

for(var t in tests) {
  tests[t]();
}