import { isValidDuration, isValidSets } from "./utils/validation.js";
import { convertToSeconds, convertToTimeString } from "./utils/time.js";
import {
  addToUserExercises,
  editedExerciseId,
  getExerciseById,
  updateUserExercises,
} from "../data/exercises.js";

const exercisesPhases = document.querySelectorAll(".js-duration");
const setsInput = document.querySelector(".js-sets");
const quickStartButton = document.querySelector(".js-quickStart-exercise");
const saveExerciseButton = document.querySelector(".js-save-exercise");
const exerciseName = document.querySelector(".js-exercise-name");

window.addEventListener("load", () => {
  if (editedExerciseId) {
    const editedExercise = getExerciseById(editedExerciseId);
    setupIsEditingUI(editedExerciseId, editedExercise);
    populateFormWithExerciseData(editedExercise);
  }
});
window.addEventListener("beforeunload", ()=>{localStorage.removeItem("editedExerciseId")});

function collectIntervalData() {
  const phasesArray = Array.from(exercisesPhases).map((el) => ({
    id: el.dataset.id,
    durationInSeconds: convertToSeconds(el.value),
  }));

  const setsData = {
    id: setsInput.dataset.id,
    sets: parseInt(setsInput.value),
  };
  return [...phasesArray, setsData];
}

function validateForm() {
  document
    .querySelectorAll(".feedback, .js-duration, .js-sets")
    .forEach((el) => el.classList.remove("invalid"));

  const invalidInputs = [];

  exercisesPhases.forEach((input) => {
    if (!input.value || (input.value && !isValidDuration(input.value))) {
      input.classList.add("invalid");
      invalidInputs.push(input);
    }
  });

  if (!setsInput.value || (setsInput.value && !isValidSets(setsInput.value))) {
    setsInput.classList.add("invalid");
    invalidInputs.push(setsInput);
  }

  invalidInputs.forEach((invalidInput) => {
    const feedbackDiv = document.querySelector(
      `.feedback-${invalidInput.dataset.id}`
    );
    if (feedbackDiv) feedbackDiv.classList.add("invalid");
  });

  return invalidInputs.length === 0;
}

quickStartButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateForm()) {
    const exercise = collectIntervalData();
    localStorage.setItem("currentExercise", JSON.stringify(exercise));
    window.open("../exercise.html", "_self");
  }
});

saveExerciseButton.addEventListener("click", () => {
  if (validateForm()) {
    const newUserExercise = collectIntervalData();
    addToUserExercises(newUserExercise, exerciseName.value);
    window.open("../userExercises.html", "_self");
  }
});

function populateFormWithExerciseData(editedExercise) {
  const exerciseData = editedExercise.exercise;
  console.log(exerciseData);
  exerciseData.map((phase) => {
    const input = document.querySelector(`.js-duration[data-id="${phase.id}"`);
    if (input) {
      input.value = convertToTimeString(phase.durationInSeconds);
    }
  });
  setsInput.value = exerciseData[4].sets;
}

function setupIsEditingUI(id, editedExercise) {
  const exerciseName = document.querySelector(".js-edited-name")
  exerciseName.classList.remove("d-none")
  exerciseName.value= editedExercise.name
  const actionsElement = document.querySelector(".js-actions")
  actionsElement.classList.remove('d-grid', 'd-md-flex', 'justify-content-md-between');
  actionsElement.classList.add('d-flex', 'justify-content-center'),
  actionsElement.innerHTML = `<button
              class="btn btn-warning fs-4 js-edit-exercise"
              type="submit"
            >
              Save changes
            </button>`;
  document.querySelector(".js-edit-exercise").addEventListener("click", (e) => {
    e.preventDefault();
    if (validateForm()) {
      const exercise = collectIntervalData();
      updateUserExercises(exercise, exerciseName.value, id);
      window.open("../userExercises.html", "_self");
    }
  });
}
