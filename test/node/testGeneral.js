var cannonianjs = require('../../');
var assert = require('assert');

(function () {
  x = new cannonianjs();

  testDateVals = [
    [2,0,0,0],
    [14,0,0,0],
    [23,59,59,0],
    [12,0,0,0],
    [0,0,0,0]
  ];

  testDate = [];

  for(var i = 0; i < testDateVals.length; i++) {
    testDate[i] = new Date();
    testDate[i].setHours(testDateVals[i][0]);
    testDate[i].setMinutes(testDateVals[i][1]);
    testDate[i].setSeconds(testDateVals[i][2]);
    testDate[i].setMilliseconds(testDateVals[i][3]);
  }

  //getType
  assert.deepEqual(cannonianjs().getType(new Date()), 'date');
  assert.deepEqual(cannonianjs().getType('Sun Jan 27 2013 19:45:50 GMT+0000 (GMT Standard Time)'), 'datestring');
  assert.deepEqual(cannonianjs().getType('75.00.00.00.000'), 'cannonianstring');
  assert.deepEqual(cannonianjs().getType('18:00:00:00'), 'standardstring');

  //constructor
  assert.deepEqual(new cannonianjs('06:00').stand, {hour: 6, minu: 0, seco: 0, mill: 0, micr: 0});
  assert.deepEqual(new cannonianjs('06:00').canno, {hour: 25, minu: 0, cent: 0, mill: 0, micr: 0});

  assert.deepEqual(new cannonianjs('75.00.00.00.000').stand, {hour: 18, minu: 0, seco: 0, mill: 0, micr: 0});
  assert.deepEqual(new cannonianjs('75.00.00.00.000').canno, {hour: 75, minu: 0, cent: 0, mill: 0, micr: 0});
  assert.deepEqual(new cannonianjs(testDate[0]).canno, {hour: 8, minu: 3, cent: 33, mill: 3, micr: 333});
  assert.deepEqual(new cannonianjs('100.00.00.00.000').canno, {hour: 100, minu: 0, cent: 0, mill: 0, micr: 0});
  assert.deepEqual(new cannonianjs('100.00.00.00.000').stand, {hour: 24, minu: 0, seco: 0, mill: 0, micr: 0});
})();