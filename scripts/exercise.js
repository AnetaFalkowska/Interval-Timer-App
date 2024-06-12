import { currentExercise } from "../data/exercises.js";

const remainingTimeFlag = document.querySelector('.js-remaining-time')
const card = document.querySelector(".js-card");
const phaseName = document.querySelector(".js-phase-name");
const phaseDuration = document.querySelector(".js-phase-duration");
let stopCountdown = false;
let currentPhaseIndex = 0;
let remainingIntervalTime = null;
let remainingTotalTime;

function convertToTimeString(seconds) {
  const stringMinutes = Math.floor(seconds / 60);
  const stringSeconds = seconds % 60;

  const timeString =
    stringMinutes.toString().padStart(2, "0") +
    ":" +
    stringSeconds.toString().padStart(2, "0");
  return timeString;
}

// document.querySelector(".js-phase-duration").innerHTML = convertToTimeString(
//   currentExercise[0].durationInSeconds
// );

function countDown({ id, durationInSeconds }) {
  return new Promise((res, rej) => {
    if (stopCountdown) {
      rej("Countdown stopped");
      return;
    }
    
    remainingTimeFlag.innerHTML = convertToTimeString(remainingTotalTime)   

    const colorClasses = {
      Prepare: "prepare",
      Work: "work",
      Rest: "rest",
      CoolDown: "cool-down",
    };

    const colorClass = colorClasses[id] || "";
    
    card.className = "card js-card";
    card.classList.add(colorClass);
    
    phaseName.innerHTML = id;
    
    phaseDuration.innerHTML = convertToTimeString(durationInSeconds);
    ;
    const intervalIdentifier = setInterval(() => {
      if (stopCountdown) {
        clearInterval(intervalIdentifier);
        remainingIntervalTime = durationInSeconds;
        rej("Countdown stopped");
        return;
      }
      durationInSeconds--;
      remainingTotalTime--;
      console.log(remainingTotalTime)
      if (durationInSeconds < 0) {
        clearInterval(intervalIdentifier);
        res();
      } else {
        phaseDuration.innerHTML = convertToTimeString(durationInSeconds);
        remainingTimeFlag.innerHTML = convertToTimeString(remainingTotalTime);
      }
    }, 1000);
  });
}

function createCountDownArray(exercise) {
  const array = [];
  const countDownDurations = exercise.map(el => {return el.durationInSeconds ? {...el, durationInSeconds: el.durationInSeconds-1} : {...el}})
  const numberOfSets = exercise[4].sets;
  for (let i = 0; i < numberOfSets; i++) {
    array.push(countDownDurations[1], countDownDurations[2]);
  }
  return [countDownDurations[0], ...array, countDownDurations[3]];
}

const phasesArray = createCountDownArray(currentExercise);

const TotalExerciseTime = phasesArray.reduce((accumulator, phase) => {return accumulator + phase.durationInSeconds + 1},-1)
console.log(remainingTotalTime)
remainingTotalTime = TotalExerciseTime;

function createPhasesArray(exercise) {
  const array = [];
  const numberOfSets = exercise[4].sets;
  for (let i = 0; i < numberOfSets; i++) {
    array.push(exercise[1], exercise[2]);
  }
  return [exercise[0], ...array, exercise[3]];
}

function startCountdown(startIndex = 0) {
  const countDownArray = phasesArray.slice(startIndex).map((el, index) => {
    const newFunction = () => {
      currentPhaseIndex = startIndex + index;
      return countDown({
        id: el.id,
        durationInSeconds:
          remainingIntervalTime !== null && index === 0
            ? remainingIntervalTime
            : el.durationInSeconds,
      });
    };
    return newFunction;
  });

  countDownArray
    .reduce((chain, countDownFn) => chain.then(countDownFn), Promise.resolve())
    .then(() => alert("koniec"))
    .catch((error) => console.log(error));
}

startCountdown();

document
  .querySelector(".js-stop-countdown")
  .addEventListener("click", function () {
    if (stopCountdown) {
      stopCountdown = false;
      this.innerHTML = "Stop";
      startCountdown(currentPhaseIndex);
    } else {
      stopCountdown = true;
      this.innerHTML = "Continue";
    }
  });

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
