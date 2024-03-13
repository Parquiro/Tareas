// Base de datos JSON de tareas
let tasks = [];

// Obtener la lista de tareas del almacenamiento local (si existe)
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  displayTasks();
}

// Función para mostrar las tareas en la lista
function displayTasks() {
  const categories = {
    personal: document.getElementById("personal-list"),
    trabajo: document.getElementById("trabajo-list"),
    estudio: document.getElementById("estudio-list"),
  };

  // Limpiar listas de tareas
  for (const category in categories) {
    categories[category].innerHTML = "";
  }

  // Mostrar tareas en las listas correspondientes
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">${
      task.name
    }</span>
            <button class="complete" onclick="toggleCompleted(${index})">${
      task.completed ? "Desmarcar" : "Marcar"
    } como completada</button>
            <button class="delete" onclick="deleteTask(${index})">Eliminar</button>
        `;
    categories[task.category].appendChild(li);
  });
  saveTasks();
}

// Función para agregar una nueva tarea
document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const taskInput = document.getElementById("task-input");
    const taskName = taskInput.value.trim();
    const taskCategory = document.getElementById("task-category").value;
    if (taskName !== "") {
      tasks.push({ name: taskName, category: taskCategory, completed: false });
      taskInput.value = "";
      displayTasks();
    }
  });

// Función para marcar o desmarcar una tarea como completada
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

// Función para eliminar una tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

// Función para guardar las tareas en el almacenamiento local
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
