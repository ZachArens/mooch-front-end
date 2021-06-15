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

const formatCurrency = (input) => {
    //check only digits and decimal
    if(input.match(/^[0-9.]+$/)) {
        //check if ok format and return
        if (input.match(/^[1-9.]+[0-9]+[.]{1}[0-9]{1,2}$/)) {
            // console.log('match ok');
            return input;
        } 
        //if not check if starts with zeroes and remove
        while (input.startsWith('0')) {
            // console.log('match startsWith 0');
            input = input.slice(1, input.length);
        }
        
        //check if ends with decimal and remove
        while (input.startsWith('.')) {
            // console.log('match startsWith .');
            input = input.replace('.', '0.');
        }
        //check if more that 2 digits behind decimal and shorten
        while (input.match(/^[0-9.]+[.]{1}[0-9]{3,}$/)) {
            input = input.substr(0, input.length-1);
        }

        return input;
    } else {
        throw 'must be a currency value';
    }

    
}

const finalFormatCurrency = (input) => {
    //check if ends with decimal and remove
    while (input.endsWith('.')) {
        // console.log('match endsWith .');
        input = input.substr(0, input.length-1);
    }
    input = formatCurrency(input);
    return parseFloat(input);

}

export {rentalTimeAsString, msTimeDifference, hoursTimeDifference, textAbbreviator, formatShortDate, formatCurrency, finalFormatCurrency};