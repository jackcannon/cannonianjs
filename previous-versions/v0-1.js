/**
 * Cannonian.js
 * Made by Jack Cannon - c.annon.co.uk
 */

/**
 * GLOBAL VARIABLES
 */
var MS_DAY = ((1000 * 60) * 60) * 24; // milliseconds in a day
var MS_HOU = (1000 * 60) * 60; // milliseconds in an hour
var MS_MIN = 1000 * 60; // milliseconds in a day
var MS_SEC = 1000; // milliseconds in a day


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
    if (!p || ((p.toString().split('.').length-1) == 1)) return false;
    if (p instanceof Date) {
      return this.toString(this.convertToCa(p));
    } else if (((p.split(':').length-1) == 1) || ((p.split(':').length-1) == 3)) {
      //is standard time
      return this.toString(this.convertToCa(p));
    } else if ((p.split(':').length-1) == 4) {
      // is cannonian time
      return this.convertToSt(p);
    }
    return false;
  },

  convertToCa : function(p) {
    if (!p) p = new Date();
    if (!(p instanceof Date)) {
      if ((p.split(':').length-1) == 1) {
        p = this.createDate([this.parseIntFix(p.split(':')[0]), this.parseIntFix(p.split(':')[1]),0,0]);
      } else if ((p.split(':').length-1) == 3) {
        p = this.createDate([this.parseIntFix(p.split(':')[0]), this.parseIntFix(p.split(':')[1]),this.parseIntFix(p.split(':')[2]),this.parseIntFix(p.split(':')[3])]);
      }
    }
    var calcedTime = [], midnight, pod, pst;
    
    midnight = new Date(); midnight.setUTCHours(0); midnight.setUTCMinutes(0); midnight.setUTCSeconds(0); midnight.setUTCMilliseconds(0); midnight = midnight.getTime();
    
    pod = ((p.getTime() - midnight) / MS_DAY); //percent of day
    pst = pod.toString(); //pod string

    calcedTime['h'] = this.formatAsNum([pst.charAt(2), pst.charAt(3)]);
    calcedTime['m'] = this.formatAsNum([pst.charAt(4)]);
    calcedTime['s'] = this.formatAsNum([pst.charAt(5), pst.charAt(6)]);
    calcedTime['l'] = this.formatAsNum([pst.charAt(7)]);
    calcedTime['c'] = this.formatAsNum([pst.charAt(8), pst.charAt(9), pst.charAt(10)]);

    return this.arrToJson(calcedTime);
  },

  convertToSt : function(p) {
    if (!p) p = this.toString();
    pod = this.strToDec(p) + 0.000000001;

    var o = pod * MS_DAY;

    var sH = Math.floor(o / MS_HOU); o = (o % MS_HOU);
    var sM = Math.floor(o / MS_MIN); o = (o % MS_MIN);
    var sS = Math.floor(o / MS_SEC); o = (o % MS_SEC);
    var sN = Math.floor(o);
    return this.toDigits(sH,2) + ':' + this.toDigits(sM,2) + ':' + this.toDigits(sS,2) + ':' + this.toDigits(sN,2);
  },

  strToDec : function(p) {
    if (!p) p = this.toString();
    var q = ('0.' + p).split(':');
    q[1] = q[1].charAt(1);
    q[3] = q[3].charAt(1);
    q = parseFloat(q.join(''));
    return q;
  },

  formatAsNum : function(p) {
    var str = '';

    for(var i = 0; i < p.length; i++) {
      if (p[i] == '' || p[i] == ' ' || p[i] == null) {
        str = str + '0';
      } else {
        str = str + '' + p[i];
      }
    }
    return Math.floor(this.parseIntFix(str));
  },

  parseIntFix : function(p) {
    while(true) {
      if(p == '0' || p == '' || p == ' ') return 0;
      if(p.charAt(0) == '0') {
        p = p.substr(1,p.length - 1);
      } else {
        p = parseInt(p);
        break;
      }
    }
    return p;
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

  createDate : function(p) {
    if(!p || !(p instanceof Array) || (p.length != 4)) return false;
    var date = new Date();
    date.setUTCHours(p[0]);
    date.setUTCMinutes(p[1]);
    date.setUTCSeconds(p[2]);
    date.setUTCMilliseconds(p[3]);
    return date;
  },

  toDigits : function(num, dig) {
    var str = null, y = 1, z = '';
    for(var i = 1; i < dig; i++) {y=y*10; z=z+'0';}
    return (num >= 0 && num < y) ? z.substr(0,(dig - num.toString().length)) + num : num;
  },

  toString : function(p) { //converts JSON object to string
    if(!p) p = this.time;
    return this.toDigits(p.h,2) + ':' + 
      this.toDigits(p.m,2) + ':' + 
      this.toDigits(p.s,2) + ':' + 
      this.toDigits(p.l,2) + ':' + 
      this.toDigits(p.c,3);
  },

  toDec : function() {
    return this.strToDec(this.toString());
  }
};