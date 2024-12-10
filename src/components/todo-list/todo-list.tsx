import { FC } from "react";
import styles from "./todo-list.module.scss";
import { TodoListProps } from "./todo-list.types";
import { Todo } from "../todo/todo";

export const TodoList: FC<TodoListProps> = ({ list, title }) => {
  return (
    <section className={styles.list}>
      <h2>{title}</h2>

      {list.map((item) => (
        <Todo
          key={item.id}
          text={item.text}
          isComplete={item.isComplete}
          id={item.id}
        />
      ))}
    </section>
  );
};
