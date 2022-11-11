// //Skeleton Class for getting up and running

// class Todo {
//   constructor() {
//     this.todos = [];
//   }
//   //To add: Only value, generate id
//   addTodo(value) {}

//   //To delete: we will get id
//   deleteTodo(id) {}

//   //To update: id and value
//   updateTodo(id, value) {}

//   isEmpty() {} -> Check if the todos is empty
//
//   getTodos(){} -> This is to retrieve all the todos to display it

//   setTodos(todo){} -> set thet todos from localStorage upon page reload
// }

class Todo {
  constructor() {
    this.todos = [];
  }
  //To add: Only value, generate id
  //Why is parseInt better than Math.floor while generating a random number?
  addTodo(value) {
    this.todos.push({
      id: parseInt(Math.random() * 1000).toString(),
      value,
    });
  }

  //To delete: we will get id
  //filter out all todo whose id is not equal to given id
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  //To update: id and value
  //Map over all todos and find the todo with given id and update the value
  updateTodo(id, value) {
    // const found = array1.find((element) => element > 10);
    // const todoItem = this.todos.find((todo) => todo.id === id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    // todoItem.value = value;
    this.todos.push({ id, value });
    // this.todos = this.todos.map((todo) => {
    //   if (todo.id === id) return { id, value };
    //   return todo;
    // });
  }

  //When we load the page initially we will not have any todo, so we need to show this
  //check todos length if its falsy then it is empty
  isEmpty() {
    return this.todos.length ? false : true;
  }

  getTodos() {
    return this.todos;
  }

  setTodos(todos) {
    this.todos = todos;
  }
}
