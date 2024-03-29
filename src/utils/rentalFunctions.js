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
    } else if ( days === 0 && hours ===0 ) {
        return '0 hours'
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
        throw new Error('must be a currency value');
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

const displayTime = (incomingDate) => {
    let hours = incomingDate.getHours();
    hours = hours.toString().length < 2 ? `0${hours.toString()}` : hours ;
    let minutes = incomingDate.getMinutes();
    minutes = minutes.toString().length < 2 ? `0${minutes.toString()}` : minutes ;
    return `${hours}:${minutes}`;
}

const updateCalculations = (startDateTime, endDateTime, unitCost, exchangeCost) => {
    // console.log('running update Calculations - start: ', 
    //     startDateTime, 'end: ', endDateTime, 'costHourly: ', unitCost, 'exchangeCost: ', exchangeCost);
    
    let totalTime = startDateTime && endDateTime ? hoursTimeDifference(startDateTime, endDateTime) : 0;
    let rentalCost = unitCost ? totalTime * unitCost: 0;

    // console.log('totalTime: ', totalTime, 'rentalCost: ', rentalCost);

    let totalCost;

    if (exchangeCost) {
        totalCost = rentalCost + Number(exchangeCost);
    } else {
        totalCost = rentalCost;
    }

    // console.log('totalCost: ', totalCost)

    return {totalTime, totalCost, rentalCost}
}

const getNewTime = (incomingTime, originalDate) => {
    //set startDateTime or create if null
    let newDate;
    if (originalDate) {
        newDate = new Date(originalDate);
    } else {
        newDate = new Date();
    }
    
    newDate.setHours(incomingTime.substr(0,2));
    newDate.setMinutes(incomingTime.substr(3,2));

    return newDate;
}

const getNewDate = (inputDate, originalDate) => {
    const incomingDate = new Date(inputDate);

    let newDate;
    if (originalDate) {
        newDate = new Date(originalDate);
    } else {
        newDate = new Date();
    }

    newDate.setUTCFullYear(incomingDate.getUTCFullYear(), 
            incomingDate.getUTCMonth(), 
            incomingDate.getUTCDate());

    return newDate;

}

const isDate = (inputObject) => {
    if (Object.prototype.toString.call(inputObject) === '[object Date]') {
        return true;
    } else {
        return false;
    }
}

export {rentalTimeAsString, msTimeDifference, hoursTimeDifference, 
    textAbbreviator, formatShortDate, formatCurrency, finalFormatCurrency,
    displayTime, updateCalculations, getNewTime, getNewDate, isDate
};
