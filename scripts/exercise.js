import { currentExercise } from "../data/exercises.js";

console.log(currentExercise)

function convertToTimeString(seconds) {
  const stringMinutes = Math.floor(seconds / 60);
  const stringSeconds = seconds % 60;

  const timeString =
    stringMinutes.toString().padStart(2, "0") +
    ":" +
    stringSeconds.toString().padStart(2, "0");
  return timeString;
}

document.querySelector(".js-phase-duration").innerHTML = convertToTimeString(
  currentExercise[0].durationInSeconds
);

function countDown({ id, durationInSeconds }) {
  document.querySelector(".js-phase-name").innerHTML = id;
  let i = durationInSeconds;
  const identifier = setInterval(() => {
    document.querySelector(".js-phase-duration").innerHTML =
      convertToTimeString(i);
    i--;
    if (i < 0) {
      clearInterval(identifier);
    }
  }, 1000);
}

countDown(currentExercise[1]);
