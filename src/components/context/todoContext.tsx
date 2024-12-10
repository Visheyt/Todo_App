import { createContext, Dispatch, SetStateAction } from "react";

type TodoContext = {
  toggleTodo: (id: number, isComplete: boolean) => void;
  editTodo: (id: number, newText: string) => void;
  setEdit: Dispatch<
    SetStateAction<{
      isEdit: boolean;
      todoToEdit: number | null;
      msgToEdit: string;
    }>
  >;
};
export const TodoContext = createContext<TodoContext | undefined>(undefined);
