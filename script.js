let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter(){

    let total = tasks.length;

    let completed = tasks.filter(task => task.done).length;

    let remaining = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("remainingTasks").textContent = remaining;

}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if(task.done){
            li.classList.add("done");
        }

        li.textContent = "📚 " + task.description + " ";
        

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.onclick = () => markDone(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateCounter();
}

function addTask(){

    let text = taskInput.value.trim();

    if(text === ""){
        return;
    }

    tasks.push({
        description: text,
        done: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

function markDone(index){

    tasks[index].done = !tasks[index].done;

    saveTasks();
    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    renderTasks();
}

renderTasks();