var Cannonian = require('../../cannonianjs/cannonianjs-latest.js');
var moment = require('moment');
var assert = require('assert');

var coll = [];
var now = moment().startOf('day');
var day = now.date();

var i = 0;
while (now.date() == day) {
  coll.push(new Cannonian(now.toDate(), 0, 0).toDec());

  if (coll.length >= 2) {
    assert.ok(coll[coll.length - 1] > coll[coll.length - 2], "Later time must produce higher decimal");
  }

  if (i % 5000 === 0) {
    console.log('Milestone:', i);
  }

  now.add(1, 'seconds');
  i++;
}
