import _ from 'lodash';
import {task} from './another-module.js';

const main = document.querySelector('.main');

function createTodo (task){
  let todo = document.createElement('div');
  todo.classList.add('task')

  let left = document.createElement('div');
  let check = document.createElement('input');
  check.type = 'checkbox';
  left.appendChild(check);
  let title = document.createElement('div');
  title.textContent = task.title;
  left.append(title)
  todo.appendChild(left);

  let right = document.createElement('div')
  let date = document.createElement('div')
  date.textContent = task.dueDate;
  right.append(date)
  let icons = document.createElement('div')
  icons.classList.add('icons')
  let icon1 = document.createElement('img')
  icon1.src = './icons/delete.svg'
  icons.appendChild(icon1)
  let icon2 = document.createElement('img')
  icon2.src = './icons/edit.svg'
  icons.appendChild(icon2)
  right.appendChild(icons)
  todo.appendChild(right);

  todo.addEventListener('mouseover',()=>{icons.style.opacity = 1;})
  todo.addEventListener('mouseout',()=>{icons.style.opacity = 0;})
  main.append(todo)
}

let task1 = task();
createTodo(task1);