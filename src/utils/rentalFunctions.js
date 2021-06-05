const rentalTimeAsString = (totalHours) => {

    if (isNaN(totalHours) || totalHours < 0) {
        return "";
    }

    let days = Math.floor(totalHours/24) > 0 ? Math.floor(totalHours/24) : 0;

    let hours = totalHours - (days * 24);

    let hourString = "";
    let dayString = "";

    switch (days) {
        case 0: 
            dayString = "";
            break;
        case 1:
            dayString = "1 day";
            break;
        default:
            dayString = `${days} days`;
    }

    switch (hours) {
        case 0: 
            hourString = "";
            break;
        case 1:
            hourString = "1 hour";
            break;
        default:
            hourString = `${hours} hours`;
    }
    if (days > 0 && hours > 0) {
        return `${dayString}, ${hourString}`;
    } else {
        return `${dayString}${hourString}`;
    }
}

const msTimeDifference = (startDate, endDate) => {

    return endDate.getTime() - startDate.getTime();
}

const hoursTimeDifference = (startDate, endDate) => {
    const msTime = msTimeDifference(startDate, endDate);
    const numMSInHour = 60 * 60 * 1000;

    return Math.ceil(msTime/numMSInHour);
}

const textAbbreviator = (text) => {
    try {
        return text.length > 32 ? `${text.substr(0, 29)}...` : text ;
    } catch(error) {
        console.error = 'cannot abbreviate a non text description';
    }
    
};

const formatShortDate = (date) => {

    //https://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
    var language = window.navigator.userLanguage || window.navigator.language;
    return date.toLocaleDateString(language);
}

export {rentalTimeAsString, msTimeDifference, hoursTimeDifference, textAbbreviator, formatShortDate};