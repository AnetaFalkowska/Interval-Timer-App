import { isValidDuration, isValidSets } from "./utils/validation.js";
import { convertToSeconds, convertToTimeString } from "./utils/time.js";
import {
  addToUserExercises,
  editedExerciseId,
  getExerciseById,
  updateUserExercises,
} from "../data/exercises.js";



const exercisePhaseInputs = document.querySelectorAll(".js-duration");
const setsInput = document.querySelector(".js-sets");
const quickStartButton = document.querySelector(".js-quickStart-exercise");
const saveToPresetButton = document.querySelector(".js-saveToPreset");
const saveExerciseButton = document.querySelector(".js-save-exercise");
const exerciseName = document.querySelector(".js-exercise-name");
let uniquePhasesArray;

window.addEventListener("load", () => {
  if (editedExerciseId) {
    const editedExercise = getExerciseById(editedExerciseId);
    setupIsEditingUI(editedExerciseId, editedExercise);
    populateFormWithExerciseData(editedExercise);
  }
});
window.addEventListener("beforeunload", () => {
  localStorage.removeItem("editedExerciseId");
});

function createUniquePhasesArray() {
  const phasesArray = Array.from(exercisePhaseInputs).map((el) => {
    const titleLowerCase = el.dataset.title.toLowerCase();
    const minutesInput = document.querySelector(`#${titleLowerCase}-minutes`);
    const secondsInput = document.querySelector(`#${titleLowerCase}-seconds`);
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    const totalSeconds = minutes * 60 + seconds;
    return {
      title: el.dataset.title,
      durationInSeconds: totalSeconds,
    };
  });

  const uniquePhasesObj = phasesArray.reduce((obj, el) => {
    if (!obj[el.title]) {
      obj[el.title] = el;
    }
    return obj;
  }, {});

  return Object.values(uniquePhasesObj);
}

function validateNewForm() {
  document
    .querySelectorAll(".invalid")
    .forEach((el) => el.classList.remove("invalid"));

  uniquePhasesArray = createUniquePhasesArray();
  const invalidInputs = [];

  uniquePhasesArray.forEach((phase) => {
    if (
      !Number.isInteger(phase.durationInSeconds) ||
      phase.durationInSeconds === 0
    ) {
      document.querySelector(`#${phase.title}`).classList.add("invalid");
      invalidInputs.push(phase.title);
    }
  });
  if (!setsInput.value || (setsInput.value && !isValidSets(setsInput.value))) {
    document
      .querySelector(`#${setsInput.dataset.title}`)
      .classList.add("invalid");
    invalidInputs.push(setsInput.dataset.title);
  }

  return invalidInputs.length === 0;
}

function collectIntervalData() {
  const setsData = {
    title: setsInput.dataset.title,
    sets: parseInt(setsInput.value) || 0,
  };
  return [...uniquePhasesArray, setsData];
}

quickStartButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateNewForm()) {
    const exercise = collectIntervalData();
    localStorage.setItem("currentExercise", JSON.stringify(exercise));
    window.open("../exercise.html", "_self");
  }
});

saveToPresetButton.addEventListener("click", (e) => {
  if (validateNewForm()) {
    const modal = new bootstrap.Modal(
      document.getElementById("staticBackdrop")
    );
    modal.show();
  }
});

saveExerciseButton.addEventListener("click", () => {
  const newUserExercise = collectIntervalData();
  addToUserExercises(newUserExercise, exerciseName.value);
  window.open("../userExercises.html", "_self");
});

function populateFormWithExerciseData(editedExercise) {
  const exerciseData = editedExercise.exercise;
  console.log(exerciseData);
  exerciseData.map((phase) => {
    if (phase.title !== "sets") {
      const minutes = Math.floor(phase.durationInSeconds / 60)
      const seconds = phase.durationInSeconds % 60;
      const titleLowerCase = phase.title.toLowerCase()
      const inputMinutes = document.querySelector(`#${titleLowerCase}-minutes`);
      const inputSeconds = document.querySelector(`#${titleLowerCase}-seconds`);
      inputMinutes.value = formatTimeValue(minutes)
      inputSeconds.value = formatTimeValue(seconds)
    }    
  });
  setsInput.value = exerciseData[4].sets;
}

function setupIsEditingUI(id, editedExercise) {
  document.querySelector(".js-form-title").classList.add("d-none")
  const exerciseName = document.querySelector(".js-edited-name");
  exerciseName.classList.remove("d-none");
  exerciseName.value = editedExercise.name;
  const actionsElement = document.querySelector(".js-actions");
  actionsElement.classList.remove("justify-content-sm-between");
  actionsElement.classList.add("justify-content-sm-center"),
    (actionsElement.innerHTML = `<button
              class="btn btn-warning fs-4 js-edit-exercise"
              type="submit"
            >
              Save changes
            </button>`);
  document.querySelector(".js-edit-exercise").addEventListener("click", (e) => {
    e.preventDefault();
    if (validateNewForm()) {
      const exercise = collectIntervalData();
      updateUserExercises(exercise, exerciseName.value, id);
      window.open("../userExercises.html", "_self");
    }
  });
}


function formatTimeValue(value) {
let valueInt = parseInt(value);
if (valueInt > 59) valueInt = 59;
return valueInt.toString().padStart(2, "0")
}



exercisePhaseInputs.forEach((input) =>
  input.addEventListener("input", function() {this.value = formatTimeValue(this.value)})
);

exercisePhaseInputs.forEach((input) =>
  input.addEventListener("blur", function () {
    if (this.value.trim() !== "") {
      const siblingInputsTitle = this.dataset.title.toLowerCase();
      const siblingId = this.id.includes("minutes")
        ? `${siblingInputsTitle}-seconds`
        : `${siblingInputsTitle}-minutes`;
      const siblingInput = document.querySelector(`#${siblingId}`);

      if (
        siblingInput &&
        siblingInput.value.trim() === "" &&
        siblingInput !== document.activeElement
      ) {
        siblingInput.value = "00";
      }
    }
  })
);

// function validateForm() {
//   document
//     .querySelectorAll(".feedback, .js-duration, .js-sets")
//     .forEach((el) => el.classList.remove("invalid"));

//   const invalidInputs = [];

//   exercisesPhases.forEach((input) => {
//     if (!input.value || (input.value && !isValidDuration(input.value))) {
//       input.classList.add("invalid");
//       invalidInputs.push(input);
//     }
//   });

//   if (
//     !setsInput.value.trim() !== "" ||
//     (setsInput.value && !isValidSets(setsInput.value))
//   ) {
//     setsInput.classList.add("invalid");
//     invalidInputs.push(setsInput);
//   }

//   invalidInputs.forEach((invalidInput) => {
//     const feedbackDiv = document.querySelector(
//       `.feedback-${invalidInput.dataset.id}`
//     );
//     if (feedbackDiv) feedbackDiv.classList.add("invalid");
//   });

//   return invalidInputs.length === 0;
// }
