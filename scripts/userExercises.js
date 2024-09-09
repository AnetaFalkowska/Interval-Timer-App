import {
  userExercises,
  initialiseDemoExercises,
  demoExercises,
  saveUserExerciseToLocalStorage,
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

initialiseDemoExercises();

function generateExerciseListHTML() {
  let html = "";

  userExercises.forEach((el, index) => {
    const isChecked =
      index ===
      (preselecetedExercise !== null
        ? preselecetedExercise
        : userExercises.length - 1);
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
          class="list-group-item custom-card"
          for="${el.id}"
        >
        <p class="fw-medium fs-4 fs-sm-5 mb-3">${el.name}</p>
         
          <p class="d-flex justify-content-center gap-2 fs-6 opacity-50 mb-0">
            <span class="exercise-detail">Sets: ${el.exercise[4].sets}</span>
            <span class="exercise-detail">Work: ${convertToTimeString(
              el.exercise[1].durationInSeconds
            )}</span>
            <span class="exercise-detail">Rest: ${convertToTimeString(
              el.exercise[2].durationInSeconds
            )}</span>
          </p>
        </label>
`;
  });
  return html;
}

function renderExerciseList() {
  if (userExercises.length === 0) {
    exerciseListElement.innerHTML = `<div>There are no exercises yet, <a href="../interval.html">click here</a> to add some or try<button class="text-primary text-secondary fs-5 fw-semibold bg-transparent border-0 js-demo">demo exercises</button>.</div>`;
    document.querySelector(".js-demo").addEventListener("click", () => {
      demoExercises.forEach((el) => userExercises.push(el));
      saveUserExerciseToLocalStorage();
      init();
    });
  } else {
    exerciseListElement.innerHTML = generateExerciseListHTML();
  }
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
  const isDisabled = userExercises.length === 0;

  startDeleteExerciseButton.disabled = isDisabled;
  startExerciseButton.disabled = isDisabled;
  editExerciseButton.disabled = isDisabled;
  if (!isDisabled) {
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
