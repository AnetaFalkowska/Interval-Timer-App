const intervalSetup = [
  { id: "prepare", name: "Prepare", type: "time" },
  { id: "work", name: "Work", type: "time" },
  { id: "rest", name: "Rest", type: "time" },
  { id: "coolDown", name: "Cool Down", type: "time" },
  { id: "sets", name: "Sets", type: "number" },
];

let html

intervalSetup.forEach((el) => {
  html += `<div class="mb-3 card">
    <label for="${el.id}" class="form-label">${el.name}</label>
    <input
      type="${el.type}"
      value="00:00"
      class="form-control"
      id="${el.id}"
      aria-describedby="emailHelp"
    />
  </div>`;
});

document.querySelector(".js-interval-setup").innerHTML = html

document.querySelector(".start-button").addEventListener("click", () => {
  const prepare = document.querySelector("#prepare").value;
  const sets = document.querySelector("#sets").value;
  const work = document.querySelector("#work").value;
  const rest = document.querySelector("#rest").value;
  const cooldown = document.querySelector("#cooldown").value;
});
