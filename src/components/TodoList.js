import React, { useState, useRef, useEffect } from 'react';
import TodoForm from './TodoForm';
import ConfirmDialog from './ConfirmDialog';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    // LocalStorage'dan verileri yükle
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : []; // Varsa verileri döndür, yoksa boş dizi
  });
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Input referansı
  const inputRef = useRef();

  // Todos değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (todo.text.trim() === '') {
      setShowAlert(true);
      return;
    }
    setTodos([...todos, { ...todo, completed: false }]);
    setShowAlert(false);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    closeConfirmDialog();
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (todo) => {
    setEditingTodoId(todo.id);
    setEditedText(todo.text);
  };

  const updateTodo = (id) => {
    if (editedText.trim() === '') {
      setEditingTodoId(null);
      return;
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editedText } : todo
        )
      );
      setEditingTodoId(null);
      setEditedText('');
    }
  };

  const openConfirmDialog = (id) => {
    setTodoToDelete(id);
    setIsConfirmOpen(true);
  };

  const closeConfirmDialog = () => {
    setTodoToDelete(null);
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteTodo(todoToDelete);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="todo-list bg-white rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Görevler</h2>
      <TodoForm addTodo={addTodo} showAlert={setShowAlert} ref={inputRef} />

      {showAlert && (
        <p className="text-red-500 text-center mt-2">
          Boş bir To-Do eklenemez!
        </p>
      )}

      <ul className="mt-4">
        {todos.length === 0 ? (
          <li
            className="text-gray-500 text-center py-4 cursor-pointer hover:underline"
            onClick={focusInput}
          >
            Todo listeni hazırlamaya başla!
          </li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b py-2"
            >
              {editingTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    autoFocus
                    className="p-1 focus:outline-none w-full focus:ring-0"
                  />
                  <button
                    onClick={() => updateTodo(todo.id)}
                    className="text-green-500 ml-2"
                  >
                    Kaydet
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`text-gray-600 ${
                      todo.completed ? 'line-through' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                  <div>
                    {todo.completed ? (
                      <button
                        onClick={() => openConfirmDialog(todo.id)}
                        className="text-red-500 ml-2 hover:underline"
                      >
                        Sil
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleComplete(todo.id)}
                          className="text-green-500 ml-2"
                        >
                          ✔️
                        </button>
                        <button
                          onClick={() => startEditing(todo)}
                          className="text-blue-500 hover:underline"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => openConfirmDialog(todo.id)}
                          className="text-red-500 ml-2 hover:underline"
                        >
                          Sil
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirmDialog}
      />
    </div>
  );
};

export default TodoList;
