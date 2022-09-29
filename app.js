

const taskList = document.querySelector('#tasks');
const addBtn = document.querySelector('#add-btn');
const inputField = document.getElementById('task');
const filterInput = document.querySelector('#filter');
const clearBtn = document.querySelector('#clear-tasks-btn');
const doneTaskList = document.querySelector('#done-tasks');
const filterDoneInput = document.querySelector('#filter-done');
const clearDoneBtn = document.querySelector('#clear-done-btn');

loadEventListeners();

function loadEventListeners(){
    addBtn.addEventListener('click', addTask);
    filterInput.addEventListener('keyup', filterTasks);
    filterDoneInput.addEventListener('keyup', filterDoneTasks);
    clearBtn.addEventListener('click', clearTasks);
    clearDoneBtn.addEventListener('click', clearDoneTasks);
    document.addEventListener("DOMContentLoaded", getLocalStorage);
    document.addEventListener("DOMContentLoaded", getDoneTasks);
    document.addEventListener("mousedown", deleteTask);
    document.addEventListener("mousedown", deleteDoneTask);
    document.addEventListener("mousedown", backToTodo);
    document.addEventListener("mousedown", moveToDone);

}


function getLocalStorage(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        taskList.insertAdjacentHTML('afterbegin', `<li class='list-group-item todo-item' style='padding:10px'>${task}<a class="done-item secondary-content" style="color:green"><i class="fa fa-check" aria-hidden="true"></i><a class="delete-item secondary-content"><i class="fa fa-remove"></i>`)
    })
    console.log(tasks)
}
function getDoneTasks(){
    let doneTasks;
    if (localStorage.getItem('done-tasks') === null) {
        doneTasks = [];
    } else {
        doneTasks = JSON.parse(localStorage.getItem('done-tasks'));
    }

    doneTasks.forEach(function(doneTask) {
        doneTaskList.insertAdjacentHTML('afterbegin', `<li class='list-group-item done-item' style='padding:10px; opacity:0.6'>${doneTask}<a class="back-todo secondary-content"><i class="fa fa-arrow-left" aria-hidden="true"></i><a class="delete-done-item secondary-content"><i class="fa fa-remove"></i>`)
    })
}


function addTask(e){
    const newTask = inputField.value

    if (newTask !== ''){
    taskList.insertAdjacentHTML('afterbegin', `<li class='list-group-item todo-item' style='padding:10px'>${newTask}<a class="done-item secondary-content" style="color:green"><i class="fa fa-check" aria-hidden="true"></i><a class="delete-item secondary-content"><i class="fa fa-remove"></i>`);
    console.log(newTask);
    storeTask(inputField.value)
    inputField.value = ''; 

    } else {
    $.alert({
        icon: 'fa fa-frown-o',
        type: 'orange',
        title: 'Oh no',
        content: 'You forgot to add a task!',
    });
    e.preventDefault()
    }
}

function storeTask(newTask){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 

    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function filterTasks(){

    const filterValue = filterInput.value.toUpperCase();

    document.querySelectorAll('.todo-item').forEach(function (task){
    const item = task.firstChild.textContent
        if (item.toUpperCase().includes(filterValue)) {
          task.style.display = "";
        } else {
        task.style.display = "none";
        }
      
    })
    }

    function filterDoneTasks(){

        const filterDoneValue = filterDoneInput.value.toUpperCase();
    
        document.querySelectorAll('.done-item').forEach(function (doneTask){
        const doneItem = doneTask.firstChild.textContent
            if (doneItem.toUpperCase().includes(filterDoneValue)) {
                doneTask.style.display = "";
            } else {
                doneTask.style.display = "none";
            }
          
        })
        }


function deleteTask(e){

    if (e.target.className === 'fa fa-remove' && e.target.parentElement.parentElement.classList.contains('todo-item')){
        $.confirm({
            icon: 'fa fa-warning',
            title: 'Just making sure',
            content: 'Are you sure you want to delete this task?',
            type: 'red',
            buttons: {
                confirm: function () {
                    $.alert('Task deleted');
                    e.target.parentElement.parentElement.remove();
                    deleteFromStorage(e.target.parentElement.parentElement);
                },
                cancel: function () {
                // canceled
                }
            }
        });
}
}

function moveToDone(e){

    if (e.target.className === 'fa fa-check' && e.target.parentElement.parentElement.classList.contains('todo-item')){
        console.log('moving to done')
        addToDone(e.target.parentElement.parentElement)
        e.target.parentElement.parentElement.remove();
        deleteFromStorage(e.target.parentElement.parentElement);
        }
        
    } 

function deleteDoneTask(e){

    if (e.target.className === 'fa fa-remove' && e.target.parentElement.parentElement.classList.contains('done-item')){
        $.confirm({
            icon: 'fa fa-warning',
            title: 'Just making sure',
            content: 'Are you sure you want to delete this task?',
            type: 'red',
            buttons: {
                confirm: function () {
                    $.alert('Task deleted');
                    e.target.parentElement.parentElement.remove();
                    deleteFromDoneStorage(e.target.parentElement.parentElement);
                },
                cancel: function () {
                // canceled
                }
            }
        });
}

    }

function backToTodo(e){

    if (e.target.className === 'fa fa-arrow-left' && e.target.parentElement.parentElement.classList.contains('done-item')){
        console.log('back to todo')
            e.target.parentElement.parentElement.remove();
            deleteFromDoneStorage(e.target.parentElement.parentElement);
            addToTodo(e.target.parentElement.parentElement)
        }
        
    } 

function addToDone(taskItem){
    const doneTask = taskItem.textContent
    console.log(doneTask);
    console.log(taskItem);

    doneTaskList.insertAdjacentHTML('afterbegin', `<li class='list-group-item done-item' style='padding:10px; opacity:0.6'>${doneTask}<a class="back-todo secondary-content"><i class="fa fa-arrow-left" aria-hidden="true"></i><a class="delete-done-item secondary-content"><i class="fa fa-remove"></i>`);
    
    let doneTasks;
        if (localStorage.getItem('done-tasks') === null) {
            doneTasks = [];
        } else {
            doneTasks = JSON.parse(localStorage.getItem('done-tasks'));
        } 
    console.log(doneTasks)
        doneTasks.push(doneTask);
    
        localStorage.setItem('done-tasks', JSON.stringify(doneTasks));
    }

    function addToTodo(taskItem){
        const todoTask = taskItem.textContent
        console.log(todoTask);
        console.log(taskItem);
    
        taskList.insertAdjacentHTML('afterbegin', `<li class='list-group-item todo-item' style='padding:10px'>${todoTask}<a class="done-item secondary-content" style="color:green"><i class="fa fa-check" aria-hidden="true"></i><a class="delete-item secondary-content"><i class="fa fa-remove"></i>`);

        let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 

    tasks.push(todoTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
        }


        

function deleteFromStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
        tasks.splice (index,1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    });
}

function deleteFromDoneStorage(doneTaskItem){
    let doneTasks;
    if (localStorage.getItem('done-tasks') === null) {
        doneTasks = [];
    } else {
        doneTasks = JSON.parse(localStorage.getItem('done-tasks'));
    }
    doneTasks.forEach(function (doneTask, index) {
    if (doneTaskItem.textContent === doneTask) {
        doneTasks.splice (index,1);
        localStorage.setItem('done-tasks', JSON.stringify(doneTasks));
    }

    });
}

function clearTasks(e){
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Just making sure',
        content: 'Are you sure you want to delete all tasks?',
        type: 'red',
        buttons: {
            confirm: function () {
                $.alert('Tasks deleted');
                taskList.innerHTML = ''
                localStorage.removeItem('tasks');
            },
            cancel: function () {
            // canceled
            }
        }
    });
    e.preventDefault()
}
    
function clearDoneTasks(e){
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Just making sure',
        content: 'Are you sure you want to delete all tasks?',
        type: 'red',
        buttons: {
            confirm: function () {
                $.alert('Tasks deleted');
                doneTaskList.innerHTML = ''
                localStorage.removeItem('done-tasks');
            },
            cancel: function () {
            // canceled
            }
        }
    });
    e.preventDefault()
}





