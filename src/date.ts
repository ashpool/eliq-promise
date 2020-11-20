const MS_PER_MINUTE = 60000;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
/**
 * Returns ISO8601 formatted date string rounded down to day
 * e.g 2012-11-04T00:00:00.000Z
 * @param date date or timestamp
 * @returns {string|*}
 */
export const toISODay = (date: Date) => {
  const isoDay = new Date(date);
  isoDay.setHours(0,0, 0,0);
  return isoDay.toISOString();
}

/**
 * Returns ISO8601 formatted date string rounded down to hour
 * e.g 2012-11-04T17:00:00.000Z
 * @param date date or timestamp
 * @returns {string|*}
 */
export const toISOHour = (date: Date) => {
  const isoHour = new Date(date);
  isoHour.setMinutes(0, 0, 0);
  return isoHour.toISOString();
};

export const hoursAgoFromNow = (age: number) => new Date(new Date().getTime() - age * MS_PER_HOUR);

