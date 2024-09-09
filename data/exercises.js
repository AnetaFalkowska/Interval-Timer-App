export const demoExercises =
[
  {
      "id": "236cde0ddf2f",
      "name": "demo exercise 1",
      "exercise": [
          {
              "title": "Prepare",
              "durationInSeconds": 7
          },
          {
              "title": "Work",
              "durationInSeconds": 3
          },
          {
              "title": "Rest",
              "durationInSeconds": 2
          },
          {
              "title": "CoolDown",
              "durationInSeconds": 5
          },
          {
              "title": "sets",
              "sets": 3
          }
      ]
  },
  {
      "id": "3522bb2e8a5ce",
      "name": "demo exercise 2",
      "exercise": [
          {
              "title": "Prepare",
              "durationInSeconds": 7
          },
          {
              "title": "Work",
              "durationInSeconds": 10
          },
          {
              "title": "Rest",
              "durationInSeconds": 4
          },
          {
              "title": "CoolDown",
              "durationInSeconds": 3
          },
          {
              "title": "sets",
              "sets": 2
          }
      ]
  }
]

export let currentExercise =
  JSON.parse(localStorage.getItem("currentExercise")) || [];
export let userExercises =
  JSON.parse(localStorage.getItem("userExercises")) || undefined;
export let editedExerciseId =
  JSON.parse(localStorage.getItem("editedExerciseId")) || null;
export let selectedExerciseIndex =
  localStorage.getItem("selectedExerciseIndex") !== null
    ? JSON.parse(localStorage.getItem("selectedExerciseIndex"))
    : null;


export function initialiseDemoExercises() {
  // Jeśli `userExercises` jest undefined, to oznacza, że aplikacja uruchamiana jest po raz pierwszy
if (userExercises === undefined) {
  userExercises = [...demoExercises];
  saveUserExerciseToLocalStorage();
}
}    

export function saveUserExerciseToLocalStorage() {
  localStorage.setItem("userExercises", JSON.stringify(userExercises));
}

function uniqueId() {
  return Math.random().toString(16).slice(2);
}

export function addToUserExercises(exercise, name) {
  userExercises.push({ id: uniqueId(), name, exercise: [...exercise] });
  saveUserExerciseToLocalStorage();
  localStorage.removeItem("selectedExerciseIndex");
}

export function deleteExercise(id) {
  userExercises = userExercises.filter((el) => el.id !== id);
  saveUserExerciseToLocalStorage();
  localStorage.removeItem("selectedExerciseIndex");
}

export function updateUserExercises(exercise, name, id) {
  const editedExerciseIndex = userExercises.findIndex((el) => el.id === id);
  userExercises[editedExerciseIndex].exercise = [...exercise];
  userExercises[editedExerciseIndex].name = name;
  saveUserExerciseToLocalStorage();
  localStorage.removeItem("editedExerciseId");
  localStorage.setItem(
    "selectedExerciseIndex",
    JSON.stringify(editedExerciseIndex)
  );
}

export function updateCurrentExercise(exercise) {
  localStorage.setItem("currentExercise", JSON.stringify(exercise));
}

export function saveEditedExerciseIDToLocalStorage(id) {
  localStorage.setItem("editedExerciseId", JSON.stringify(id));
}

export function getExerciseById(id) {
  return (
    JSON.parse(localStorage.getItem("userExercises")).find(
      (el) => el.id === id
    ) || null
  );
}


