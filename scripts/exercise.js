lucide.createIcons();
import { currentExercise } from "../data/exercises.js";
import { convertToTimeString } from "./utils/time.js";

const exerciseName = document.querySelector(".js-exercise-name")
const remainingTimeFlag = document.querySelector(".js-remaining-time");
const card = document.querySelector(".js-card");
const phaseName = document.querySelector(".js-phase-name");
const phaseDuration = document.querySelector(".js-phase-duration");
const restartButton = document.querySelector(".js-restart-countdown");
const stopButton = document.querySelector(".js-stop-countdown");
let stopCountdown = false;
let currentPhaseIndex = 0;
let remainingIntervalTime = null;
let remainingTotalTime;
let isMuted = false;

window.addEventListener("load", () => {
  setTimeout(() => {
    startCountdown();
  }, 500);
});

const colorClasses = {
  Prepare: "prepare",
  Work: "work",
  Rest: "rest",
  CoolDown: "cool-down",
};

function countDown({ title, durationInSeconds }, playAudio) {
  return new Promise((res, rej) => {
    if (stopCountdown) {
      rej("Countdown stopped");
      return;
    }
    if (!isMuted && playAudio && (title === "CoolDown" || title === "Prepare")) {
      playPhaseSound(title);
    }

updateDisplay(title, durationInSeconds)
    

    const intervalIdentifier = setInterval(() => {
      if (stopCountdown) {
        clearInterval(intervalIdentifier);
        remainingIntervalTime = durationInSeconds;
        rej("Countdown stopped");
        return;
      }
      durationInSeconds--;
      remainingTotalTime--;

      if (durationInSeconds < 0) {
        clearInterval(intervalIdentifier);
        res();
      } else {
        if (!isMuted && title !== "CoolDown" && durationInSeconds === 0) {
          playPhaseSound("Beep2");
        }
        if (
          !isMuted &&
          title !== "CoolDown" &&
          durationInSeconds <= 3 &&
          durationInSeconds > 0
        ) {
          playPhaseSound("Beep1");
        }
        phaseDuration.innerHTML = convertToTimeString(durationInSeconds);
        remainingTimeFlag.innerHTML = convertToTimeString(remainingTotalTime);
      }
    }, 1000);
  });
}

function playPhaseSound(title) {
  let sound = new Audio("/sounds/" + title + ".mp3");
  sound.play();
}

function updateDisplay(title, durationInSeconds) {
  const colorClass = colorClasses[title] || "";
  card.className =
    "shadow-lg col-md-6 position-relative p-5 p-sm-4 pb-sm-1 text-center text-muted rounded-5 align-items-center js-card mb-4 " + colorClass;
  phaseName.innerHTML = title;
  remainingTimeFlag.innerHTML = convertToTimeString(remainingTotalTime);
  phaseDuration.innerHTML = convertToTimeString(durationInSeconds);

}

function createCountDownArray(exercise) {
  const array = [];
  const countDownDurations = exercise.map((el) => {
    return el.durationInSeconds
      ? { ...el, durationInSeconds: el.durationInSeconds - 1 }
      : { ...el };
  });
  const numberOfSets = exercise[4].sets;
  for (let i = 0; i < numberOfSets; i++) {
    array.push(countDownDurations[1], countDownDurations[2]);
  }
  return [countDownDurations[0], ...array, countDownDurations[3]];
}

const phasesArray = createCountDownArray(currentExercise);

function calculateTotalExerciseTime() {
  return phasesArray.reduce((accumulator, phase) => {
    return accumulator + phase.durationInSeconds + 1;
  }, -1);
}

remainingTotalTime = calculateTotalExerciseTime();

// function createPhasesArray(exercise) {
//   const array = [];
//   const numberOfSets = exercise[4].sets;
//   for (let i = 0; i < numberOfSets; i++) {
//     array.push(exercise[1], exercise[2]);
//   }
//   return [exercise[0], ...array, exercise[3]];
// }

function startCountdown(startIndex = 0) {
  if (currentExercise.title) {
  exerciseName.innerHTML = currentExercise.title};
  const countDownArray = phasesArray.slice(startIndex).map((el, index) => {
    const newFunction = () => {
      currentPhaseIndex = startIndex + index;
      const isPhaseCut = remainingIntervalTime !== null && index === 0;
      return countDown(
        {
          title: el.title,
          durationInSeconds: isPhaseCut
            ? remainingIntervalTime
            : el.durationInSeconds,
        },
        !isPhaseCut
      );
    };
    return newFunction;
  });

  countDownArray
    .reduce((chain, countDownFn) => chain.then(countDownFn), Promise.resolve())
    .then(() => {
      stopButton.classList.add("invisible");
    })
    .catch((error) => console.log(error));
}

stopButton.addEventListener("click", function () {
  if (stopCountdown) {
    stopCountdown = false;
    this.innerHTML = "Pause";
    startCountdown(currentPhaseIndex);
  } else {
    stopCountdown = true;
    this.innerHTML = "Continue";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    if (stopCountdown) {
      stopCountdown = false;
      stopButton.innerHTML = "Pause";
      startCountdown(currentPhaseIndex);
    } else {
      stopCountdown = true;
      stopButton.innerHTML = "Continue";
    }
  }
});

restartButton.addEventListener("click", () => {
    stopCountdown = true;  
    setTimeout(() => {
      stopButton.innerHTML = "Pause";
      stopCountdown = false;
      currentPhaseIndex = 0;
      remainingIntervalTime = null;
      remainingTotalTime = calculateTotalExerciseTime();
      stopButton.classList.remove("invisible");
      startCountdown();
    }, 1000);
  });

document.querySelector(".js-close").addEventListener("click", () => {
  window.open("../index.html", "_self");
});

document.querySelector(".js-mute").addEventListener("click", function () {
  isMuted = !isMuted;
  this.innerHTML = `<i data-lucide="volume-${isMuted ? "x" : "2"}"></i>`;
  lucide.createIcons();
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
