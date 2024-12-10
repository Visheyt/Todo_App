import { FC, useContext, useState } from "react";
import { TodoProps } from "./todo.type";
import { Checkbox } from "antd";
import styles from "./todo.module.scss";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { TodoContext } from "../context/todoContext";

export const Todo: FC<TodoProps> = ({ text, isComplete, id }) => {
  const [checked, setChecked] = useState(isComplete);
  const { toggleTodo } = useContext(TodoContext) || {};

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const checkedStatus = e.target.checked;

    setChecked(checkedStatus);

    if (toggleTodo) {
      toggleTodo(id, checkedStatus);
    }
  };

  return (
    <div className={styles.todo}>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
      <span className={`${checked ? styles.checked : ""}`}>{text}</span>
    </div>
  );
};
