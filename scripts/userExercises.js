import {
  userExercises,
  deleteExercise,
  updateCurrentExercise,
  saveEditedExerciseIDToLocalStorage,
  selectedExerciseIndex,
} from "../data/exercises.js";
import { convertToTimeString } from "./utils/time.js";

let preselecetedExercise = selectedExerciseIndex;

const exerciseListElement = document.querySelector(".js-exercise-list");
const startDeleteExerciseButton = document.querySelector(
  ".js-start-delete-exercise"
);
const startExerciseButton = document.querySelector(".js-start-exercise");
const deleteExerciseButton = document.querySelector(".js-delete-exercise");
const editExerciseButton = document.querySelector(".js-edit-exercise");

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("selectedExerciseIndex");
});

function generateExerciseListHTML() {
  let html = "";

  userExercises.forEach((el, index) => {
    const isChecked = index === (preselecetedExercise !== null ? preselecetedExercise : userExercises.length-1);
    html += `
 
<input
          class="list-group-item-check pe-none"
          type="radio"
          name="exercises"
  id="${el.id}"
  value="${el.id}"
  ${isChecked ? "checked" : ""}
        />
        <label
          class="list-group-item rounded-3 py-3 custom-card"
          for="${el.id}"
        >
        <span class="fw-medium fs-4 fs-sm-5 mb-5">${el.name}</span>
         
          <span class="exercise-detalis d-block fs-6 opacity-50 mt-2">
            <span class="exercise-detail">Sets: ${el.exercise[4].sets}</span>
            <span class="exercise-detail">Work: ${convertToTimeString(el.exercise[1].durationInSeconds)}</span>
            <span class="exercise-detail">Rest: ${convertToTimeString(el.exercise[2].durationInSeconds)}</span>
          </span>
        </label>
`;

  });
  return html;
}

function renderExerciseList() {
  exerciseListElement.innerHTML =
    userExercises.length === 0
      ? `<div>There are no exercises yet, <a href="../interval.html">click here</a> to add some.</div>`
      : generateExerciseListHTML();
}

function handleDeleteExercise() {
  const selectedExerciseId = document.querySelector(
    'input[name="exercises"]:checked'
  ).value;
  if (selectedExerciseId) {
    deleteExercise(selectedExerciseId);
    init();
  }
}

function handleEditExercise() {
  const selectedExerciseId = document.querySelector(
    'input[name="exercises"]:checked'
  ).value;
  if (selectedExerciseId) {
    saveEditedExerciseIDToLocalStorage(selectedExerciseId);
    window.open("../interval.html", "_self");
  }
}

function handleStartExercise() {
  const selectedExerciseId = document.querySelector(
    'input[name="exercises"]:checked'
  ).value;
  if (selectedExerciseId) {
    const selectedUserExercise = userExercises.find(
      (el) => el.id === selectedExerciseId
    );
    const startedExercise = selectedUserExercise.exercise;
    updateCurrentExercise(startedExercise);
    window.open("../exercise.html", "_self");
  }
}

function setUpButtons() {
  if (userExercises.length === 0) {
    startDeleteExerciseButton.disabled = true;
    startExerciseButton.disabled = true;
    editExerciseButton.disabled = true;
  } else {
    deleteExerciseButton.addEventListener("click", handleDeleteExercise);
    startExerciseButton.addEventListener("click", handleStartExercise);
    editExerciseButton.addEventListener("click", handleEditExercise);
  }
}

function init() {
  renderExerciseList();
  setUpButtons();
}

init();
