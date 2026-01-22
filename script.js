const input = document.getElementById("input");
const AddBtn = document.getElementById("Add-btn");
const AddList = document.querySelector(".todo_list");

let ReplaceTodos = null;
function AddTodos() {
  if (input.value === "") {
    alert("Please write something !");
    return;
  }
  if (AddBtn.value === "Edit") {
    let oldValue = ReplaceTodos.target.previousElementSibling.innerText;
    ReplaceTodos.target.previousElementSibling.innerText = input.value;
    EditTodos(oldValue);
    AddBtn.value = "Add";
    input.value = "";
  } else {
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML = input.value;
    li.appendChild(p);
    let EditBtn = document.createElement("button");
    EditBtn.innerText = "Edit";
    EditBtn.classList.add("Edit-Btn", "List-Btn");
    li.appendChild(EditBtn);
    let DeleteBtn = document.createElement("button");
    DeleteBtn.innerText = "Remove";
    DeleteBtn.classList.add("Delete-Btn", "List-Btn");
    li.appendChild(DeleteBtn);
    AddList.appendChild(li);
    SaveTodos(input.value);
    input.value = "";
  }
}
function editTodos(e) {
  if (e.target.innerHTML === "Remove") {
    e.target.parentElement.remove();
    DeleteTodos(e.target.parentElement);
  }
  if (e.target.innerHTML === "Edit") {
    input.value = e.target.previousElementSibling.innerText;
    input.focus();
    AddBtn.value = "Edit";
    ReplaceTodos = e;
  }
}
function SaveTodos(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function updateTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML = todo;
    li.appendChild(p);
    let EditBtn = document.createElement("button");
    EditBtn.innerText = "Edit";
    EditBtn.classList.add("Edit-Btn", "List-Btn");
    li.appendChild(EditBtn);
    let DeleteBtn = document.createElement("button");
    DeleteBtn.innerText = "Remove";
    DeleteBtn.classList.add("Delete-Btn", "List-Btn");
    li.appendChild(DeleteBtn);
    AddList.appendChild(li);
  });
}
function EditTodos(oldValue) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let index = todos.indexOf(oldValue);
  todos[index] = input.value;
  localStorage.setItem("todos", JSON.stringify(todos));
}
function DeleteTodos(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todoText = todo.firstElementChild.innerHTML;
  todos = todos.filter(t => t !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}
document.addEventListener("DOMContentLoaded", updateTodos);
AddBtn.addEventListener("click", AddTodos);
AddList.addEventListener("click", editTodos);
input.addEventListener('keypress',(e)=>{
  if(e.key === 'Enter'){
    AddTodos();
  }
})
