import _, { add, remove } from 'lodash';

function task (){
    return{
    title: 'wash dishes',
    description: 'bla bla bla',
    dueDate: 'MM/dd/yy',
    priority: 0,
    checklist: false,
    id: -1
    }
}

function project(){
    let todosList =[]
    return{
        id : 'none',
        title: "project1",
        todosList,
        add(task){
            todosList.push(task);
        },

        remove(index){
            todosList.splice(index,1)
        }
    }
    
}

function projectsList(){
    let list = []
    let counter = 0;
    return{
        list,

        add(project){
            list.push(project)
            project.id = counter;
            counter++
        },

        remove(index){
            list.splice(index,1)
        }
    }
}

export  {
    task,
    project,
    projectsList
  };

