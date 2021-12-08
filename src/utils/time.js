export const minutesToMillis = (minutes) => minutes * 1000 * 60;

export const formatTime = (units) => (units < 10 ? `0${units}` : units);
