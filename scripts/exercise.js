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
    const colorClasses = {
      Prepare: "prepare",
      Work: "work",
      Rest: "rest",
      CoolDown: "cool-down",
    };

    const colorClass = colorClasses[id] || "";
    const card = document.querySelector(".js-card")
    card.className = 'card js-card'    
    card.classList.add(colorClass);  
    const phaseName = document.querySelector(".js-phase-name");
    phaseName.innerHTML = id;
    const phaseDuration = document.querySelector(".js-phase-duration");
    phaseDuration.innerHTML = convertToTimeString(durationInSeconds);
    const identifier = setInterval(() => {
      durationInSeconds--;
      if (durationInSeconds < 0) {
        clearInterval(identifier);
        res();
      } else {
        phaseDuration.innerHTML = convertToTimeString(durationInSeconds);
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

/////////////////////////

//const countDownArray = createPhasesArray(currentExercise).map(phase => countDown(phase));

//countDownArray.reduce((chain, phase) => chain.then(() => phase), Promise.resolve())
// .then(() => alert("koniec"));
