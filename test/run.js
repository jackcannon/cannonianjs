var antr = require('antr');

var run = new antr(
  {
    dirname: __dirname,
    filter: /(test).{1,}\.js$/
  },
  function (err, stats) {
    if(err) {
      console.log(err, stats);
    } else {
      console.log(stats);
    }
  }
);