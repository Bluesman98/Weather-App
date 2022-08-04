import _, { curry } from 'lodash';
import {project, task, projectsList} from './another-module.js';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { te } from 'date-fns/locale';


const main = document.querySelector('.main');
const body = document.querySelector('body');

function createModal(){
  let modal = document.createElement('div')
  modal.classList.add('modal-background')
  modal_window_edit(modal)
  modal_window_new(modal)
  modal_project_edit(modal)
  modal_new_project(modal)
  modal_new_task(modal)
  body.appendChild(modal)
  return modal;
}
const handleSubmit = event => {
  // 👇️ prevent page refresh
  event.preventDefault();

  console.log('form submitted ✅');
};
function  modal_new_project (modal){
  let modal_window = document.createElement('form');
  modal_window.classList.add('modal-new-project','modal');
  modal_window.required = true;
  modal_window.onsubmit = handleSubmit
  modal.appendChild( modal_window);
  let name = document.createElement('div')
  name.textContent = "New Project"
  modal_window.appendChild(name)
  let title = document.createElement('input')
  title.type = 'textarea'
  title.required = true
  title.id = 'new-project-title'
  title.placeholder = "Project Title"
  modal_window.appendChild(title)

  let container = document.createElement('div')
  let confirm = document.createElement('button')
  confirm.classList.add('add-project')
  confirm.textContent = "Add Project"
  container.appendChild(confirm)
  let close = document.createElement('button');
  container.appendChild(close);
  close.textContent = "Cancel"
  close.classList.add('close');
  modal_window.appendChild(container)
}

function modal_new_task(modal){
  let modal_window = document.createElement('form');
  modal_window.classList.add('modal-new-task','modal');
  modal.appendChild( modal_window);
  modal_window.required = true;
  modal_window.onsubmit = handleSubmit
 
  let name = document.createElement('div')
  name.textContent = "New Task"
  modal_window.appendChild(name)
  let form = document.createElement('div')
  modal_window.appendChild(form)
  form.classList.add('new-task-form')
  let title = document.createElement('input')
  form.appendChild(title)
  title.type = 'text'
  title.required = true
  title.placeholder = 'Title'
  title.id = "new-title"

  let details = document.createElement('input')
  form.appendChild(details)
  details.type = 'text'
  details.placeholder = 'Details'
  details.id = 'new-details'

  let div = document.createElement('div')
  form.appendChild(div)
  let  dateLabel = document.createElement('label')
  div.appendChild(dateLabel)
  dateLabel.textContent = 'Due Date:'
  dateLabel.for = "new-date"
  let date = document.createElement('input')
  div.appendChild(date)
  date.required = true
  date.type = 'date'
  date.id = "new-date"

  let radio = document.createElement('div')
  let rlabel = document.createElement('label')
  radio.appendChild(rlabel)
  rlabel.textContent = "Priority:"
  form.appendChild(radio)
  for(let i=0; i< 3; i++){
    let input = document.createElement('input')
    let label = document.createElement('label')
    if(i==0) {
      input.checked = "checked"
      label.textContent ="Low"
    }
    if(i==1){
      label.textContent = "Medium"
    }
    if(i==2){
      label.textContent = "High"
    }
    input.id = `radio${i}`;
    input.type = 'radio'
    input.name = 'priority'
    input.value = i;

    label.htmlFor = i
    //label.textContent = i;
    label.name = 'priority'

    radio.append(input)
    input.append(label)
  }


  let confirm = document.createElement('button')
  let container = document.createElement('div')
  confirm.classList.add('add-task')
  confirm.textContent = "Add Task"
  container.appendChild(confirm)
  let close = document.createElement('button');
  container.appendChild(close);
  close.textContent = "Cancel"
  close.classList.add('close');
  modal_window.appendChild(container)
}

function modal_window_edit(modal) {
  let modal_window = document.createElement('form');
  modal_window.classList.add('modal-task-edit','modal');
  modal_window.onsubmit = handleSubmit
  let close = document.createElement('img');
  modal_window.appendChild(close);
  close.classList.add('close');
  close.src = './icons/window-close.svg';

  let title = document.createElement('textarea')
  title.id = 'title'
  title.placeholder = "Title"
  title.required = true
  modal_window.appendChild(title)

  let details = document.createElement('textarea')
  details.id = 'details'
  details.placeholder = "Details"
  modal_window.appendChild(details)

  let dateDiv = document.createElement('div')
  let dateLabel = document.createElement('label')
  dateLabel.textContent = "Due Date:"
  dateDiv.appendChild(dateLabel)
  let date = document.createElement('input')
  date.type = "date"
  date.id = 'date'
  date.required = true
  dateDiv.appendChild(date)
  modal_window.appendChild(dateDiv)
  
  let radio = document.createElement('div')
  let radioLabel = document.createElement('label')
  radioLabel.textContent = "Priority:"
  radio.appendChild(radioLabel)
  modal_window.appendChild(radio)
  for(let i=0; i< 3; i++){
    let input = document.createElement('input')
    let label = document.createElement('label')
    if(i==0) {
      input.checked = "checked"
      label.textContent ="Low"
    }
    if(i==1){
      label.textContent = "Medium"
    }
    if(i==2){
      label.textContent = "High"
    }
    input.id = `radio${i}`;
    input.type = 'radio'
    input.name = 'priority'
    input.value = i;

    label.htmlFor = i
    //label.textContent = i;
    label.name = 'priority'

    radio.append(input)
    input.append(label)
  }

  let confirm = document.createElement('button');
  confirm.textContent = "Confirm Edit";
  confirm.classList.add('confirm-button')
  modal_window.appendChild(confirm);

  modal.appendChild( modal_window);
}

function modal_window_new(modal){
  let modal_window = document.createElement('div');
  modal_window.classList.add('modal-window-new','modal');
  let close = document.createElement('img');
  modal_window.appendChild(close);
  close.classList.add('close');
  close.src = './icons/window-close.svg';
  modal.appendChild( modal_window);
}

function modal_project_edit(modal){
  let modal_window = document.createElement('div');
  modal_window.classList.add('modal-project-edit','modal');
  modal.appendChild( modal_window);

  let name = document.createElement('div')
  name.textContent = "Edit Project"
  modal_window.appendChild(name)
  let container = document.createElement('div')
  let label = document.createElement('div')
  label.textContent = "Name:"
  container.append(label)
  modal_window.appendChild(container)
  let title = document.createElement('textarea')
  title.classList.add('project-title')
  container.appendChild(title)
  let del = document.createElement('button')
  del.classList.add('project-delete')
  del.textContent = 'Delete'
  container.appendChild(del)

  let buttonCont = document.createElement('div')
  let confirm = document.createElement('button')
  confirm.classList.add('project-confirm')
  confirm.textContent = "Confirm"
  buttonCont.appendChild(confirm)
  let close = document.createElement('button');
  buttonCont.appendChild(close);
  close.textContent = "Cancel"
  close.classList.add('close');
  modal_window.appendChild(buttonCont)
}

function projectEdit(project){
  let newTitle = document.querySelector('.project-title');
  let temp =  projects.list[project.id]
  temp.title = newTitle.value;

  let window = modal.querySelector('.modal-project-edit')
  modal.classList.remove('modal-visible');
  window.classList.remove('modal-visible')
}


function closeModal(modal,className){
 let window = modal.querySelector(className)
  window.querySelector('.close').addEventListener('click',() =>{
    modal.classList.remove('modal-visible');
    window.classList.remove('modal-visible')
  })
}

function openModal(modal,classname){
  modal.classList.add('modal-visible')
  let window = modal.querySelector(classname)
  window.classList.add('modal-visible')

}

function createTodo (project,task){

  let  div = document.querySelector(`#project${project.id} > div`)
  
  let todo = document.createElement('div');
  todo.classList.add('task')
  todo.id = task.id
  div.appendChild(todo)

  let left = document.createElement('div');
  let check = document.createElement('input');
  check.type = 'checkbox';
  check.classList.add('checkbox')
  checkboxEvent(check,task,project,todo)
  left.appendChild(check);
  let title = document.createElement('div');
  title.classList.add('todo-title')
  title.textContent = task.title;
  left.append(title)
  todo.appendChild(left);

  let right = document.createElement('div')
  let date = document.createElement('div')
  date.classList.add('todo-date')
  date.textContent = task.dueDate;
  right.append(date)
  let icons = document.createElement('div')
  icons.classList.add('icons')
  let icon1 = document.createElement('img')
  icon1.src = './icons/delete.svg'
  icon1.classList.add('delete')
  icons.appendChild(icon1)
  let icon2 = document.createElement('img')
  icon2.src = './icons/edit.svg'
  icon2.classList.add('edit')
  icons.appendChild(icon2)
  right.appendChild(icons)
  todo.appendChild(right);

  todo.addEventListener('mouseover',()=>{icons.style.opacity = 1;})
  todo.addEventListener('mouseout',()=>{icons.style.opacity = 0;})

  priorityColor(task,todo)
  buttonEvents(project,todo,task);
  
}

function priorityColor(task,todo){

  if(task.priority == 0) {todo.style.borderLeftColor = "green"}
  else if(task.priority == 1){todo.style.borderLeftColor ="orange"}
  else if( task.priority == 2){todo.style.borderLeftColor = "red"}
}
function  buttonEvents(project,todo,task){

  todo.querySelector('.delete').addEventListener('click', (e)=>{
    console.log('remove')
    console.log(todo.id)
    e.target.parentElement.parentElement.parentElement.remove()
    if ((todo.id).length == 2) {
      let temp = projects.list[todo.id[0]]
      temp.todosList.splice(todo.id[1],1)
    }
    if ((todo.id).length == 1){
      let temp = projects.list[project.id]
      temp.todosList.splice(Number(todo.id),1)
      console.log(project.todosList)
    }

    saveLocal()
    restore()
    currentProject(project.id)
   })
    //let id = todo.id
    //if(id.length == 2) id = id[0]
  
   todo.querySelector('.edit').addEventListener('click',() => {
    openModal(modal, '.modal-task-edit');
    console.log('edit')
    let title = document.querySelector('#title');
    title.value = task.title;
    let details = document.querySelector('#details');
    details.value = task.description;
    let date = document.querySelector('#date');
    date.value = task.dueDate

    let priority;
    if (task.priority == 0) priority = document.querySelector('#radio0')  
    else if (task.priority == 1) priority = document.querySelector('#radio1')
    else priority = document.querySelector('#radio2')
    priority.checked = "checked"
    
    let button = document.querySelector('.confirm-button')
    button.onclick = () =>{
      if(document.querySelector('#title').value){
      confirmEdit(project,todo.id); 
      saveLocal()
      updateTodo(todo,task);
      console.log(projects)
      restore()
      currentProject(project.id)
      }
    }
    
  })
}


function checkboxEvent (checkbox,task,project,todo){
  if(task.checklist == true) {
    checkbox.checked = true; 
    todo.classList.add("task-complete")
    //todo.style.textDecoration = "line-through"
  }
  else {
    checkbox.checked = false
    todo.classList.remove("task-complete")
  }
  checkbox.addEventListener("change", (e) => {
    let temp = projects.list[project.id]
    let id = todo.id
    if ((todo.id).length == 2) {
       temp = projects.list[todo.id[0]]
       id = todo.id[1]
    }



    if (e.target.checked) {
      console.log("Checkbox is checked..");

      temp.todosList[id].checklist = true
      console.log(task)
    } 
    else {
      console.log("Checkbox is not checked..");
      temp.todosList[id].checklist = false
      console.log(task)
    }
    saveLocal();
    restore();
    currentProject(project.id)
  });

}
function confirmEdit(project,id){
  let task;
  console.log('LENGTH OF ID')
  console.log(id.length)
  if(id.length == 2) task = projects.list[id[0]].todosList[id[1]]
  else task = projects.list[project.id].todosList[id]
  
  task.title = document.querySelector('#title').value
  task.description = document.querySelector('#details').value
  task.dueDate = document.querySelector('#date').value
  task.priority = document.querySelector('input[name="priority"]:checked').value;

  let window = modal.querySelector('.modal-task-edit')
  modal.classList.remove('modal-visible');
  window.classList.remove('modal-visible')

}

function updateTodo(todo,task) {
  let title = todo.querySelector('.todo-title')
  title.textContent = task.title
  let date = todo.querySelector('.todo-date')
  date.textContent = task.dueDate
}

function createProject(project,projects){
  projects.add(project)
  let id =  project.id

  let projectDiv = document.createElement('div')
  let div = document.createElement('div')
  projectDiv.appendChild(div)
  document.querySelector('.main > div').appendChild(projectDiv)
  projectDiv.id = "project" + id
  projectDiv.classList.add('project')
  let ul = document.querySelector('ul +ul')
  let li = document.createElement('li')
  li.id = "li" + project.id
  li.addEventListener('click',() =>{
   /* let lis =  document.querySelectorAll('li')
    lis.forEach(lis  =>{
      lis.classList.remove('current-project')
      })*/
    let items =  document.querySelectorAll('.project')
    items.forEach(item  =>{
    item.classList.remove('project-visible')
    })
    restore()
    currentProject(project.id)
    let confirm = document.querySelector('.project-confirm')
    confirm.onclick = () =>{
        projectEdit(project)
        projectUpdate(project)
        saveLocal()
        restore()
        currentProject(project.id)
    }
      
    let deleteBtn = document.querySelector('.project-delete')
    deleteBtn.onclick = ()=>{
      console.log("project to delete")
      console.log(project)
      deleteProject(project)
      let window = modal.querySelector('.modal-project-edit')
      modal.classList.remove('modal-visible');
      window.classList.remove('modal-visible')
       saveLocal()
       restore()
    }
  })
  ul.append(li)
 li.textContent = project.title
  addTask(project);
 

}
 function projectButton (project) {
  let btn = document.createElement('button')
  let projectDiv = document.querySelector(`#project${project.id} > div`)
  projectDiv.appendChild(btn)
  btn.classList.add('edit-project')
  btn.textContent= project.title
  btn.onclick = () =>{
    openModal(modal,'.modal-project-edit')
    title = document.querySelector('.project-title')
    title.value = project.title
    saveLocal();
  }
  closeModal(modal,'.modal-project-edit')
}

function projectUpdate(project){  
  let id = project.id
  let li = document.querySelector(`ul + ul>li:nth-child(${Number(id+1)})`) 
  li.textContent = project.title
  let btn = document.querySelector(`#project${project.id}>div>button`)
 
  btn.textContent = project.title
}
function deleteProject(project){
  console.log(project)
  let projectDiv = document.querySelector(`#project${project.id}`)
  let div = document.querySelector('.project-container')
  div.removeChild(projectDiv)
  projects.remove(project.id)
  let li = document.querySelector(`#li${project.id}`)
  li.remove()
  console.log(projects.list)
}

const addProject = function(){
  let sidebar = document.querySelector('.sidebar')
  let btn = document.createElement('div')
  let div = document.createElement('div')
  div.textContent = "+"
  btn.appendChild(div)
  let div2 = document.createElement('div')
  div2.textContent = "Add Project"
  btn.appendChild(div2)
  sidebar.appendChild(btn)

  btn.addEventListener('click', () =>{
    openModal(modal,'.modal-new-project')
    closeModal(modal,'.modal-new-project')

    let add = document.querySelector('.add-project')
    add.onclick =  () => {
      let title = document.querySelector('#new-project-title')
      if (title.value != '') {
        let temp = newProject(title.value)
        let window = modal.querySelector('.modal-new-project')
        modal.classList.remove('modal-visible');
        window.classList.remove('modal-visible');
        title.value = ''

        console.log("ID")
        console.log(temp.id)

        saveLocal();
        restore();
        currentProject(temp.id)
        
      }

    }
  })
}

function newProject (title){
  let x = project()
  x.title = title
  createProject(x,projects)
  projectButton(x)

  return x;
}

const addTask = function(project){
  let div = document.createElement('div')
  let projectDiv = document.querySelector(`#project${project.id} `)
  projectDiv.appendChild(div)
  let btn = document.createElement('button')
  btn.classList.add('new-task')
  let btnDiv = document.createElement('div')
  btnDiv.textContent = "+"
  btn.appendChild(btnDiv)
  div.appendChild(btn)
  btn.onclick = () =>{
    console.log("current Project")
    console.log(project)
   openModal(modal,'.modal-new-task')
   closeModal(modal,'.modal-new-task')
   let confirm = document.querySelector('.add-task')
   confirm.onclick = () =>{
    newTask(project)

   }

    }
  }


function newTask(project) {
  console.log(project)
  let title = document.getElementById('new-title').value
  let details = document.getElementById('new-details').value
  let date = document.getElementById('new-date').value
  let priority = document.querySelector('input[name="priority"]:checked').value;

  if(title != '' && date != ''){
    let new_task = task()
    new_task.id = project.todosList.length
    new_task.title = title
    new_task.description = details
    new_task.dueDate = date
    new_task.priority = priority
    projects.list[project.id].todosList.push(new_task)
    createTodo(project,new_task)
    console.log('add')
    let window = modal.querySelector('.modal-new-task')
    modal.classList.remove('modal-visible');
    window.classList.remove('modal-visible');

    document.getElementById('new-title').value = ''
    document.getElementById('new-details').value = ''
    document.getElementById('new-date').value = ''
    document.querySelector('input[name="priority"]:checked').value = ''

    saveLocal()
    restore()
    currentProject(project.id)
  }
}

function saveLocal() {
  localStorage.setItem(`projects`, JSON.stringify(projects));
}

function restore() {
  let retrievedObject = localStorage.getItem(`projects`);
  retrievedObject = JSON.parse(retrievedObject);

  if(retrievedObject != null){
  let ul = document.querySelectorAll('ul')
  ul.forEach(e =>removeAllChildNodes(e))
  let projectContainer = document.querySelector('.project-container')
  removeAllChildNodes(projectContainer)}

  let list = projectsList()
  let allTasks = project()
  if(retrievedObject !== null){
  for(let i=0;i < retrievedObject.list.length; i++ ){
    let temp = project()
    temp.title = retrievedObject.list[i].title
    temp.id = retrievedObject.list[i].id
    temp.todosList = JSON.parse(JSON.stringify(retrievedObject.list[i].todosList))
    createProject(temp,list)
    projectButton(temp)
    let tasks = temp.todosList

    for(let j=0; j < tasks.length; j++){
      tasks[j].id=j
      createTodo(temp,tasks[j])
      tasks[j].id=`${i}${j}`
      allTasks.add(tasks[j])
    }
  }
  let [home,week,today] =sort(allTasks)
  createStandardProject(home,'Home')
  createStandardProject(today,'Today')
  createStandardProject(week,'Week')
}
return list
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function sort (taskList){
  taskList.todosList.sort(function compare(a, b) {
    var dateA = new Date(a.dueDate);
    var dateB = new Date(b.dueDate);
    return dateA - dateB;
  });
  let dates = []
  for(let item in taskList.todosList){
    dates.push(new Date(taskList.todosList[item].dueDate))
  }
  let home = taskList.todosList

  let week = filterDatesByCurrentWeek(dates)
  week = getArray(taskList.todosList,filterByDates(dates,week))


  let today = filterDatesByToday(dates)
  today = getArray(taskList.todosList,filterByDates(dates,today))

  return [home,week,today];
}
function filterByDates(dates,other){
  let index = []
  for(let item in dates){
    for(let date in other){
      if (dates[item] == other[date]){
        index.push(item)
      }
    }
  }
  return index

}

function getArray(array,index){
  let newArray = []

  for (let i = 0; i < index.length; i++){
    for (let j = 0; i < array.length; j++){
      if(i==j) {
        newArray.push(array[j]);
        break;
      }
    }
  }
  return newArray
}
function getWeekDates() {
  let start = getMondayOfCurrentWeek()
  start.setHours(0, 0, 0, 0);


  let end = new Date(start); //copy
  end.setDate(end.getDate() + 7)
  end.setHours(0, 0, 0, 0);

  return [start, end];
}

function filterDatesByCurrentWeek(dates){
  let [start, end] = getWeekDates();
  return dates.filter(d => +d >= +start && +d < +end);
}
function getMondayOfCurrentWeek() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;

  const monday = new Date(today.setDate(first));
  return monday;
}

function getTodayDate() {

  let now = new Date();
  let dayOfWeek = now.getDay(); //0-6
  let numDay = now.getDate();

  let start = new Date(now); //copy
  start.setDate(numDay);
  start.setHours(0, 0, 0, 0);


  let end = new Date(now); //copy
  end.setDate(numDay);
  end.setHours(23, 59, 59, 0);

  return [start, end];
}

function filterDatesByToday(dates){
  let [start, end] = getTodayDate();
  return dates.filter(d => +d >= +start && +d < +end)
}

function createStandardProject(taskList,string){
  let home = project()
  home.id = string
  home.title = string
  let list = projectsList()
  standardProject(home,string)

 
  for (let i = 0; i < taskList.length; i++){
    createTodo(home,taskList[i])
  }
 
}
function standardProject(project,string){
  project.id = string
  let id =  project.id
  let projectDiv = document.createElement('div')
  let div = document.createElement('div')
  projectDiv.appendChild(div)
  document.querySelector('.main > div').appendChild(projectDiv)
  projectDiv.id = "project" + string
  projectDiv.classList.add('project')
  let ul = document.querySelector('ul')
  let li = document.createElement('li')
  
  li.id = "li" + project.id
  let i = document.createElement('i')
  if (project.id == "Home")i.classList.add("fa-house","fa-solid")
  if (project.id == "Today")i.classList.add("fa-solid", "fa-calendar-day")
  if (project.id == "Week")i.classList.add("fa-solid", "fa-calendar-week")
  li.appendChild(i)
  li.innerHTML += project.title
  li.addEventListener('click',() =>{
    /*let lis =  document.querySelectorAll('li')
    lis.forEach(lis  =>{
      lis.classList.remove('current-project')
      })
    let items =  document.querySelectorAll('.project')
    items.forEach(item  =>{
    item.classList.remove('project-visible')
    })*/
    restore()
    currentProject(project.id)
    //li.classList.add('current-project')
      
  })
  ul.append(li)


}

function currentProject(id){
  console.log(document.querySelector(`#project${id}`))
  if(document.querySelector(`#project${id}`)!=null){
  console.log(projects.list)
  let currentProject = document.querySelector(`#project${id}`)
  currentProject.classList.add('project-visible')
  let li = document.querySelector(`#li${id}`)
  li.classList.add('current-project')
  }
}
//.....................//
const modal = createModal();
closeModal(modal,'.modal-task-edit',);


const projects = restore();
if ( document.querySelector(`#projectHome`)){
currentProject(`Home`)

}
addProject();
