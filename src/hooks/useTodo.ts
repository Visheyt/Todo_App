import { useCallback, useMemo, useState } from "react";

import { Todo } from "./useTodo.types";

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((text: string, id: number) => {
    setTodos((prevTodos) => [...prevTodos, { text, isComplete: false, id }]);
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
