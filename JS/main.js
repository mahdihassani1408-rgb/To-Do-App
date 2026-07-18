

const textInput = document.querySelector(".text-input");
const addBtn = document.querySelector(".add-button");
const taskList = document.querySelector(".task-list");

let tasks = [];

const saved = localStorage.getItem('todoTasks');
if(saved){
    tasks = JSON.parse(saved);
}

renderTasks();

function saveTasks(){
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function renderTasks(){
    taskList.innerHTML = '';

    tasks.forEach((task, index) =>{

        const li = document.createElement('li');
        li.dataset.index = index;

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = task.completed;

        const span = document.createElement('span');
        span.textContent = task.text;
        if(task.completed) span.classList.add('completed');

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<img src="Icon/Close.png" alt="Delete">`;

        input.addEventListener('change', function(){
            tasks[li.dataset.index].completed = this.checked;
            saveTasks();
            renderTasks();
        });

        deleteBtn.addEventListener('click', function(){
            tasks.splice(li.dataset.index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });
}

addBtn.addEventListener("click", 
    function(){

        const text = textInput.value.trim();
        if(textInput.value === ""){
            alert('Please write somwthing');
            return;
        }

        tasks.push({text: text, completed: false});

        saveTasks();

        renderTasks();

        textInput.value = '';
    });

