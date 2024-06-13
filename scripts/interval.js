import { currentExercise as exercises } from "../data/exercises.js";
import { isValidDuration, isValidSets } from "./utils/validation.js";
import { convertToSeconds } from "./utils/time.js"


window.addEventListener("load", () => {
  localStorage.removeItem("currentExercise")
});

function gatherDurations() {
  return Array.from(document.querySelectorAll(".js-duration")).map((el) => ({
    id: el.dataset.id,
    durationInSeconds: convertToSeconds(el.value),
  }));
}

function gatherSetsData() {
  const sets = document.querySelector("#sets");
  return { id: sets.dataset.id, sets: parseInt(sets.value) };
}

function validateForm() {
  document
    .querySelectorAll(".feedback, .js-duration, .js-sets")
    .forEach((el) => el.classList.remove("invalid"));

  const invalidInputs = [];

  document.querySelectorAll(".js-duration").forEach((input) => {
    if (!input.value || (input.value && !isValidDuration(input.value))) {
      input.classList.add("invalid");
      invalidInputs.push(input);
    }
  });

  const setInput = document.querySelector(".js-sets");
  if (!setInput.value || (setInput.value && !isValidSets(setInput.value))) {
    setInput.classList.add("invalid");
    invalidInputs.push(setInput);
  }

  invalidInputs.forEach((invalidInput) => {
    const feedbackDiv = document.querySelector(
      `.feedback-${invalidInput.dataset.id}`
    );
    if (feedbackDiv) feedbackDiv.classList.add("invalid");
  });

  return invalidInputs.length === 0;
}

document.querySelector(".js-start-exercise").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateForm()) {
    const durations = gatherDurations();
    const setsData = gatherSetsData();
    exercises.push(...durations, setsData);
    localStorage.setItem("currentExercise", JSON.stringify(exercises));
    window.open("../exercise.html", "_self");
  }
});
