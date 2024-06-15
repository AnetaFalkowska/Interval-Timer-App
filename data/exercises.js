export let currentExercise = JSON.parse(localStorage.getItem("currentExercise")) || []
export let userExercises = JSON.parse(localStorage.getItem("userExercises")) || []

function saveUserExerciseToLocalStorage() {    
    localStorage.setItem("userExercises", JSON.stringify(userExercises))
}

function uniqueId() {   
    return Math.random().toString(16).slice(2);
  };

export function addToUserExercises(exercise, name) {
    userExercises.push({id: uniqueId(), name, exercise:[...exercise]})
    saveUserExerciseToLocalStorage()
}

export function deleteExercise(id) {
    userExercises = userExercises.filter(el=> el.id !== id)
    saveUserExerciseToLocalStorage()
}

export function updateCurrentExercise(exercise) {
    localStorage.setItem("currentExercise", JSON.stringify(exercise))
}