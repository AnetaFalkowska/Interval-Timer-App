export function isValidDuration(value) {
  const timeArray = value.split(":");
  if (timeArray.length !== 2) return false;

  const [minutes, seconds] = timeArray;
  if (minutes.length !== 2 || seconds.length !== 2) return false;

  const minutesNumber = parseInt(minutes, 10);
  const secondsNumber = parseInt(seconds, 10);

  if (isNaN(minutesNumber) || isNaN(secondsNumber)) return false;

  return (
    minutesNumber >= 0 &&
    minutesNumber < 60 &&
    secondsNumber >= 0 &&
    secondsNumber < 60
  );
}

export function isValidSets(value) {
  const parsedValue = parseInt(value, 10);
  return !isNaN(parsedValue) && parsedValue.toString() === value.toString();
}
