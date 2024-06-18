export let currentExercise = JSON.parse(localStorage.getItem("currentExercise")) || []
export let userExercises = JSON.parse(localStorage.getItem("userExercises")) || []
export let editedExerciseId = JSON.parse(localStorage.getItem("editedExerciseId")) || null
export let selectedExerciseIndex = JSON.parse(localStorage.getItem("selectedExerciseIndex")) || null

function saveUserExerciseToLocalStorage() {    
    localStorage.setItem("userExercises", JSON.stringify(userExercises))
}

function uniqueId() {   
    return Math.random().toString(16).slice(2);
  };

export function addToUserExercises(exercise, name) {
    userExercises.push({id: uniqueId(), name, exercise:[...exercise]})
    saveUserExerciseToLocalStorage()
    localStorage.removeItem("selectedExerciseIndex")
}

export function deleteExercise(id) {
    userExercises = userExercises.filter(el=> el.id !== id)
    saveUserExerciseToLocalStorage()
    localStorage.removeItem("selectedExerciseIndex")
}

export function updateUserExercises(exercise, id) {
    const editedExerciseIndex = userExercises.findIndex((el)=> el.id === id)
    userExercises[editedExerciseIndex].exercise = [...exercise]    
    saveUserExerciseToLocalStorage()
    localStorage.removeItem("editedExerciseId")
    localStorage.setItem("selectedExerciseIndex", JSON.stringify(editedExerciseIndex))
}

export function updateCurrentExercise(exercise) {
    localStorage.setItem("currentExercise", JSON.stringify(exercise))
}

export function saveEditedExerciseIDToLocalStorage(id) {    
    localStorage.setItem("editedExerciseId", JSON.stringify(id))
}

export function getExerciseById(id) {  

    return JSON.parse(localStorage.getItem("userExercises")).find(el=>el.id === id) || null
}