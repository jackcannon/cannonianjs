/**
 * GLOBAL VARIABLES
 */
var MILLISECONDSINADAY = ((1000 * 60) * 60) * 24;


/**
 * FUNCTIONS
 */

function cannonianjs(p) {

  if (window === this) {
    return new cannonianjs(p);
  }
  this.time = cannonianjs.prototype.convertToCa((p)? p : new Date());
  return this;
}

cannonianjs.prototype = {
  conv : function(p) {

  },

  convertToCa : function(pDate) {
    var calcedTime = [], midnight, pod, pst;
    
    midnight = new Date(); midnight.setUTCHours(0); midnight.setUTCMinutes(0); midnight.setUTCSeconds(0); midnight.setUTCMilliseconds(0); midnight = midnight.getTime();
    
    pod = ((pDate.getTime() - midnight) / MILLISECONDSINADAY); //percent of day
    pst = pod.toString(); //pod string
    
    calcedTime['h'] = Math.floor(parseInt(pst.charAt(2) + '' + pst.charAt(3)));
    calcedTime['m'] = Math.floor(parseInt(pst.charAt(4)));
    calcedTime['s'] = Math.floor(parseInt(pst.charAt(5) + '' + pst.charAt(6)));
    calcedTime['l'] = Math.floor(parseInt(pst.charAt(7)));
    calcedTime['c'] = Math.floor(parseInt(pst.charAt(8) + '' + pst.charAt(9) + '' + pst.charAt(10)));

    return this.arrToJson(calcedTime);
  },

  arrToJson : function(p) {
    return {
      h : p['h'],
      m : p['m'],
      s : p['s'],
      l : p['l'],
      c : p['c']
    };
  },

  jsonToArr : function(p) {
    var a = [];
    a['h'] = p.h;
    a['m'] = p.m;
    a['s'] = p.s;
    a['l'] = p.l;
    a['c'] = p.c;
    return a;
  },

  toDigits : function(num, dig) {
    var str = null, y = 1, z = '';
    for(var i = 1; i < dig; i++) {y=y*10; z=z+'0';}
    return (num >= 0 && num < y) ? z.substr(0,(dig - num.toString().length)) + num : num;
  },

  toString : function() {
    return this.toDigits(this.time.h,2) + ':' + 
      this.toDigits(this.time.m,2) + ':' + 
      this.toDigits(this.time.s,2) + ':' + 
      this.toDigits(this.time.l,2) + ':' + 
      this.toDigits(this.time.c,3);
  }
};