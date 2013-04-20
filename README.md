Cannonianjs API
===========

##Install

###In Browser
	<script type="text/javascript" src="https://raw.github.com/jackcannon/cannonianjs/master/cannonianjs-latest.js"></script>

###In Node.js
Install using:

	npm install cannonian

Include using:

	var cannonianjs = require('cannonian');

##Usage

###Types
There are several types that cannonianjs deals with:

* 'date' - date objects (e.g. new Date())
* 'datestring' - e.g. "Sat Jan 01 2000 00:00:00 GMT+0000 (GMT Standard Time)"
* 'standardstring' - e.g. '23:59:59:999'
* 'standardstringshort' - e.g. '23:59'
* 'cannonianstring' - e.g. '99:09:99:99:999' (this is a string output of cannonian time)
* 'cannonianobj' - e.g. new cannonianjs() (object that holds .stand and .canno times)
* 'dec' - e.g. 0.75 (cannonian time in decimal format)

###Functions
####.conv(p, fromType, toType) - converts between types
  - p - optional. parameter to convert. if not given, will use the cannonian object that the function is being called from.
  - fromType - optional. type of object currently. if not given, type will be calculated.
  - toType - optional. type you wish to convert to. if not given, will return cannonianjs object.

####.getType(p) - returns the type of the given parameter.
  - p - optional. parameter. if not given, will use the cannonian object that the function is being called from.

####.parse(type, p) - translates object into cannonianjs object style format
  - type - required. type of the parameter given
  - p - parameter to convert