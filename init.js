
var countriesAndTimezones = require('./src/index.js');
var momentTimezone = require('./moment-timezone/moment-timezone.js');
var moment = require('./node_modules/moment/moment.js');
moment.tz.load(require('./moment-timezone/data/packed/latest.json'));

/**
 * Time Sales from Italian country.
 */
var json = {
    "Italy": "07:00:00",
    "France": "03:00:00",
    "UK": "03:40:00",
    "USA": "14:00:00",
    "Mexico": "10:30:00",
    "Canada": "16:00:00",
    "Hong Kong": "21:00:00",
    "Taiwan": "21:30:00",
    "Macau": "21:15:00",
    "Malaysia": "19:45:00",
    "Singapore": "21:45:00",
    "Korea": "20:15:00",
    "Thailand": "20:30:00",
    "Australia": "19:30:00",
    "China": "21:45:00",
    "UAE": "03:15:00",
    "KSA": "04:00:00",
    "Kuwait": "03:15:00",
    "India": "02:55:00",
    "Turkey": "02:30:00",
    "Bahrain": "03:15:00",
    "Switzerland": "02:00:00",
    "Qatar": "02:45:00",
    "Germany": "02:45:00",
    "Czec Rep.": "02:30:00",
    "Brasile": "10:30:00",
    "Russia": "01:30:00",
    "Austria": "01:30:00",
    "Danimarca": "02:15:00",
    "Netherland": "01:30:26",
    "Japan": "21:15:00"
}

// Get Current Date
var time = new Date(Date.now())
var localTimeMKT = json.Italy.split(':');
var currentDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(),localTimeMKT[0], localTimeMKT[1], localTimeMKT[2]);

// Print all Countries
var countries = countriesAndTimezones.getAllCountries();
var timezones = countriesAndTimezones.getAllTimezones();

// Get Timezones For Country
var itTimezone = countriesAndTimezones.getTimezonesForCountry('IT');
var timezonePlanned = countriesAndTimezones.getTimezonePlanned(json.Italy);

/**
 * Return date of today with time of timezonePlanned.
 * @param {} timezonePlanned 
 */
function todayAndTimezonePlannedValue(timezonePlanned) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = yyyy + '-'+ mm + '-' + dd;
    var datetime = new Date( today+'T' + timezonePlanned + 'Z' );
    return datetime;
}

/**
 * Return the difference between two date.
 * @param {*} date1 
 * @param {*} date2 
 */
function countryTimezoneDiff(date1,date2) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays;
}

function addOffset(data, utcOffset) {
    var startTime = new Date(data);
    startTime.setMinutes() + utcOffset;
    return startTime.toTimeString();
}

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

var m = moment(now.format()).utcOffset(-7);
m.set({hour:9,minute:0})
m.toISOString()
m.format()
console.log("DATA+3(9:00): "+m.format())
console.log("DIFF: "+ moment.duration(now.diff(m)).asHours())

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
if ( Math.sign( moment.duration( now.diff(m) ).asHours() ) == '-1') {
    console.log( "INVIA OGGI ALLE ORE (Europe/Rome)"+ moment.tz(m, "Europe/Rome").format()) 
    console.log( "                    (Local)      "+ m.format()) 
} else {
    console.log( "INVIA DOMANI" ) 
}

console.log(  ) 
