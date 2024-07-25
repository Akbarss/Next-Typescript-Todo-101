import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type TodoFormInput = {
  title: string;
};

type TodoFormProps = {
  onAddTodo: (newTodo: { id: number; title: string }) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const { register, handleSubmit, reset } = useForm<TodoFormInput>();

  const onSubmit: SubmitHandler<TodoFormInput> = async (data) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: data.title, userId: 1, completed: false }),
    });
    const newTodo = await response.json();
    onAddTodo({ id: newTodo.id, title: data.title });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title", { required: true })} placeholder="Enter todo title" />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
