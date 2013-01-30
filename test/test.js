
/**
 * Jack's Homebrew unit tester!
 */

var errors = [];

function tl(p1, p2) { // test log
  if (p1 instanceof Object) p1 = JSON.stringify(p1);
  if (p2 instanceof Object) p2 = JSON.stringify(p2);
  var testPassed = true;

  if(p1 != null && p2 != null) {
    var r1 = eval(p1);
    if (r1 instanceof Object) r1 = JSON.stringify(r1);

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
