import { createContext } from "react";

type TodoContext = {
  toggleTodo: (id: number, isComplete: boolean) => void;
};
export const TodoContext = createContext<TodoContext | undefined>(undefined);
