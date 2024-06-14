export function convertToSeconds(time) {
  const timeArray = time.split(":");
  const minutes = parseInt(timeArray[0], 10);
  const seconds = parseInt(timeArray[1], 10);
  return minutes * 60 + seconds;
}

export function convertToTimeString(seconds) {
  const stringMinutes = Math.floor(seconds / 60);
  const stringSeconds = seconds % 60;

  const timeString =
    stringMinutes.toString().padStart(2, "0") +
    ":" +
    stringSeconds.toString().padStart(2, "0");
  return timeString;
}