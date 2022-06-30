import _, { add, remove } from 'lodash';

function task (){
    return{
    title: 'wash dishes',
    description: 'bla bla bla',
    dueDate: 'MM/dd/yy',
    priority: 0,
    checklist: false
    }
}

function project(){
    let todosList =[]
    return{
        title: "New Project",
        todosList,

        add(task){
            todosList.push(task);
        },

        remove(index){
            todosList.splice(index,1)
        }
    }
    
}

export  {
    task,
    project
  };

