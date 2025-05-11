export function convertTimeInMinutes(time: string) {
  let [hour, minutes] = time.split(':');
  let minutesOfHour = parseInt(hour) * 60;
  return minutesOfHour + parseInt(minutes);
}

export function formatHour(hour: string) {
  let minutes = parseInt(hour) * 60;
  let convetedHour = minutes / 60;
  let convertedMinutes = minutes % 60;
  return `${convetedHour}:${convertedMinutes}`;
}

export function getTimeFromDateTime(dateTime: string) {
  let time = dateTime.split('T')[1].substring(0, 5);
  return time;
}
