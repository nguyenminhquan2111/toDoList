import Task from "../models/task.js";

let listTask = [];
let listCompletedTask = [];

const getEle = (id) => document.getElementById(id);
const findById = (id, list) => {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) return i;
  }
  return -1;
};

getEle("addItem").addEventListener("click", () => {
  let nameTask = getEle("newTask").value;
  let id = listTask.length;

  const newTask = new Task(id, nameTask, "todo");

  listTask.push(newTask);

  //   console.log(listTask);

  createList(listTask);
  //   createListCompleted(listCompletedTask);
});

const createList = (data) => {
  let listTaskHTML = "";
  for (let i in data) {
    listTaskHTML += `<li>${data[i].name}
            <div class="buttons">
                <button class="remove" onclick="handleDeleteTask(${data[i].id})"><i class="far fa-trash-alt"></i></button>
                <button class="complete" onclick="handleCompleteTask(${data[i].id})"><i class="far fa-check-circle"></i></button>
            </div>
          </li>`;
  }
  getEle("todo").innerHTML = listTaskHTML;
  getEle("newTask").value = "";
  //   console.log(listTaskHTML);
};

const createListCompleted = (data) => {
  let listCompletedTaskHTML = "";
  for (let i in data) {
    listCompletedTask[i].check = "completed";
    listCompletedTaskHTML += `<li>${data[i].name}
              <div class="buttons">
                  <button class="remove" onclick="handleDeleteCompletedTask(${data[i].id})"><i class="far fa-trash-alt"></i></button>
                  <button class="complete" onclick="handleUncompleteTask(${data[i].id})"><i class="fas fa-check-circle"></i></button>
              </div>
            </li>`;
  }
  getEle("completed").innerHTML = listCompletedTaskHTML;
  //   console.log(listTaskHTML);
};

const handleDeleteTask = (id) => {
  const foundedIndex = findById(id, listTask);
  if (foundedIndex === -1) return alert("Task doesn't exist");

  listTask.splice(foundedIndex, 1);
  createList(listTask);
  console.log(listTask);
  console.log(listCompletedTask);
};

const handleCompleteTask = (id) => {
  const foundedIndex = findById(id, listTask);
  if (foundedIndex === -1) return alert("Task doesn't exist");

  listCompletedTask.push(listTask[foundedIndex]);

  console.log(listCompletedTask);
  createListCompleted(listCompletedTask);

  listTask.splice(foundedIndex, 1);
  createList(listTask);
};

const handleDeleteCompletedTask = (id) => {
  const foundedIndex = findById(id, listCompletedTask);
  if (foundedIndex === -1) return alert("Task doesn't exist");

  listCompletedTask.splice(foundedIndex, 1);
  createListCompleted(listCompletedTask);

  console.log(listTask);
  console.log(listCompletedTask);
  return;
};

const handleUncompleteTask = (id) => {
  const foundedIndex = findById(id, listCompletedTask);
  if (foundedIndex === -1) return alert("Task doesn't exist");

  listTask.push(listCompletedTask[foundedIndex]);
  createList(listTask);

  listCompletedTask.splice(foundedIndex, 1);
  createListCompleted(listCompletedTask);
};

const sortASC = () => {
  listTask.sort((item1, item2) =>
    item1.name.toUpperCase() > item2.name.toUpperCase() ? 1 : -1
  );
  listCompletedTask.sort((item1, item2) =>
    item1.name.toUpperCase() > item2.name.toUpperCase() ? 1 : -1
  );
  createList(listTask);
  createListCompleted(listCompletedTask);
};

const sortDES = () => {
  listTask
    .sort((item1, item2) =>
      item1.name.toUpperCase() > item2.name.toUpperCase() ? 1 : -1
    )
    .reverse();
  listCompletedTask
    .sort((item1, item2) =>
      item1.name.toUpperCase() > item2.name.toUpperCase() ? 1 : -1
    )
    .reverse();
  createList(listTask);
  createListCompleted(listCompletedTask);
};

window.handleDeleteTask = handleDeleteTask;
window.handleCompleteTask = handleCompleteTask;
window.handleDeleteCompletedTask = handleDeleteCompletedTask;
window.handleUncompleteTask = handleUncompleteTask;
window.sortASC = sortASC;
window.sortDES = sortDES;
