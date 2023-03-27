// Model
let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'));
let isEditing = false;

if (Array.isArray(savedTodos)) {
	todos = savedTodos;
} else {
	todos = [{
		id: 'id1',
		title: 'Get groceries',
		dueDate: '29.03.2023',
		isDone: false,
		isEditing: false
	}, {
		id: 'id2',
		title: 'Wash car',
		dueDate: '21.03.2023',
		isDone: false,
		isEditing: false
	}, {
		id: 'id3',
		title: 'Tennis',
		dueDate: '30.03.2023', 
		isDone: false,
		isEditing: false
	}];
}

// Creates a todo
function createTodo(title, dueDate) {
	const id = '' + Date.now();
	todos.push({
		id: id,
		title: title,
		dueDate: dueDate,
		isDone: false,
		isEditing: false
	});

	saveTodos();
}

// Deletes a todo
function removeTodo(idToDelete) {
	todos = todos.filter(todo => {
		return todo.id !== idToDelete;
	});
	
	saveTodos();
}

// Update isDone of a todo
function changeTodoState(idToUpdate, stateToSet) {
	todos.forEach(element => {
		if (element.id === idToUpdate) element.isDone = stateToSet;
	});

	saveTodos();
}

function editTodoProperties(newTitle, newDueDate) {
	for (element of todos) {
		if (element.isEditing) {
			if (newTitle) element.title = newTitle;
			if (newDueDate) element.dueDate = newDueDate;
		};
	}
	saveTodos();
}

function changeTodoIsEditingProperty(idTodo, isEditing) {
	todos.forEach(element => {
		if (element.id === idTodo) element.isEditing = isEditing;
	});
}

function convertDate(date) {
	let splitter;
	let joiner;
	if (date.includes('.')) {
		splitter = '.';
		joiner = '-';
	} else {
		splitter = '-';
		joiner = '.';
	}
	let dateArr = date.split(splitter);
	return dateArr.reverse().join(joiner);
}

function resetTodoisEditing() {
	todos.forEach(element => {
		if (element.isEditing) element.isEditing = false;
	});
}

function getEditTodoTitle() {
	for (element of todos) {
		if (element.isEditing) return [element.title, element.dueDate];
	}
	return null;
}

function saveTodos() {
	localStorage.setItem('todos', JSON.stringify(todos));
}

// Controller
function addTodo () {
	const inputValue = document.querySelector('#todo-title');
	const title = inputValue.value;
	const datePicker = document.querySelector('#date-picker');
	const dueDate = datePicker.value;
	const isDone = false;

	createTodo(title, dueDate, isDone);
	render();
}

function deleteTodo(event) {
	const deleteButton = event.target;
	const idToDelete = deleteButton.id;

	removeTodo(idToDelete);
	render();
}

function setTodoState(event) {
	const checkbox = event.target;
	const idToUpdate = checkbox.id;
	const stateToSet = checkbox.checked;
	
	changeTodoState(idToUpdate, stateToSet);
	render();
}

function editTodo(event) {
	const editButton = event.target;
	const idTodo = editButton.id;

	changeTodoIsEditingProperty(idTodo, true);
	isEditing = true;
	render();
}

function cancelEdit() {
	resetTodoisEditing();
	isEditing = false;
	render();
}

function updateEdit() {
	const newTitle = document.querySelector('#edit-title-input').value;
	const newDueDate = document.querySelector('#edit-date-input').value;
	
	editTodoProperties(newTitle, newDueDate);
	resetTodoisEditing();
	isEditing = false;
	render();
}

// View
function render () {
	if (isEditing) {
		hideHtmlElement('#todo-overview');
		unhideHtmlElement('#todo-edit');
		
		const editTitleElement = document.querySelector('#edit-title');
		editTitleElement.innerText = getEditTodoTitle()[0] + ' ' + getEditTodoTitle()[1];

		const editTitleInput = document.querySelector('#edit-title-input');
		editTitleInput.placeholder = getEditTodoTitle()[0];

		const editDueDateInput = document.querySelector('#edit-date-input');
		editDueDateInput.value = getEditTodoTitle()[1];

		const editCancelButton = document.querySelector('#edit-cancel-button');
		editCancelButton.onclick = cancelEdit;

		const editUpdateButton = document.querySelector('#edit-update-button');
		editUpdateButton.onclick = updateEdit;
		
	} else {
		document.querySelector('#todo-list').innerHTML = '';
		hideHtmlElement('#todo-edit');
		unhideHtmlElement('#todo-overview');
		todos.forEach(todo => {
			const element = document.createElement('div');
			element.className = 'todo-row';

			const elementPTitle = document.createElement('p');
			elementPTitle.innerText = todo.title;
			elementPTitle.className = 'todo-title';
			element.appendChild(elementPTitle);
			
			const elementPDate = document.createElement('p');
			elementPDate.innerText = convertDate(todo.dueDate);
			elementPDate.className = 'todo-date';
			element.appendChild(elementPDate);

			const checkBoxTodo = document.createElement('input');
			checkBoxTodo.type = 'checkbox';
			checkBoxTodo.className = 'todo-checkbox';
			checkBoxTodo.checked = todo.isDone;
			checkBoxTodo.onchange = setTodoState;
			checkBoxTodo.id = todo.id;
			element.prepend(checkBoxTodo);
			
			const editButton = document.createElement('button');
			editButton.style = 'font-size: 14px; margin-left: 10px; padding: 2px;';
			editButton.onclick = editTodo;
			editButton.id = todo.id;
			element.appendChild(editButton);

			const editIcon = document.createElement('img');
			editIcon.src = 'images/icon-edit.png';
			editIcon.className = 'button-icons';
			editIcon.onclick = editTodo;
			editButton.appendChild(editIcon);
			
			const deleteButton = document.createElement('button');
			deleteButton.style = 'font-size: 14px; margin-left: 10px; padding: 2px;';
			deleteButton.onclick = deleteTodo;
			deleteButton.id = todo.id;
			element.appendChild(deleteButton);
			
			const deleteIcon = document.createElement('img');
			deleteIcon.src = 'images/icon-delete.png';
			deleteIcon.className = 'button-icons';
			deleteIcon.onclick = deleteTodo;
			deleteButton.appendChild(deleteIcon);

			const todoList = document.querySelector('#todo-list');
			todoList.appendChild(element);
		});
	}
}

function hideHtmlElement(elementId) {
	document.querySelector(elementId).style = 'display: none;';
}

function unhideHtmlElement(elementId) {
	document.querySelector(elementId).style = 'display: block;';
}

render();