export function convertToSeconds(time) {
  const timeArray = time.split(":");
  const minutes = parseInt(timeArray[0], 10);
  const seconds = parseInt(timeArray[1], 10);
  return minutes * 60 + seconds;
}