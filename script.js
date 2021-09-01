let initialTasks = [
  {
    name: "Fold Laundry",
    id: 1,
    delete_status: 1,
    accept_status: 1,
  },
  {
    name: "Clean Desk",
    id: 2,
    delete_status: 1,
    accept_status: 1,
  },
  {
    name: "Pay Bills",
    id: 3,
    delete_status: 1,
    accept_status: 1,
  },
];

if (JSON.parse(localStorage.getItem("tasks")) === null) {
  localStorage.setItem("tasks", JSON.stringify(initialTasks));
}

let retrieve_data = JSON.parse(localStorage.tasks);

//same as JSON.parse(localStorage.getItem("tasks"))

let populate_list = (array) => {
  const listContainer = document.querySelector(".todoContainer");
  listContainer.innerHTML = `
  <h2>To-Do List</h2>
  <div class="inputContainer">
  <input type="text" class="enter_new" />
  <button class="enterButton">+<img src /></button>`;

  array.forEach((task) => {
    if (task.delete_status === 1) {
      listContainer.innerHTML += `
    <div id = "singleTaskContainer${task.id}" class = "singleTaskContainer">
    <div class = "taskName">${task.name}</div>
    <button class = "checkButton" id = "checkButton${task.id}" onclick= checkoffTask(${task.id})><img class = "checkmark" src="images/checkmark-png-25962.png" /></button>
    <button class = "trashButton" id = "trashButton${task.id}" onclick= deleteTask(${task.id})><img class = "trashBin" src="./images/garbage-bin-png-10491.png"/></button>    </div>
    `;
    }
  });
};

//Why does quotes around the onclick, like onclick= "deleteTask(${task.id})" work?

populate_list(retrieve_data);

//Add new task function

const addTaskButton = document.querySelector(".enterButton");
const enterText = document.querySelector(".enter_new");
const getLastId = () => {
  return retrieve_data.length + 1;
};

addTaskButton.addEventListener("click", (event) => {
  event.preventDefault;

  if (enterText.value !== null) {
    retrieve_data.push({
      name: enterText.value,
      id: getLastId(),
      delete_status: 1,
      accept_status: 1,
    });
    localStorage.setItem("tasks", JSON.stringify(retrieve_data));
    location.reload();
  }
});

//delete task function

let deleteTask = (id) => {
  retrieve_data.forEach((task) => {
    if (id === task.id) {
      task.delete_status = 2;
    }

    //the problem was, it wasn't storing into the localstorage

    localStorage.setItem("tasks", JSON.stringify(retrieve_data));
  });
  populate_list(retrieve_data);
};

let checkoffTask = (id) => {
  let taskBox = document.querySelector(`#singleTaskContainer${id}`);

  retrieve_data.forEach((task) => {
    if (id === task.id && task.accept_status === 1) {
      task.accept_status = 2;
      console.log(task.accept_status);
      localStorage.setItem("tasks", JSON.stringify(retrieve_data));
      taskBox.style.backgroundColor = "#A9A19E";
      taskBox.style.color = "#6C6460";
      taskBox.style.textDecoration = "line-through";
    } else if (id === task.id && task.accept_status === 2) {
      task.accept_status = 1;
      console.log(task.accept_status);
      localStorage.setItem("tasks", JSON.stringify(retrieve_data));
      taskBox.style.backgroundColor = "white";
      taskBox.style.color = "black";
      taskBox.style.textDecoration = "none";
    }
  });
};

let resetButton = document.querySelector(".resetButton");
let reset = () => {
  resetButton.addEventListener("click", (event) => {
    event.preventDefault;
    localStorage.clear();
    location.reload();
  });
};
reset();
