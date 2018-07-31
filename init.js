var countriesAndTimezones = require('./src/index.js');

var json = {
    "Italy" : "07:00:00",
    "France" : "03:00:00",
    "UK" : "03:40:00"
}

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

var currentDate = new Date("2018-07-31T16:32:00.000Z");

console.log(currentDate)
console.log(todayAndTimezonePlannedValue(timezonePlanned))
console.log(countriesAndTimezones.getTimezonesForCountry('IT')[0].utcOffset)
console.log( addOffset(todayAndTimezonePlannedValue(timezonePlanned), 1)  )

