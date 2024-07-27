const toDo = [{
  name:'Wash', dueDate: '2022,12,22'},{name:'hair', dueDate: '2022-12-22'}];

renderToDo();

function renderToDo(){
  let toDoHTML = '';

  for(let i = 0;i<toDo.length;i++){
    const toDoListObject = toDo[i];
    /*Destructuring the object*/
    const { name, dueDate } = toDoListObject;
    const html = `
    <div>${name}</div> 
    <div>${dueDate}</div>
    <button onclick="
      toDo.splice(${i}, 1);
      renderToDo();
    " class="delete-todo-button">Delete</button>
    `;
    toDoHTML+= html;
  }
  /*What we do is loop through the array, add it into a variable and then pass that into a div*/
  document.querySelector('.js-todo-list').innerHTML = toDoHTML;
}


function addToDo(){
  const inputValue = document.querySelector('.js-name-input');
  const input = inputValue.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  toDo.push({
    name:input,
    /*shorthand only for due date as both object name and const is the same*/
    dueDate
  })

  inputValue.value='';
  renderToDo();
}