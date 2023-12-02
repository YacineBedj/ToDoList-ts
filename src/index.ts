let input = document.querySelector<HTMLInputElement>("input[type='text']");
let add = document.querySelector<HTMLInputElement>("input[type='submit']")
let list = document.getElementById("ul");

type Task = {
  id:number,
  titel:string,
  done:boolean,
  date:Date,
}
let tasks:Task[]= loadData();
tasks.forEach(addItem)

add?.addEventListener("click",(e)=>{
  e.preventDefault()
  if(input?.value){
    let newTask:Task={
      id: tasks.length,
      titel: input?.value,
      done:false,
      date:new Date(),
    }
    tasks.push(newTask)
    localStorage.setItem("TasksArray", JSON.stringify(tasks))
    addItem(newTask);
    input.value = "";
  }
})

function addItem(task:Task){
  let li = document.createElement("li");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("id", `${task.id}`) 
  let label = document.createElement("label");
  let text = document.createTextNode(task.titel)
  label.appendChild(text);
  label.setAttribute("for", `${task.id}`)
  li.appendChild(checkbox)
  li.appendChild(label)
  list?.appendChild(li);
  li.addEventListener("click", ()=>{
    li.remove();
    let updateTasks:any = [];
    tasks.forEach((oldTask)=>{
      if(oldTask.id != task.id) updateTasks.push(oldTask);
    })
    tasks = updateTasks;
    localStorage.setItem("TasksArray", JSON.stringify(tasks))
  })
}
function loadData(){
  let data = localStorage.getItem("TasksArray");
  if(data === null){
   return [];
  }else{  
    return JSON.parse(data);
  }
}