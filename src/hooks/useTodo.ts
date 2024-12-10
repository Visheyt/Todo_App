import { useCallback, useEffect, useMemo, useState } from "react";

import { Todo } from "./useTodo.types";

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("Visheyt");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("Visheyt", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = useCallback((text: string, id?: number) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { text, isComplete: false, id: id ? id : Date.now() },
    ]);
  }, []);

  const toggleTodo = useCallback((id: number, isComplete: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, isComplete } : todo))
    );
  }, []);

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.isComplete),
    [todos]
  );

  const incompletedTodos = useMemo(
    () => todos.filter((todo) => !todo.isComplete),
    [todos]
  );

  return {
    completedTodos,
    incompletedTodos,
    toggleTodo,
    addTodo,
  };
};
