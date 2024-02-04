// Michelle Miranda - 22112023

document.addEventListener("DOMContentLoaded", function () {
    const addForm = document.getElementById("addForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    addForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = "";
    });

    taskList.addEventListener("click", function (e) {
        handleTaskActions(e, taskList);
    });

    completedList.addEventListener("click", function (e) {
        handleTaskActions(e, completedList);
    });
});

function addTask(taskText) {
    if (taskText.trim() === "") return;

    const taskList = document.getElementById("taskList");

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <div class="task-text">${taskText}</div>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(taskItem);
}

function deleteTask(taskItem) {
    const taskList = taskItem.parentNode;
    taskList.removeChild(taskItem);
}

function editTask(taskItem) {
    const taskText = taskItem.querySelector(".task-text");
    const newTaskText = prompt("Edit task:", taskText.textContent);

    if (newTaskText !== null) {
        taskText.textContent = newTaskText;
    }
}

function handleTaskActions(e, taskList) {
    if (e.target.tagName === "BUTTON") {
        const taskItem = e.target.parentNode;
        if (e.target.classList.contains("delete-btn")) {
            deleteTask(taskItem);
        } else if (e.target.classList.contains("edit-btn")) {
            editTask(taskItem);
        }
    } else if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        const taskItem = e.target.parentNode;
        const taskText = taskItem.querySelector(".task-text");
        const editButton = taskItem.querySelector(".edit-btn");
        const deleteButton = taskItem.querySelector(".delete-btn");

        if (e.target.checked) {
            taskText.classList.add("completed-task");
            editButton.style.display = "none";
            deleteButton.style.display = "none";
            completeTask(taskItem);
        } else {
            taskText.classList.remove("completed-task");
            editButton.style.display = "inline-block";
            deleteButton.style.display = "inline-block";
            uncompleteTask(taskItem, taskList);
        }
    }
}

function completeTask(taskItem) {
    const completedList = document.getElementById("completedList");
    completedList.appendChild(taskItem);
}

function uncompleteTask(taskItem) {
    const taskList = document.getElementById("taskList");
    taskItem.querySelector(".task-text").classList.remove("completed-task");
    const editButton = taskItem.querySelector(".edit-btn");
    const deleteButton = taskItem.querySelector(".delete-btn");
    editButton.style.display = "inline-block";
    deleteButton.style.display = "inline-block";
    taskList.appendChild(taskItem);
}