import { userExercises, deleteExercise } from "../data/exercises.js";
import { convertToTimeString } from "./utils/time.js";



function generateExerciseListHTML() {
let html = "";

userExercises.forEach((el) => {
  html += `<label class="list-group-item d-flex gap-2">
<input
  class="form-check-input flex-shrink-0"
  type="radio"
  name="exercises"
  id="${el.id}"
  value="${el.id}"
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
return html
}

function renderExerciseList() {
    const exerciseListElement = document.querySelector(".js-exercise-list")
    exerciseListElement.innerHTML = generateExerciseListHTML()
}

renderExerciseList()

document.querySelector(".js-delete-exercise").addEventListener("click", () => {
  const exerciseId = document.querySelector(
    'input[name="exercises"]:checked'
  ).value;
  deleteExercise(exerciseId);
  renderExerciseList()
});
