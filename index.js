//Write addTodo function which adds a toDo if not empty and alerts if empty -> renderList post
//renderList Function : Clear Container -> create element in nested order -> append elements in nested order
//emptyNode : use while to clear the parent's first Child
// handleClick ->

const todo = new Todo();

const todoInput = document.querySelector("#getTodoInput");
const todoListContainer = document.querySelector("#todoListContainer");
const key = "todoStorage";

// Setting key in localStorage with stringified version of todos array
const updateLocalStorage = () => {
  localStorage.setItem(key, JSON.stringify(todo.getTodos()));
};

// Logic to empty todoContainer before rendering a list of todos
const emptyNode = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const emptyTodoInput = () => {
  todoInput.value = "";
};

const renderList = () => {
  emptyNode(todoListContainer);
  todo.getTodos().map((todo) => {
    const LI = document.createElement("li");
    const DIV = document.createElement("div");
    const INPUT = document.createElement("input");
    const SPAN = document.createElement("span");

    DIV.classList.add("inputBox");

    INPUT.type = "text";
    INPUT.value = todo.value;
    // This ensures that the rendered todo is by default disabled to edit -> doubleClick
    INPUT.setAttribute("disabled", "");
    // adding input + id because we will have 2 id's of same name
    INPUT.setAttribute("id", `input${todo.id}`);
    INPUT.setAttribute("onkeyup", "onInputEdit(event)");

    SPAN.classList.add("crossIcon");
    SPAN.innerText = "X";
    //can make use of event bubbling or event capture to remove elements -> useful for deleting the element
    SPAN.setAttribute("id", todo.id);

    //append 2 childs inside div
    DIV.appendChild(INPUT);
    DIV.appendChild(SPAN);

    //Append div to li
    LI.appendChild(DIV);
    //Append li to container
    todoListContainer.appendChild(LI);
  });
  updateLocalStorage();
};

//Check value : if empty alert else add it to the toDo
function addTodo() {
  const inputValue = todoInput.value;
  if (inputValue === "") {
    alert("Enter text to add to Todo List");
    return;
  }
  todo.addTodo(inputValue);
  emptyTodoInput();
  renderList();
}

// Check console for event.target -> id, nodeName -> id should appear when we click span
// Option to clean code here by assiging variables to id and nodeName
// Potential bug and bug fix : in the addTodo of class append .toString()
function handleDelete(e) {
  console.log(e);
  if (e && e.target && e.target.id && e.target.nodeName === "SPAN") {
    todo.deleteTodo(e.target.id);
    renderList();
  }
}

function handleEdit(e) {
  console.log(e);
  const id = e.target.id;
  if (!id) return;
  const inputBox = document.querySelector("#" + id);
  //   using remove Attribute to remove disabled
  inputBox.removeAttribute("disabled");
}

function onInputEdit(e) {
  // Check for the key pressed in console -> event.target.id
  console.log(e);
  if (e.key !== "Enter") return;
  //here id will not match : you will have to append .slice(5)
  const id = e.target.id.slice(5);
  console.log(todo, id);
  if (!id) return;
  const value = e.target.value;
  todo.updateTodo(id, value);
  renderList();
}

// When the page is refreshed we can use a immediately invoked function to set the todos array to
// whatever is present in the local storage

(() => {
  const localTodos = localStorage.getItem(key);
  if (localTodos) {
    todo.setTodos(JSON.parse(localTodos));
    renderList();
  }
})();
