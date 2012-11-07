/**
 * GLOBAL VARIABLES
 */
var other;
var MILLISECONDSINADAY = ((1000 * 60) * 60) * 24;


/**
 * FUNCTIONS
 */

/*
cannonianjs.prototype = {

  calcTime : function(pDate) {
    var calcedTime = [];

    now = pDate.getTime();
    
    midnight = new Date();
    midnight.setUTCHours(0);
    midnight.setUTCMinutes(0);
    midnight.setUTCSeconds(0);
    midnight.setUTCMilliseconds(0);
    midnight = midnight.getTime();
    
    msToday = now - midnight;
    
    pod = (msToday / MILLISECONDSINADAY) * 100; //percent of day
    other = pod;
    
    calcedTime['hours'] = Math.floor(other);
    other = (other - calcedTime['hours']) * 10;
            
    calcedTime['mins'] = Math.floor(other);
    other = (other - calcedTime['mins']) * 100;
    
    calcedTime['centi-mins'] = Math.floor(other);
    other = (other - calcedTime['centi-mins']) * 10;
    
    calcedTime['milli-mins'] = Math.floor(other);
    other = (other - calcedTime['milli-mins']) * 1000;
    
    calcedTime['micro-mins'] = Math.floor(other);
    
    return calcedTime;
  },

  twoDigits : function(num) {
    var str = null;
    if (num >= 0 && num < 10) {
      str = '0' + num;
    } else if (num < 0 && num > -10) {
      str = '-0' + (num * -1);
    } else {
      str = num;
    }
    return str;
  }
}*/






/*=====================================================
*
* _JL : A Really Small JavaScript framework
* (c) Michael Jasper 2011
*
======================================================*/

/*  _ Object Constructor
========================*/

function cannonianjs() {

  if (window === this) {
    return new cannonianjs();
  }

}

/*  _ Prototype Functions
============================*/

cannonianjs.prototype = {
  hide: function () {
        return 'jack';
      },

  show: function () {
        this.e.style.display = 'inherit';
        return this;
      },

  bgcolor: function (color) {
        this.e.style.background = color;
        return this;
      },

  val:  function (newval) {
        this.e.value = newval;
        return this;
      },

  toggle: function () {
        if (this.e.style.display !== 'none') {
          this.e.style.display = 'none';
        } else {
          this.e.style.display = '';
        }
        return this;
      },

  size: function (height, width) {
        this.e.style.height = height + 'px';
        this.e.style.width = width + 'px';
        return this;
      }
};