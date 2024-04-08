import moment from 'moment';

export const getTimeOfDay = () => {
    const currentTime = moment(); // Get the current time
    const currentHour = currentTime.hour();

    let timeOfDay;

    if (currentHour < 12) {
        timeOfDay = 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        timeOfDay = 'afternoon';
    } else {
        timeOfDay = 'evening';
    }
    return timeOfDay;
}