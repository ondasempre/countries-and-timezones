
var supportModule = require('./src/support.js');
var countriesAndTimezones = require('./src/index.js');
var momentTimezone = require('./moment-timezone/moment-timezone.js');
var moment = require('./node_modules/moment/moment.js');
moment.tz.load(require('./moment-timezone/data/packed/latest.json'));

/**
 * Mapping countryMapLang to Local Timezone
 */
var countryToTimeZoneCode = [{
        "name": "US/Pacific",
        "countries": ["US","CA"]
    },
    {
        "name": "Europe/Amsterdam",
        "countries": ["IT"]
    },
    {
        "name": "Europe/London",
        "countries": ["UK"]
    },
    {
        "name": "Asia/Hong_Kong",
        "countries": ["HK","RWHK"]
    },
    {
        "name": "Europe/Madrid",
        "countries": ["ES"]
    },
    {
        "name": "Europe/Berlin",
        "countries": ["DE"]
    },    
    {
        "name": "Europe/Paris",
        "countries": ["FR"]
    },    
    {
        "name": "Asia/Tokyo",
        "countries": ["JP"]
    },    
    {
        "name": "Asia/Seoul",
        "countries": ["KR"]
    },    
    {
        "name": "Europe/Moscow",
        "countries": ["RU"]
    },    
    {
        "name": "Asia/Shanghai",
        "countries": ["CN"]
    },    
    {
        "name": "Australia",
        "countries": ["AU"]
    },    
    {
        "name": "Asia/Taipei",
        "countries": ["TW"]
    }
];

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

// In order to reduce duplication, the Moment Timezone data packer will create links out of two zones that share data that is exactly the same.
moment.tz.link('America/Los_Angeles|US/Pacific');

// Get Date from zones
var Los_Angeles = moment.tz(time, "US/Pacific");
var Rome = moment.tz(time, "Europe/Amsterdam");
var London = moment.tz(time, "Europe/London");
var Hong_Kong = moment.tz(time, "Asia/Hong_Kong");
var Europe_Madrid = moment.tz(time, "Europe/Madrid");
var Europe_Berlin = moment.tz(time, "Europe/Berlin");
var Europe_Paris = moment.tz(time, "Europe/Paris");
var Asia_Tokyo = moment.tz(time, "Asia/Tokyo");
var Asia_Seoul = moment.tz(time, "Asia/Seoul");
var Europe_Moscow = moment.tz(time, "Europe/Moscow");
var Asia_Shanghai = moment.tz(time, "Asia/Shanghai");

// Data Receive
var Rome_data_receive = moment.tz(currentDate, "Europe/Amsterdam");

console.log()
console.log('- - - - - - - - - - REAL COUNTRY TIMEZONE - - - - - - - - - - -')
console.log("US/Pacific (US): " + Los_Angeles.format())
console.log("Rome (IT): " + Rome.format())
console.log("London (UK): " + London.format())
console.log("Hong_Kong (HK): " + Hong_Kong.format())
console.log("Europe_Madrid (ES): " + Europe_Madrid.format())
console.log("Europe_Berlin (DE): " + Europe_Berlin.format())
console.log("Europe_Paris (FR): " + Europe_Paris.format())
console.log("Asia_Tokyo (JP): " + Asia_Tokyo.format())
console.log("Asia_Seoul (KR): " + Asia_Seoul.format())
console.log("Europe_Moscow (RU): " + Europe_Moscow.format())
console.log("Asia_Shanghai (CN): " + Asia_Shanghai.format())
console.log()
console.log('- - - - - - - - - - ADD +3 DAYS - - - - - - - - - - - - - - - -')
console.log("US/Pacific: " + Los_Angeles.add(3, 'days').format())
console.log("Rome: " + Rome.add(3, 'days').format())
console.log("London: " + London.add(3, 'days').format())
console.log("Hong_Kong: " + Hong_Kong.add(3, 'days').format())
console.log()
console.log('- - - - - - - - - - DATA RECEIVED - - - - - - - - - - - - - - - -')
console.log("Rome_data_receive: " + new Date(Rome_data_receive) )

console.log('- - - - - - - - - - SEND MSG - - - - - - - - - - - - - - - -')

var now = moment.tz(Los_Angeles.format(), "US/Pacific"); //todays date
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
