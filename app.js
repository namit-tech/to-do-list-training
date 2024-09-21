
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);


taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTask(taskInput.value);
    taskInput.value = ''; // Clear input field
});

function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', toggleTask);
    li.prepend(checkbox);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', deleteTask);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    saveTasks();
}

function toggleTask(e) {
    const taskItem = e.target.parentElement;
    taskItem.classList.toggle('completed');
    saveTasks();
}


function deleteTask(e) {
    const taskItem = e.target.parentElement;
    taskItem.remove();
    saveTasks();
}


function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((taskItem) => {
        tasks.push({
            text: taskItem.textContent.replace('Delete', '').trim(),
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        addTask(task.text);
        if (task.completed) {
            const taskItem = taskList.lastChild;
            taskItem.classList.add('completed');
            taskItem.querySelector('input[type="checkbox"]').checked = true;
        }
    });
}
