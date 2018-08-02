
var supportModule = require('./src/support.js');
var countriesAndTimezones = require('./src/index.js');
var momentTimezone = require('./moment-timezone/moment-timezone.js');
var moment = require('./node_modules/moment/moment.js');
moment.tz.load(require('./moment-timezone/data/packed/latest.json'));

/**
 * Time Sales from Italian country. */
var jsonSales = require('./src/sales.json');

// Get Current Date
var time = new Date(Date.now())
var localTimeMKT = jsonSales.Italy.split(':');
var currentDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(),localTimeMKT[0], localTimeMKT[1], localTimeMKT[2]);

// Print all Countries
var countries = countriesAndTimezones.getAllCountries();
var timezones = countriesAndTimezones.getAllTimezones();

// Get Timezones For Country
var itTimezone = countriesAndTimezones.getTimezonesForCountry('IT');
var timezonePlanned = countriesAndTimezones.getTimezonePlanned(jsonSales.Italy);

// Get Date from zones
var Los_Angeles = moment.tz(time, "America/Los_Angeles");
var Rome = moment.tz(time, "Europe/Amsterdam");
var London = moment.tz(time, "Europe/London");
var Hong_Kong = moment.tz(time, "Asia/Hong_Kong");

// Data Receive
var Rome_data_receive = moment.tz(currentDate, "Europe/Amsterdam");

console.log()
console.log('- - - - - - - - - - REAL COUNTRY TIMEZONE - - - - - - - - - - -')
console.log("Los_Angeles: " + Los_Angeles.format())
console.log("Rome: " + Rome.format())
console.log("London: " + London.format())
console.log("Hong_Kong: " + Hong_Kong.format())
console.log()
console.log('- - - - - - - - - - ADD +3 DAYS - - - - - - - - - - - - - - - -')
console.log("Los_Angeles: " + Los_Angeles.add(3, 'days').format())
console.log("Rome: " + Rome.add(3, 'days').format())
console.log("London: " + London.add(3, 'days').format())
console.log("Hong_Kong: " + Hong_Kong.add(3, 'days').format())
console.log()
console.log('- - - - - - - - - - DATA RECEIVED - - - - - - - - - - - - - - - -')
console.log("Rome_data_receive: " + new Date(Rome_data_receive) )

console.log('- - - - - - - - - - SEND MSG - - - - - - - - - - - - - - - -')

var now = moment.tz(Los_Angeles.format(), "America/Los_Angeles"); //todays date
console.log("DATA      +3: "+now.format())

var end = moment(now.format()).utcOffset(-7);
end.set({hour:9,minute:0})
end.toISOString()
end.format()
console.log("DATA+3(9:00): "+end.format())
console.log("DIFF: "+ moment.duration(now.diff(end)).asHours())

/**
 * Math.sign(3);     //  1
 * Math.sign(-3);    // -1
 * Math.sign('-3');  // -1
 * Math.sign(0);     //  0
 * Math.sign(-0);    // -0
 * Math.sign(NaN);   // NaN
 * Math.sign('foo'); // NaN
 * Math.sign();      // NaN
 */
if ( Math.sign( moment.duration( now.diff(end) ).asHours() ) == '-1') {
    console.log( "INVIA OGGI ALLE ORE (Europe/Rome)"+ moment.tz(end, "Europe/Rome").format()) 
    console.log( "                    (Local)      "+ end.format()) 
} else {
    console.log( "INVIA DOMANI" ) 
}

console.log('') 
