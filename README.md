Cannonian.js
===========
##Install
###In Browser
	<script type="text/javascript" src="http://cannonti.me/cannonianjs.js"></script>

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
* Standard time strings - '12:45:30'
* Cannonian time strings - '53.125'

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