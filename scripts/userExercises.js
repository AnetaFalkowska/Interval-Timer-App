import { userExercises, deleteExercise, updateCurrentExercise } from "../data/exercises.js";
import { convertToTimeString } from "./utils/time.js";

const exerciseListElement = document.querySelector(".js-exercise-list");
const startDeleteExerciseButton = document.querySelector(
  ".js-start-delete-exercise"
);
const startExerciseButton = document.querySelector(".js-start-exercise");
const deleteExerciseButton = document.querySelector(".js-delete-exercise");

function generateExerciseListHTML() {
  let html = "";

  userExercises.forEach((el, index) => {

    const isChecked = index === 0;
    html += `<label class="list-group-item d-flex gap-2">
<input
  class="form-check-input flex-shrink-0"
  type="radio"
  name="exercises"
  id="${el.id}"
  value="${el.id}"
  ${isChecked ? "checked" : ""}
/>
<span>
  ${el.name}
  <small class="d-block text-body-secondary"
    >Sets: ${el.exercise[4].sets}   Work: ${convertToTimeString(
      el.exercise[1].durationInSeconds
    )}  Rest: ${convertToTimeString(el.exercise[2].durationInSeconds)}</small
  >
</span>

</label>`;
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
      ).value
  if (selectedExerciseId) {
    deleteExercise(selectedExerciseId);
    init();
  }
}

function handleStartExercise() {
    const selectedExerciseId = document.querySelector(
        'input[name="exercises"]:checked'
      ).value
    if (selectedExerciseId) {
        const selectedUserExercise = userExercises.find((el)=> el.id === selectedExerciseId)
        const startedExercise = selectedUserExercise.exercise
        updateCurrentExercise(startedExercise);
        window.open("../exercise.html", "_self");   
    }
  }

function setUpButtons() {
  if (userExercises.length === 0) {
    startDeleteExerciseButton.disabled = true;
    startExerciseButton.disabled = true;
  } else {
    deleteExerciseButton.addEventListener("click", handleDeleteExercise);
    startExerciseButton.addEventListener("click", handleStartExercise)
  }
}

function init() {
  renderExerciseList();
  setUpButtons();
}

init();
