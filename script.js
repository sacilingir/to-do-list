"use strict";

let sonuc;

let gorevListesi = [
  { id: "1", gorevAdi: "Görev 1" },
  { id: "1", gorevAdi: "Görev 1" },
  { id: "1", gorevAdi: "Görev 1" },
  { id: "1", gorevAdi: "Görev 1" },
];
displayTasks();

function displayTasks() {
  let ul = document.getElementById("task-list");
  ul.innerHTML = "";

  for (let gorev of gorevListesi) {
    let li = `
                <li class="task list-group-item">
                    <div class="form-check">
                        <input type="checkbox" id="${gorev.id}" class="form-check-input">
                        <label for="${gorev.id}" class="form-check-label">${gorev.gorevAdi}</label>
                    </div>
                </li>
            `;

    ul.insertAdjacentHTML("beforeend", li);
  }
}

document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
document
  .querySelector("#btnAddNewTask")
  .addEventListener("keypress", function () {
    if (event.key == "Enter") {
      document.querySelector("#btnAddNewTask").click(); //bu işlem 82.satırı çalıştırıyor.
    }
  });

function newTask(event) {
  let taskInput = document.querySelector("#txtTaskName");
  if (taskInput.value == "") {
    alert("Görev girmelisiniz.");
  }
  gorevListesi.push({
    id: gorevListesi.length + 1,
    gorevAdi: taskInput.value,
  });
  taskInput.value = "";
  displayTasks();
  event.preventDefault();
}
