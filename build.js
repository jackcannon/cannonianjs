/**
 * To do
 * 
 * - Move all non-public functions into a helper functions
 * - Finish all output formatters (toString, toDec, etc.)
 * - Add to function, where you pass a string of i.e. 'string' and it does a toString()
 * - Enable decimels to be passed in as params
 */



/**
 * GLOBAL VARIABLES
 */
var MS_DAY = ((1000 * 60) * 60) * 24; // milliseconds in a day
var MS_HOU = (1000 * 60) * 60; // milliseconds in an hour
var MS_MIN = 1000 * 60; // milliseconds in a day
var MS_SEC = 1000; // milliseconds in a day


/**
 * CONSTUCTOR
 */

function cannonianjs(p) {
  if (window === this) {
    return new cannonianjs(p);
  }

  if(!p) {
    var p = new Date();
  }

  var type = this.getType(p);

  if (type != 'cannonianobj') {
    var converted = this.conv(p, type, null);
  } else {
    var converted = p;
  }
  this.stand = converted.stand;
  this.canno = converted.canno;

  /*
   * FORMATS
   * 
   * this.stand = {
   *   hour: 23,
   *   minu: 59,
   *   seco: 59,
   *   mill: 999,
   *   micr: 999
   * }
   * this.canno = {
   *   hour: 99,
   *   minu: 9,
   *   cent: 99,
   *   mill: 9,
   *   micr: 999
   * }
   */

  return this;
}

/**
 * FUNCTIONS
 */

cannonianjs.prototype = {

  getType : function (p) {
    if(!p) return null;

    if(p instanceof Date) {
      return 'date';
    } else if (p.canno && p.stand) {
      return 'cannonianobj';
    } else if(!isNaN(Date.parse(p))) {
      return 'datestring';
    } else if (typeof p == 'string') {
      if (/^([0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{3})$/.test(p)) {
        return 'cannonianstring';
      } else if (/^([0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{2})$/.test(p)) {
        return 'standardstring';
      } else if (/^([0-9]{2}:[0-9]{2})$/.test(p)) {
        return 'standardstringshort';
      } else {
        return null;
      }
    } else {
      return null;
    }
  },

  conv : function(p, fromType, toType) {
    if (!p) var p = this;
    if (!fromType) var fromType = this.getType(p);

    var res = {};

    if (fromType == 'standardstring' || fromType == 'standardstringshort' || fromType == 'date' || fromType == 'datestring') {
      res.stand = this.parse(fromType, p);
      res.canno = this.convertToCa(res.stand);
    } else if (fromType == 'cannonianstring') {
      res.canno = this.parse(fromType, p);
      res.stand = this.convertToSt(res.canno);
    } else {
      console.log('There seems to be an error...');
    }

    if(toType && (toType == 'standard' || toType == 'stand' || toType == 'st')) {
      return res.stand;
    } else if (toType && (toType == 'cannonian' || toType == 'cann' || toType == 'ca')) {
      return res.canno;
    }
    return res;
  },

  parse : function(type, p) {
    if (type == 'standardstring' || type == 'standard' || type == 'stand' || type == 'st') {
      var nums = p.split(':');
      return {
        hour: parseInt(nums[0]) || 0,
        minu: parseInt(nums[1]) || 0,
        seco: parseInt(nums[2]) || 0,
        mill: parseInt(nums[3]) || 0,
        micr: parseInt(nums[4]) || 0
      };
    } else if (type == 'standardstringshort') {
      var nums = p.split(':');
      return {
        hour: parseInt(nums[0]) || 0,
        minu: parseInt(nums[1]) || 0,
        seco: 0,
        mill: 0,
        micr: 0
      };
    } else if (type == 'cannonianstring' || type == 'cannonian' || type == 'cann' || type == 'ca') {
      var nums = p.split(':');
      return {
        hour: parseInt(nums[0]) || 0,
        minu: parseInt(nums[1]) || 0,
        cent: parseInt(nums[2]) || 0,
        mill: parseInt(nums[3]) || 0,
        micr: parseInt(nums[4]) || 0
      }
    } else if (type == 'date') {
      return {
        hour: parseInt(p.getHours()) || 0,
        minu: parseInt(p.getMinutes()) || 0,
        seco: 0,
        mill: 0,
        micr: 0
      }
    } else if (type == 'datestring') {
      this.parse('date', new Date(p));
    } else {
      return null;
    }
  },

  convertToCa : function(p) {
    if(!p) var p = this;
    if (typeof p.seco !== 'undefined') {
      var use = p;
    } else {
      var use = p.stand;
    }
    var midnight, pod, pst;

    var millToday = ( //milliseconds so far today
      (use.hour * 60 * 60 * 1000) + 
      (use.minu * 60 * 1000) + 
      (use.seco * 1000) + 
      (use.mill)
    );

    pod = millToday / MS_DAY; //percent of day
    pst = pod.toString(); //pod string

    return {
      hour : this.formatAsNum([pst.charAt(2), pst.charAt(3)]),
      minu : this.formatAsNum([pst.charAt(4)]),
      cent : this.formatAsNum([pst.charAt(5), pst.charAt(6)]),
      mill : this.formatAsNum([pst.charAt(7)]),
      micr : this.formatAsNum([pst.charAt(8), pst.charAt(9), pst.charAt(10)])
    };
  },

  convertToSt : function(p) {
    if (!p) p = this;
    pod = this.toDec(p) + 0.000000001; // percent of day

    var o = pod * MS_DAY;

    var sH = Math.floor(o / MS_HOU); o = (o % MS_HOU);
    var sM = Math.floor(o / MS_MIN); o = (o % MS_MIN);
    var sS = Math.floor(o / MS_SEC); o = (o % MS_SEC);
    var sN = Math.floor(o);

    return {
      hour: sH,
      minu: sM,
      seco: sS,
      mill: sN,
      micr: 0
    }
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

  arrToJs : function(p) {
    var a = {};
    for(var i in p) {
      a[i] = p[i];
    }
    return a;
  },

  jsonToArr : function(p) {
    var a = [];
    for(var i in p) {
      a[i] = p[i];
    }
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
    if(!p) p = this.canno;
    return this.toDigits(p.hour,2) + ':' + 
      this.toDigits(p.minu,2) + ':' + 
      this.toDigits(p.cent,2) + ':' + 
      this.toDigits(p.mill,2) + ':' + 
      this.toDigits(p.micr,3);
  },

  toDec : function(p) {
    if (!p) p = this;
    if (typeof p.cent !== 'undefined') {
      var use = p;
    } else {
      var use = p.canno;
    }
    
    console.log(p, use);

    var dec = '0.' + use.hour + '' + use.minu + '' + use.cent + '' + use.mill + '' + use.micr;
    console.log(dec, parseFloat(dec));
    return parseFloat(dec);
  }
};