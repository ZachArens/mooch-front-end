const rentalTimeAsString = (inputTime) => {

    const numMSInHour = 60 * 60 * 1000;
    const totalHours = inputTime/numMSInHour;

    let days = Math.floor(totalHours/24) > 0 ? Math.floor(totalHours/24) : 0;

    let hours = Math.ceil((inputTime - (days*24*numMSInHour))/numMSInHour);

    let returnString = "";

    if (days > 0 && hours > 0) {
        returnString = `${days} days, ${hours} hrs`;
    } else if (days > 0 && hours <= 0) {
        returnString = `${days} days`
    } else if (days <= 0 && hours > 0) {
        returnString = `${hours} hrs`;
    } else {
        throw new Error('valid time not submitted');
    }
    return returnString;
}

const msTimeDifference = (startDate, endDate) => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    return eDate.getTime() - sDate.getTime();
}



export {rentalTimeAsString, msTimeDifference};