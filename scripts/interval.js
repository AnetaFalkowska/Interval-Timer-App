// import {currentExercise} from "../data/exercises.js"

const intervalSetup = [
  { id: "prepare", name: "Prepare", type: "text", placeholder:"mm:ss"},
  { id: "work", name: "Work", type: "text", placeholder:"mm:ss" },
  { id: "rest", name: "Rest", type: "text", placeholder:"mm:ss" },
  { id: "coolDown", name: "Cool Down", type: "text", placeholder:"mm:ss" },
  { id: "sets", name: "Sets", type: "number" , placeholder:"0"},
];

let html = "";

intervalSetup.forEach((el) => {
  html += `<div class="mb-3">
  <label for="${el.id}" class="form-label">${el.name}</label>
  <input type="${el.type}" placeholder="${el.placeholder}" class="form-control" id="${el.id}" aria-describedby="emailHelp">
  </div>`;
});


document.querySelector(".js-interval-setup").innerHTML = html;

function convertToSeconds(time) {
 const timeArray = time.split(":")
 const minutes = parseInt(timeArray[0], 10)
 const seconds = parseInt(timeArray[1], 10)
 const totalSeconds = minutes * 60 + seconds
 return totalSeconds
}

document.querySelector(".js-start-exercise").addEventListener("click", (e) => {
  window.open("../exercise.html");
  const prepare = convertToSeconds(document.querySelector("#prepare").value);
  const sets = parseInt(document.querySelector("#sets").value);
  const work = convertToSeconds(document.querySelector("#work").value);
  const rest = convertToSeconds(document.querySelector("#rest").value);
  const cooldown = convertToSeconds(document.querySelector("#coolDown").value);
  const currentExercise = { prepare, sets, work, rest, cooldown };
  console.log(currentExercise);
});
