/**
 * Cannonian.js
 * Made by Jack Cannon - c.annon.co.uk
 * v1.1.2
 */


var Cannonian = (function () {
  /**
   * 'CONSTANTS'
   */
  var MS_DAY = ((1000 * 60) * 60) * 24; // milliseconds in a day
  var MS_HOU = (1000 * 60) * 60; // milliseconds in an hour
  var MS_MIN = 1000 * 60; // milliseconds in a minute
  var MS_SEC = 1000; // milliseconds in a second


  /**
   * CONSTUCTOR
   */

  function Cannonian(p, stz, ctz) {
    if (typeof module !== 'undefined' && module.exports) { // is node
      if (global === this) {
        return new Cannonian(p);
      }
    } else { // is browser
      if (window === this) {
        return new Cannonian(p);
      }
    }

    this.cann = null;
    this.stan = null;

    var timezones = helper.calculateTimezones(stz, ctz);
    this.stanTimezone = timezones.stan;
    this.cannTimezone = timezones.cann;

    this.set(p);

    /*
     * FORMATS
     * 
     * this.stan = {
     *   hour: 23,
     *   minu: 59,
     *   seco: 59,
     *   mill: 999
     *   minute: 59,
     *   second: 59,
     *   millisecond: 999
     * }
     * this.cann = {
     *   hour: 99,
     *   minu: 9,
     *   cent: 99,
     *   mill: 9,
     *   minute: 9,
     *   centiminute: 99,
     *   milliminute: 9
     * }
     */

    return this;
  }


  /**
   * PUBLIC FUNCTIONS
   */

  Cannonian.prototype = {
    set: function (p) {
      if(helper.is.cannonian(p)) { // is cannonian object
        this.cann = helper.getCann.fromCannonian(p); // dont take timezone
        this.stan = helper.convert.cannToStan(this.cann);

      } else if(helper.is.decimal(p)) { // is decimal number
        this.cann = helper.takeTimezone.cann(helper.getCann.fromDecimal(p), this.cannTimezone);
        this.stan = helper.convert.cannToStan(this.cann);

      } else if(helper.is.cannonianString(p)) { // is cannonian string
        this.cann = helper.takeTimezone.cann(helper.getCann.fromCannonianString(p), this.cannTimezone);
        this.stan = helper.convert.cannToStan(this.cann);

      } else if(helper.is.standardString(p)) { // is standard string
        this.stan = helper.takeTimezone.stan(helper.getStan.fromStandardString(p), this.stanTimezone);
        this.cann = helper.convert.stanToCann(this.stan);

      } else if(helper.is.date(p)) { // is Date object
        this.stan = helper.takeTimezone.stan(helper.getStan.fromDate(p), this.stanTimezone);
        this.cann = helper.convert.stanToCann(this.stan);

      } else if(helper.is.datestring(p)) { // is Date string
        this.stan = helper.takeTimezone.stan(helper.getStan.fromDatestring(p), this.stanTimezone);
        this.cann = helper.convert.stanToCann(this.stan);

      } else if(helper.is.cannObject(p)) { // is Cannonian Object
        this.cann = helper.takeTimezone.cann(helper.getCann.fromCannObject(p), this.cannTimezone);
        this.stan = helper.convert.cannToStan(this.cann);
        
      } else if(helper.is.stanObject(p)) {
        this.stan = helper.takeTimezone.stan(helper.getStan.fromStanObject(p), this.stanTimezone)
        this.cann = helper.convert.stanToCann(this.stan);

      } else { // use now
        this.stan = helper.takeTimezone.stan(helper.getStan.fromDate(new Date()), this.stanTimezone);
        this.cann = helper.convert.stanToCann(this.stan);
      }

      Object.freeze(this.stan);
      Object.freeze(this.cann);
    },
    toCann: function (sections) {
      if(typeof sections !== 'number' || sections > 4) var sections = 4;
      if(sections <= 0) var sections = 1;

      var output = '';
      var vals = [
        { digits: null, val: helper.applyTimezone.cann(this.cann, this.cannTimezone).hour },
        { digits: 1, val: this.cann.minu },
        { digits: 2, val: this.cann.cent },
        { digits: 3, val: this.cann.mill }
      ];
      for(var s = 0; s < sections; s++) {
        output += (vals[s].digits)? helper.toDigits(vals[s].val, vals[s].digits) : vals[s].val;
        if(s === 0 && sections !== 1) output += '.';
      }
      return output;
    },
    toStan: function (sections) {
      if(typeof sections !== 'number' || sections > 4) var sections = 4;
      if(sections <= 0) var sections = 1;

      var output = '';
      var vals = [
        { digits: null, val: helper.applyTimezone.stan(this.stan, this.stanTimezone).hour },
        { digits: 2, val: this.stan.minu },
        { digits: 2, val: this.stan.seco },
        { digits: 3, val: this.stan.mill }
      ];
      for(var s = 0; s < sections; s++) {
        output += (vals[s].digits)? helper.toDigits(vals[s].val, vals[s].digits) : vals[s].val;
        if(s + 1 !== sections) output += ':';
      }
      return output;
    },
    toDec: function (places) {
      var withTZ = helper.applyTimezone.cann(this.cann, this.cannTimezone);
      var dec = (withTZ.hour / 100) + (withTZ.minu / 1000) + (withTZ.cent / 100000) + (withTZ.mill / 100000000);
      return (typeof places == 'number') ? parseFloat(dec.toFixed(places)) : parseFloat(dec.toFixed(8)) ;
    },
    toCannObject: function () {
      return helper.applyTimezone.cann(this.cann, this.cannTimezone);
    },
    toStanObject: function () {
      return helper.applyTimezone.stan(this.stan, this.stanTimezone);
    }
  };


  /**
   * PRIVATE FUNCTION
   */

  var helper = {
    is: {
      cannonian: function (p) {
        return p instanceof Cannonian && p.cann && p.stan;
      },
      cannonianString: function (p) {
        return p && /^[0-9]{1,2}\.[0-9]{1,6}$/.test(p);
      },
      standardString: function (p) {
        return p && /^([0-9]{1,2}:){1,3}([0-9]{2,3})?$/.test(p);
      },
      decimal: function (p) {
        return typeof p === 'number' && p >= 0 && p < 1;
      },
      date: function (p) {
        return p instanceof Date && p.toString() !== 'Invalid Date';
      },
      datestring: function (p) {
        if(p === null) return false;
        var d = new Date(p);
        return this.date(d);
      },
      decimal: function (p) {
        return typeof p === 'number' && p <= 100 && p >= 0;
      },
      cannObject: function (p) {
        return typeof p === 'object' && typeof p.hour !== 'undefined' && (typeof p.cent !== 'undefined' || typeof p.centiminute !== 'undefined');
      },
      stanObject: function (p) {
        return typeof p === 'object' && typeof p.hour !== 'undefined' && (typeof p.seco !== 'undefined' || typeof p.seco !== 'undefined');
      }
    },
    getStan: {
      fromDate: function (p) {
        if(!(helper.is.date(p))) throw new Error('Not a Date object');
        var stan = {
          hour: p.getHours(),
          minu: p.getMinutes(),
          seco: p.getSeconds(),
          mill: p.getMilliseconds()
        };
        return helper.fill.stan(stan);
      },
      fromDatestring: function (p) {
        if(!(helper.is.datestring(p))) throw new Error('Not an acceptable Date string');
        var d = new Date(p);
        return this.fromDate(d);
      },
      fromStandardString: function (p) {
        var split = p.split(':');
        var stan = {};
        stan.hour = parseInt(split[0] || 0, 10);
        stan.minu = parseInt(split[1] || 0, 10);
        stan.seco = parseInt(split[2] || 0, 10);
        stan.mill = parseInt(split[3] || 0, 10);
        return helper.fill.stan(stan);
      },
      fromStanObject: function (p) {
        return helper.fill.stan(p);
      }
    },
    getCann: {
      fromCannonian: function (p) {
        return helper.fill.cann(p.cann);
      },
      fromCannonianString: function (p) {
        var split = p.split('.');
        var cann = {};
        cann.hour = parseInt(split[0], 10);
        cann.minu = parseInt(split[1].substr(0, 1) || 0, 10);
        cann.cent = parseInt(split[1].substr(1, 2) || 0, 10);
        cann.mill = parseInt(split[1].substr(3, 3) || 0, 10);
        return helper.fill.cann(cann);
      },
      fromDecimal: function (p) {
        return helper.convert.stanToCann(null, p);
      },
      fromCannObject: function (p) {
        return helper.fill.cann(p);
      }
    },
    fill: { // will fill in missing properties
      stan: function (obj) {
        return {
          hour: obj.hour || 0,
          minu: obj.minu || obj.minute || 0,
          seco: obj.seco || obj.second || 0,
          mill: obj.mill || obj.millisecond || 0,
          minute: obj.minu || obj.minute || 0,
          second: obj.seco || obj.second || 0,
          millisecond: obj.mill || obj.millisecond || 0
        };
      },
      cann: function (obj) {
        return {
          hour: obj.hour || 0,
          minu: obj.minu || obj.minute || 0,
          cent: obj.cent || obj.centiminute || 0,
          mill: obj.mill || obj.milliminute || 0,
          minute: obj.minu || obj.minute || 0,
          centiminute: obj.cent || obj.centiminute || 0,
          milliminute: obj.mill || obj.milliminute || 0
        };
      }
    },
    convert: {
      stanToCann: function (stan, dec) { // dec is optional. if not given, get from stan
        if(typeof dec === 'number') {
          var decimal = dec;
        } else {
          var mill = (stan.hour * MS_HOU) + (stan.minu * MS_MIN) + (stan.seco * MS_SEC) + stan.mill; // total milliseconds
          var decimal = mill / MS_DAY;
        }

        var cann = {};
        cann.hour = Math.floor(decimal * 100);
        cann.minu = (cann.hour === 0) ? Math.floor((decimal * 100 * 10)) : Math.floor((decimal * 100 * 10) % cann.hour);
        cann.cent = (cann.hour + cann.minu === 0) ? Math.floor((decimal * 100 * 10 * 100)) : Math.floor((decimal * 100 * 10 * 100) % ((cann.hour * 10) + cann.minu));
        cann.mill = Math.floor((decimal * 100 * 10 * 100 * 10 * 100) % 1000);

        return helper.fill.cann(cann);
      },
      cannToStan: function (cann) {
        var decimal = (cann.hour / 100) + (cann.minu / 1000) + (cann.cent / 100000) + (cann.mill / 100000000);
        var mill = Math.round(decimal * MS_DAY);

        var r = mill;

        var stan = {};
        stan.hour = Math.floor(r / MS_HOU); r = (r % MS_HOU);
        stan.minu = Math.floor(r / MS_MIN); r = (r % MS_MIN);
        stan.seco = Math.floor(r / MS_SEC); r = (r % MS_SEC);
        stan.mill = Math.floor(r);

        return helper.fill.stan(stan);
      }
    },
    calculateTimezones: function (stz, ctz) {
      var output = { stan: 0, cann: 0 };

      if(typeof stz === 'number') {
        output.stan = stz;
        output.cann = Math.floor((stz * 15) / 18);
        if(output.cann === -10) output.cann = 10;
      } else if(typeof ctz === 'number') {
        output.cann = ctz;
        output.stan = Math.floor((ctz * 18) / 15);
      } else {
        output.stan = Math.floor((new Date()).getTimezoneOffset() / 60) * -1;
        output.cann = Math.floor((output.stan * 15) / 18);
        if(output.cann === -10) output.cann = 10;
      }

      return output;
    },
    takeTimezone: {
      cann: function (cann, tz) {
        var newCann = {
          hour: ((cann.hour + 100) - Math.floor(tz * 5)) % 100,
          minu: cann.minu,
          cent: cann.cent,
          mill: cann.mill
        };
        return helper.fill.cann(newCann);
      },
      stan: function (stan, tz) {
        var newStan = {
          hour: ((stan.hour + 24) - Math.floor(tz)) % 24,
          minu: stan.minu,
          seco: stan.seco,
          mill: stan.mill
        };
        return helper.fill.stan(newStan);
      }
    },
    applyTimezone: {
      cann: function (cann, tz) {
        var newCann = {
          hour: ((cann.hour + 100) + Math.floor(tz * 5)) % 100,
          minu: cann.minu,
          cent: cann.cent,
          mill: cann.mill
        };
        return helper.fill.cann(newCann);
      },
      stan: function (stan, tz) {
        var newStan = {
          hour: ((stan.hour + 24) + Math.floor(tz)) % 24,
          minu: stan.minu,
          seco: stan.seco,
          mill: stan.mill
        };
        return helper.fill.stan(newStan);
      }
    },
    tryAutoLongitude: function (obj) {
      if(!(navigator && navigator.geolocation)) return;
      navigator.geolocation.getCurrentPosition(function (location) {
        obj.setLongitude(location.coords.longitude);
      });
    },
    toDigits : function(num, dig) {
      var str = null, y = 1, z = '';
      for(var i = 1; i < dig; i++) {y=y*10; z=z+'0';}
      return (num >= 0 && num < y) ? z.substr(0,(dig - num.toString().length)) + num : num;
    }
  };


  // Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cannonian;
  }
  // Browser
  else {
    return Cannonian;
  }

})();