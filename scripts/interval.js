import { currentExercise as exercises } from "../data/exercises.js";


function convertToSeconds(time) {
  const timeArray = time.split(":");
  const minutes = parseInt(timeArray[0], 10);
  const seconds = parseInt(timeArray[1], 10);
  return minutes * 60 + seconds;
}

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

document.querySelector(".js-start-exercise").addEventListener("click", (e) => {
  e.preventDefault();
  window.open("../exercise.html");
  const durations = gatherDurations();
  const setsData = gatherSetsData();
  exercises.push(...durations, setsData);
  localStorage.setItem("currentExercise", JSON.stringify(exercises))
});



