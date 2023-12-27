import { currentExercise } from "../data/exercises.js";

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
  return new Promise((res) => {
    document.querySelector(".js-phase-name").innerHTML = id;
    let i = durationInSeconds;
    document.querySelector(".js-phase-duration").innerHTML =
      convertToTimeString(i);
    const identifier = setInterval(() => {
      i--;
      if (i < 0) {
        clearInterval(identifier);
        res();
      } else {
        document.querySelector(".js-phase-duration").innerHTML =
          convertToTimeString(i);
      }
    }, 1000);
  });
}

function createPhasesArray(exercise) {
  const array = [];
  const numberOfSets = exercise[4].sets;
  for (let i = 0; i < numberOfSets; i++) {
    array.push(exercise[1], exercise[2]);
  }
  return [exercise[0], ...array, exercise[3]];
}

const phasesArray = createPhasesArray(currentExercise);
console.log(phasesArray);


const countDownArray = phasesArray.map((el) => {
  const newFunction = () => {
    return countDown({ id: el.id, durationInSeconds: el.durationInSeconds });
  };
  return newFunction;
});

console.log(countDownArray);

countDownArray
  .reduce((chain, countDownFn) => chain.then(countDownFn), Promise.resolve())
  .then(() => alert("koniec"));


// const prepareCountDown = () => {
//   return countDown(currentExercise[0]);
// };
// const workCountDown = () => {
//   return countDown(currentExercise[1]);
// };
// const restCountDown = () => {
//   return countDown(currentExercise[2]);
// };
// const cooldownCountDown = () => {
//   return countDown(currentExercise[3]);
// };

// prepareCountDown()
//   .then(workCountDown)
//   .then(restCountDown)
//   .then(cooldownCountDown)
//   .then(() => alert("koniec"));
