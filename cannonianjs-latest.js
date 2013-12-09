/**
 * Cannonian.js
 * Made by Jack Cannon - c.annon.co.uk
 * v1.0.0
 */


var Cannonian = (function () {
  /**
   * 'CONSTANTS'
   */
  var MS_DAY = ((1000 * 60) * 60) * 24; // milliseconds in a day
  var MS_HOU = (1000 * 60) * 60; // milliseconds in an hour
  var MS_MIN = 1000 * 60; // milliseconds in a day
  var MS_SEC = 1000; // milliseconds in a day


  /**
   * CONSTUCTOR
   */

  function Cannonian(p) {
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
     *   micr: 999,
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
        this.cann = helper.getCann.fromCannonian(p);
        this.stan = helper.convert.cannToStan(this.cann);

      } else if(helper.is.date(p)) { // is Date object
        this.stan = helper.getStan.fromDate(p);
        this.cann = helper.convert.stanToCann(this.stan);

      } else if(helper.is.datestring(p)) { // is Date string
        this.stan = helper.getStan.fromDatestring(p);
        this.cann = helper.convert.stanToCann(this.stan);

      } else { // use now
        this.stan = helper.getStan.fromDate(new Date());
        this.cann = helper.convert.stanToCann(this.stan);
      }

      Object.freeze(this.stan);
      Object.freeze(this.cann);
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
      date: function (p) {
        return p instanceof Date && p.toString() !== 'Invalid Date';
      },
      datestring: function (p) {
        var d = new Date(p);
        return this.date(d);
      },
      decimal: function (p) {
        return typeof p === 'number' && p <= 100 && p >= 0;
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
      }
    },
    getCann: {
      fromCannonian: function (p) {
        return helper.fill.cann(p.cann);
      },
      fromDec: function (p) {
        return; // TODO
      }
    },
    fill: { // will fill out missing properties
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
      stanToCann: function (stan) {
        var mill = (stan.hour * MS_HOU) + (stan.minu * MS_MIN) + (stan.seco * MS_SEC) + stan.mill; // total milliseconds
        var decimal = mill / MS_DAY;

        var cann = {};
        cann.hour = Math.floor(decimal * 100);
        cann.minu = Math.floor((decimal * 100 * 10) % cann.hour);
        cann.cent = Math.floor((decimal * 100 * 10 * 100) % ((cann.hour * 10) + cann.minu));
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
    }
  };


  // Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cannonian;
  }
  // Browser
  else {
    window.helper = helper;
    return Cannonian;
  }

})();