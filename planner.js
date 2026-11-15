// Academic Planner: add, complete, delete tasks (saved in localStorage)

let tasks = [];            // array of task objects
let currentFilter = "all"; // all | active | completed

const form = document.getElementById("taskForm");
const titleInput = document.getElementById("taskTitle");
const dateInput = document.getElementById("taskDate");
const errorBox = document.getElementById("taskError");
const list = document.getElementById("taskList");

function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem("plannerTasks")) || [];
  } catch (e) {
    tasks = [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));
  } catch (e) { /* storage unavailable: planner still works for this visit */ }
}

function addTask(title, due) {
  tasks.push({ id: Date.now(), title: title, due: due, completed: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(function (t) {
    return t.id === id ? { id: t.id, title: t.title, due: t.due, completed: !t.completed } : t;
  });
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  saveTasks();
  render();
}

function updateStats() {
  const done = tasks.filter(function (t) { return t.completed; }).length;
  document.getElementById("totalCount").textContent = tasks.length;
  document.getElementById("doneCount").textContent = done;
  document.getElementById("pendingCount").textContent = tasks.length - done;
}

function render() {
  list.innerHTML = "";
  const visible = tasks.filter(function (t) {
    if (currentFilter === "active") return !t.completed;
    if (currentFilter === "completed") return t.completed;
    return true;
  });

  if (visible.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No tasks to show. Add one above!";
    list.appendChild(li);
  }

  visible.forEach(function (t) {
    const li = document.createElement("li");
    li.className = "task" + (t.completed ? " done" : "");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = t.completed;
    check.setAttribute("aria-label", "Mark " + t.title + " as completed");
    check.addEventListener("change", function () { toggleTask(t.id); });

    const info = document.createElement("div");
    info.className = "info";
    const title = document.createElement("span");
    title.className = "title";
    title.textContent = t.title; // textContent avoids injecting HTML
    info.appendChild(title);
    if (t.due) {
      const due = document.createElement("span");
      due.className = "due";
      due.textContent = "Due: " + t.due;
      info.appendChild(due);
    }

    const del = document.createElement("button");
    del.className = "del";
    del.type = "button";
    del.innerHTML = "&times;";
    del.setAttribute("aria-label", "Delete " + t.title);
    del.addEventListener("click", function () { deleteTask(t.id); });

    li.appendChild(check);
    li.appendChild(info);
    li.appendChild(del);
    list.appendChild(li);
  });

  updateStats();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (title === "") {
    errorBox.textContent = "Please enter a task before adding.";
    return;
  }
  errorBox.textContent = "";
  addTask(title, dateInput.value);
  form.reset();
  titleInput.focus();
});

document.querySelectorAll(".filters button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll(".filters button").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    render();
  });
});

document.getElementById("clearDone").addEventListener("click", function () {
  tasks = tasks.filter(function (t) { return !t.completed; });
  saveTasks();
  render();
});

loadTasks();
render();
