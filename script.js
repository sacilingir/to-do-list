"use strict";

let gorevListesi = [
  { id: 1, gorevAdi: "Görev 1", durum: "completed" },
  { id: 2, gorevAdi: "Görev 2", durum: "pending" },
  { id: 7, gorevAdi: "Görev 3", durum: "completed" },
  { id: 4, gorevAdi: "Görev 4", durum: "pending" },
];

const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
const filters = document.querySelectorAll(".filters span");

let editId;
let isEditTask = false;

displayTasks();

function displayTasks(filter) {
  let ul = document.getElementById("task-list");
  ul.innerHTML = "";
  if (gorevListesi.length == 0) {
    ul.innerHTML = "<p class='p-3 m-0'>Görev listeniz boş</p>";
  } else {
    for (let gorev of gorevListesi) {
      let completed;
      if (gorev.durum == "completed") {
        completed = "checked";
      } else {
        completed = "";
      }

      if (filter == gorev.durum || filter == "all") {
        let li = `
                        <li class="task list-group-item">
                            <div class="form-check">
                                <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed}>
                                <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
                            </div>
                            <div class="dropdown">
                                <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
                                    <li><a onclick='editTask(${gorev.id}, "${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Düzenle</a></li>
                                </ul>
                            </div>
                        </li>
                    `;
        ul.insertAdjacentHTML("beforeend", li);
      }
    }
  }
}

document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
document
  .querySelector("#btnAddNewTask")
  .addEventListener("keypress", function () {
    if (event.key == "Enter") {
      document.getElementById("btnAddNewTask").click();
    }
  });

for (let span of filters) {
  span.addEventListener("click", function () {
    document.querySelector("span.active").classList.remove("active");
    span.classList.add("active");
    displayTasks(span.id);
  });
}

function newTask(event) {
  if (taskInput.value == "") {
    alert("görev girmelisiniz");
  } else {
    if (!isEditTask) {
      //ekleme
      gorevListesi.push({
        id: gorevListesi.length + 1,
        gorevAdi: taskInput.value,
      });
    } else {
      //güncelleme
      for (let gorev of gorevListesi) {
        if (gorev.id == editId) {
          gorev.gorevAdi = taskInput.value;
        }
        isEditTask = false;
      }
    }

    taskInput.value = "";
    displayTasks(document.querySelector("span.active").id);
  }

  event.preventDefault();
}

function deleteTask(id) {
  let deletedId;
  for (let index in gorevListesi) {
    if (gorevListesi[index].id == id) {
      deletedId = index;
    }
  }
  gorevListesi.splice(deletedId, 1);
  displayTasks(document.querySelector("span.active").id);
}
function editTask(taskId, taskName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = taskName;
  taskInput.focus();
  taskInput.classList.add("active");
}

btnClear.addEventListener("click", function () {
  gorevListesi.splice(0, gorevListesi.length);
  displayTasks("all");
});

function updateStatus(selectedTask) {
  let label = selectedTask.parentElement.lastElementChild;
  let durum;
  if (selectedTask.checked) {
    label.classList.add("checked");
    durum = "completed";
  } else {
    label.classList.remove("checked");
    durum = "pending";
  }
  for (let gorev of gorevListesi) {
    if (gorev.id == selectedTask.id) {
      gorev.durum = durum;
    }
  }
}
