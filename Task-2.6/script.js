const pushText = document.querySelector('#push')
const inputText = document.querySelector('#input_text')
const tasks = document.querySelector('#tasks')
const button = document.getElementById('button')
const deleteElements = document.querySelector('.container_tasks')

const todosFromLocalStorage = JSON.parse(window.localStorage.getItem('todos'))
let todos = []

if (todosFromLocalStorage && todosFromLocalStorage.length > 0) {
  todos = todosFromLocalStorage
}

const addToLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const saveNewNameToLocalStorage = (id, taskName) => {
  todos.map((item) => {
    if (item.id === id) {
      item.name = taskName.innerText
    }
    return item
  })
  addToLocalStorage()
}

const editTextAndEnterFocus = (edit, taskName, id) => {
  const save = edit.parentElement.querySelector('.disks')
  taskName.setAttribute('contentEditable', true)
  edit.classList.add('hidden')
  save.classList.remove('hidden')
  taskName.focus()
  save.addEventListener('click', () => saveNewNameToLocalStorage(id, taskName))
}

const taskDivAdd = (name, id) => {
  const task = document.createElement('div')
  task.className = 'task'
  task.innerHTML = `
              <span class="taskname">
                  ${name}
              </span>
              <button class="delete">
                  <i class="far fa-trash-alt"></i>
              </button>
              <button class="edit" type="submit">
                  <i class="far fa-edit"></i>
              </button>
              <button class="disks hidden" type="submit">
                    <i class="far fa-save"></i>
              </button>`
  const edit = task.querySelector('.edit')
  const taskName = task.querySelector('.taskname')
  tasks.appendChild(task)
  edit.addEventListener('click', () =>
    editTextAndEnterFocus(edit, taskName, id),
  )
}


const addToDoList = () => {
  if (inputText.value.length === 0) {
    alert('Please Enter a Task')
  } else {
    const todo = {
      id: new Date().toLocaleString('ru-RU'),
      name: inputText.value,
    }
    taskDivAdd(inputText.value)
    todos.push(todo)
    addToLocalStorage()
    inputText.value = ''
    const current_task = document.querySelectorAll('.delete')
    for (let i = 0; i < current_task.length; i++) {
      current_task[i].onclick = function () {
        this.parentNode.remove()
      }
    }
  }
}

pushText.addEventListener('click', addToDoList)

const deleteAllItems = () => {
  todos = []
  tasks.innerHTML = ''
  inputText.value = ''
  window.localStorage.clear()
}

button.addEventListener('click', deleteAllItems)


todosFromLocalStorage.forEach((item) => {
  taskDivAdd(item.name, item.id)
})