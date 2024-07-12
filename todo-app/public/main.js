document.getElementById('todo-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const todoInput = document.getElementById('todo-input');
  const todo = { id: Date.now().toString(), text: todoInput.value };
  await fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
  });
  todoInput.value = '';
  loadTodos();
});

async function loadTodos() {
  const res = await fetch('/todos');
  const todos = await res.json();
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.text;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteTodo(todo.id);
      li.appendChild(deleteButton);
      todoList.appendChild(li);
  });
}

async function deleteTodo(id) {
  await fetch(`/todos/${id}`, {
      method: 'DELETE'
  });
  loadTodos();
}

loadTodos();
