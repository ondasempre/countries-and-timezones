var support = {

    /**
     * Return date of today with time of timezonePlanned.
     * @param {} timezonePlanned 
     */
   todayAndTimezonePlannedValue: function(timezonePlanned) {
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
    },

    /**
     * Return the difference between two date.
     * @param {*} date1 
     * @param {*} date2 
     */
    countryTimezoneDiff: function(date1,date2) {
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays;
    },

    addOffset:  function (data, utcOffset) {
        var startTime = new Date(data);
        startTime.setMinutes() + utcOffset;
        return startTime.toTimeString();
    }
};
  
module.exports = support;