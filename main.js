// My Tasks Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let tasksEl = document.getElementById("tasks");

// global variables
let tasks = loadTasks();
displayAll();
// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "add") {
    addTask();
  } else if (selection === "toggle") {
    toggleTask();
  } else if (selection === "remove") {
    removeTask();
  } else if (selection === "clear") {
    clearAll();
  }
}

// MENU FUNCTIONS
function addTask() {
  let description = prompt("enter taks description");
  tasks.push(newTask(description));
  saveTasks();
  displayAll();
}
// toggele task completet
function toggleTask() {
  let index = prompt("enter number of task");
  let task = tasks[index];
  if (task.completed === "") {
    task.completed = "completed";
  } else {
    task.completed = "";
  }
  saveTasks();
  displayAll();
}
//remove task by index
function removeTask() {
  let index = +prompt("enter number of task");
  if (index >= 0 && index < tasks.length) {
    //valid
    tasks.splice(index, 1);
    saveTasks();
    displayAll();
  } else {
    alert("invalid task number");
  }
}
//clear
function clearAll() {
  tasks = [];
  saveTasks();
  displayAll();
}

// helper funtions
function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: "",
  };
}

function displayAll() {
  let outputStr = "";
  for (let n = 0; n < tasks.length; n++) {
    outputStr += getTaskHTMLStr(tasks[n], n);
  }
  tasksEl.innerHTML = outputStr;
}

function getTaskHTMLStr(task, n) {
  return `
  <div class="${task.completed}">
  ${n}: ${task.description}
  </div>

  `;
}

//save
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//load
function loadTasks() {
  let tasksStr = localStorage.getItem("tasks");
  return JSON.parse(tasksStr) ?? [];
}
