
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

var time = new Date(Date.now())
var localTimeMKT = json.Italy.split(':');
var localTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours()+8, 0, 0); // Data locale
var currentDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(),localTimeMKT[0], localTimeMKT[1], localTimeMKT[2]); // Data di acquisto 

//console.log( "Current Date: " + currentDate )

// Print all Countries
var countries = countriesAndTimezones.getAllCountries();
var timezones = countriesAndTimezones.getAllTimezones();

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

var country = 'HK' // Residenza
var countryTimezone = countriesAndTimezones.getTimezonesForCountry(country);
/*
console.log("Local Time: " + new Date(localTime));
console.log("Current Date: " + currentDate);

var currentDate = currentDate.setHours( currentDate.getHours() + countryTimezone[0].utcOffset/60 )

console.log("Gap: " + (new Date(currentDate).getTime() - new Date(localTime).getTime()) )

*/
//moment.tz.add('America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0');
//moment.tz.add("Europe/Amsterdam|AMT NST +0120 +0020 CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5")

var Los_Angeles = moment.tz(time, "America/Los_Angeles");
var Rome = moment.tz(time, "Europe/Amsterdam");
var London = moment.tz(time, "Europe/London");
var Hong_Kong = moment.tz(time, "Asia/Hong_Kong");

var Rome_data_receive = moment.tz(currentDate, "Europe/Amsterdam");

console.log("Los_Angeles: " + Los_Angeles.format())
console.log("Rome: " + Rome.format())
console.log("London: " + London.format())
console.log("Hong_Kong: " + Hong_Kong.format())

console.log('- - - - - - - - - - - - - - - - - - - - -')

console.log("Rome_data_receive: " + new Date(Rome_data_receive) )

console.log("Send Mail IT->Los_Angeles: " )
