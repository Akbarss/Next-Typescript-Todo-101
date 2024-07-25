import React from "react";

type Todo = {
  id: number;
  title: string;
};

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo }) => {
  const handleDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    onDeleteTodo(id);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title} <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
