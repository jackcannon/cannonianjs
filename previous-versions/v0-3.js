/**
 * Cannonian.js
 * Made by Jack Cannon - c.annon.co.uk
 */


var cannonianjs = (function () {
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
    if (typeof module !== 'undefined' && module.exports) { // is node
      if (global === this) {
        return new cannonianjs(p);
      }
    } else { // is browser
      if (window === this) {
        return new cannonianjs(p);
      }
    }

    if(!p) {
      var p = new Date();
    }

    var type = this.getType(p);

    if (type != 'error') {
      if (type != 'cannonianobj') {
        var converted = this.conv(p, type, null);
      } else {
        var converted = p;
      }
    } else {
      var converted = {message: 'Unknown Error'};
    }

    if (!!converted.message) {
      this.message = converted.message;
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
   * PUBLIC FUNCTIONS
   */

  cannonianjs.prototype = {

    conv : function(p, fromType, toType) {
      if (!p) var p = this;
      if (!fromType) var fromType = this.getType(p);

      var res = {};

      if (fromType == 'standardstring' || fromType == 'standardstringshort' || fromType == 'date' || fromType == 'datestring') {
        res.stand = this.parse(fromType, p);
        res.canno = this.helper.convertToCa.bind(this)(res.stand);
      } else if (fromType == 'cannonianstring' || fromType == 'dec') {
        res.canno = this.parse(fromType, p);
        res.stand = this.helper.convertToSt.bind(this)(res.canno);
      } else if (fromType == 'stanpart') {
        res.stand = p
        res.canno = this.helper.convertToCa.bind(this)(res.stand);
      } else if (fromType == 'cannpart') {
        res.canno = p
        res.stand = this.helper.convertToSt.bind(this)(res.canno);
      } else {
        res.message = 'There seems to be an error...';
      }

      if(toType && (toType == 'standard' || toType == 'stand' || toType == 'st')) {
        return res.stand;
      } else if (toType && (toType == 'cannonian' || toType == 'cann' || toType == 'ca')) {
        return res.canno;
      }
      return res;
    },

    getType : function (p) {
      if(!p) return null;

      function isSet(q) {
        return (q || q == 0);
      }

      if(p instanceof Date) {
        return 'date';
      } else if (isSet(p.hour) && isSet(p.minu) && isSet(p.seco) && isSet(p.mill) && isSet(p.micr)) {
        return 'stanpart';
      } else if (isSet(p.hour) && isSet(p.minu) && isSet(p.cent) && isSet(p.mill) && isSet(p.micr)) {
        return 'cannpart';
      } else if (p.canno && p.stand) {
        return 'cannonianobj';
      } else if(!isNaN(Date.parse(p))) {
        return 'datestring';
      } else if (p <= 1 && p >= 0) {
        return 'dec';
      } else if (typeof p == 'string') {
        if (/^([0-9]{2,3}\.){1,3}([0-9]{2,3})$/.test(p)) {
          return 'cannonianstring';
        } else if (/^([0-9]{2})(:[0-9]{2})(:[0-9]{2})?(:[0-9]{2})?$/.test(p)) {
          return 'standardstring';
        } else if (/^([0-9]{2}:[0-9]{2})$/.test(p)) {
          return 'standardstringshort';
        } else {
          return 'error';
        }
      } else {
        return 'error';
      }
    },

    parse : function(type, p) {
      if (!p) var p = this;
      if (!type) var type = this.getType(p);
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
        var nums = p.split('.');
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
          seco: parseInt(p.getSeconds())  || 0,
          mill: parseInt(p.getMilliseconds()) || 0,
          micr: 0
        }
      } else if (type == 'datestring') {
        return this.parse('date', new Date(p));
      } else if (type == 'dec') {
        var n = {};
        var r = p * 100;

        n.hour = Math.floor(r) || 0; // *100
        r = (r - n.hour) * 10;
        n.minu = Math.floor(r) || 0; // *1000
        r = (r - n.minu) * 100;
        n.cent = Math.floor(r) || 0; // *100000
        r = (r - n.cent) * 10;
        n.mill = Math.floor(r) || 0;
        r = (r - n.mill) * 1000;
        n.micr = Math.floor(r) || 0;

        return n;
      } else {
        return null;
      }
    },

    toCan : function(p,show) {
      if(!p) var p = this.canno;
      if(typeof show === 'undefined' || (typeof show !== 'undefined' && (show < 0 || show > 5))) var show = 5;
      var run = '';

      if(show >= 1) {
        run = run + this.helper.toDigits(p.hour,2);
        if(show >= 2) {
          run = run + '.' + this.helper.toDigits(p.minu,2);
          if(show >= 3) {
            run = run + '.' + this.helper.toDigits(p.cent,2);
            if(show >= 4) {
              run = run + '.' + this.helper.toDigits(p.mill,2);
              if(show >= 5) {
                run = run + '.' + this.helper.toDigits(p.micr,3);
              }
            }
          }
        }
      }

      return run;
    },

    toSta : function(p, show) { //converts JSON object to string
      if(!p) var p = this.stand;
      if(typeof show === 'undefined' || (typeof show !== 'undefined' && (show < 0 || show > 3))) var show = 3;
      var run = '';

      if(show >= 1) {
        run = run + this.helper.toDigits(p.hour,2);
        if(show >= 2) {
          run = run + ':' + this.helper.toDigits(p.minu,2);
          if(show >= 3) {
            run = run + ':' + this.helper.toDigits(p.seco,2);
          }
        }
      }

      return run;
    },

    toDec : function(p) {
      if (!p) p = this;
      if (typeof p.cent !== 'undefined') {
        var use = p;
      } else {
        var use = p.canno;
      }
      if (use.hour > 99) return 1;
      var dec = '0.' + 
          this.helper.toDigits(use.hour,2) + '' + 
          this.helper.toDigits(use.minu,1) + '' + 
          this.helper.toDigits(use.cent,2) + '' + 
          this.helper.toDigits(use.mill,1) + '' +
          this.helper.toDigits(use.micr,3);
      return parseFloat(dec);
    },



    helper : {

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
          hour : this.helper.formatAsNum([pst.charAt(2), pst.charAt(3)]),
          minu : this.helper.formatAsNum([pst.charAt(4)]),
          cent : this.helper.formatAsNum([pst.charAt(5), pst.charAt(6)]),
          mill : this.helper.formatAsNum([pst.charAt(7)]),
          micr : this.helper.formatAsNum([pst.charAt(8), pst.charAt(9), pst.charAt(10)])
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

      toDigits : function(num, dig) {
        var str = null, y = 1, z = '';
        for(var i = 1; i < dig; i++) {y=y*10; z=z+'0';}
        return (num >= 0 && num < y) ? z.substr(0,(dig - num.toString().length)) + num : num;
      },

      formatAsNum : function(p) { // don't bind
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
      }

    }

  };

  // Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = cannonianjs;
  }
  // Browser
  else {
    return cannonianjs;
  }

})();