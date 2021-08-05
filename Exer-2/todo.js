var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString, arr) {
  listItem = document.createElement("li");
  checkBox = document.createElement("input");
  label = document.createElement("label");
  editInput = document.createElement("input");
  editButton = document.createElement("button");
  deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  SaveLocalTodos(taskString);
};

var addTask = function () {
  var listItemName = taskInput.value;
  listItem = createNewTaskElement(listItemName);
  if (listItem) {
    incompleteTasksHolder.appendChild(listItem);
  } else {
  }

  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
addButton.addEventListener("click", addTask);

// key board accesibility

taskInput.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addButton.click();
  }
});

// Local storage

// function to save the tasks
function SaveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if (todo) {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
// function to get tasks from local storage
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    checkBox.onchange = taskCompleted;
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    editButton.onclick = editTask;
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = deleteTask;
    label.innerText = todo;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    incompleteTasksHolder.appendChild(listItem);
  });
}
// function to remove tasks from local storage
function removeTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todo);
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

var editTask = function () {
  var listItem = this.parentNode;

  var editInput = listItem.querySelectorAll("input[type=text")[0];

  var label = listItem.querySelector("label");
  var button = listItem.getElementsByTagName("button")[0];

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
    button.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    button.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

var deleteTask = function (el) {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  removeTodos(listItem);
  ul.removeChild(listItem);
};

var taskCompleted = function (el) {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler, cb) {
  var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  var editButton = taskListItem.querySelectorAll("button.edit")[0];
  var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
