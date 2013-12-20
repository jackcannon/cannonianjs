Cannonian.js
===========
##Install
###In Browser
	<script type="text/javascript" src="http://cannonianti.me/cannonian.js"></script>

###In Node.js
Install using:

	npm install cannonian

Include using:

	var Cannonian = require('cannonian');

##Usage
###Constructor

	var cannonian = new Cannonian();

The constructor has 3 parameters:

* p - Something to base the time off of. Default: time of execution
* stz - Standard timezone. Default: calculated from Date objects
* ctz - Cannonian timezone. Default: calculated from Standard timezone

####Recognised p formats

* Cannonian Object - e.g. new Cannonian()
* Date objects - e.g. new Date()
* Date strings - e.g. 'Tues Jan 1 2013 06:45:00 GMT+0000 (GMT)'
* Decimals - e.g. 0.5
* Standard time strings - e.g. '12:45:30'
* Cannonian time strings - e.g. '53.125'
* Cannonian time primitive objects - e.g. { hour: 50, minute: 3, centiminute: 50 }
* Standard time primitive objects - e.g. { hour: 12, minute: 30, second: 30 }

###Public Functions
####toStan

	var cannonian = new Cannonian('12:00');
	cannonian.toStan(3); // '12:00:00'
Returns the standard time in 24-hour string.

####toCann

	var cannonian = new Cannonian('12:00');
	cannonian.toCann(3); // '50.000'
Returns the cannononian time in decimal-style string.

####ToDec

	var cannonian = new Cannonian('12.345');
	cannonian.toDec(5); // 0.12345
Returns a decimal value equivalent to cannonian time.

####ToCannObject

	var cannonian = new Cannonian('12.345');
	cannonian.toCannObject(); // { hour: 12, minu: 3, cent: 45, mill: 0, minute: 3, centiminute: 45, milliminute: 0 }
Returns a primitive object representation of Cannonian time.

####ToStanObject

	var cannonian = new Cannonian('12:30:45');
	cannonian.toCannObject(); // { hour: 12, minu: 30, seco: 45, mill: 0, minute: 30, second: 45, millisecond: 0 }
Returns a primitive object representation of Cannonian time.