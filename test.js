
var errors = [];

function test(name, func) {
  console.log(name);
  console.log(func());
}

function tl(p1, p2) { // test log
  var testPassed = true;

  if(p1 != null && p2 != null) {
    var r1 = eval(p1);
    if (!(r1 == p2)) {
      errors.push([p1,p2]);
    }
    pr((r1 == p2) + ' (' + r1 + ') : ' + p1 + ' == ' + p2);
    return (r1 == p2)? true : [r1, p1, p2];
  } else {
    return false;
  }
}

function pr(msg) {
  $('body').append(msg +'<br/>');
}

function h(num, msg) {
  if((num != 1) && (num != 2) && (num != 3) && (num != 4) && (num != 5)) num = 1;
  $('body').append('<h' + num + '>' + msg + '</h' + num + '>');
}
