var antr = require('antr');

var run = new antr(
  {
    dirname: __dirname,
    filter: /(test).+\.js$/
  },
  function (err, stats) {
    console.log(err, stats);
  }
);