import { isValidDuration, isValidSets } from "./utils/validation.js";
import { convertToSeconds } from "./utils/time.js"

const exercisesPhases = document.querySelectorAll(".js-duration");
const setsInput = document.querySelector(".js-sets");
const quickStartButton = document.querySelector(".js-quickStart-exercise")

window.addEventListener("load", () => {
  localStorage.removeItem("currentExercise")
});

function collectIntervalData() {
  const phasesArray = Array.from(exercisesPhases).map((el) => ({
      id: el.dataset.id,
      durationInSeconds: convertToSeconds(el.value),
    }))

    const setsData = { id: setsInput.dataset.id, sets: parseInt(setsInput.value) }
    return [...phasesArray, setsData]
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
    const exercise = collectIntervalData()
    localStorage.setItem("currentExercise", JSON.stringify(exercise));
    window.open("../exercise.html", "_self");
  }
});
