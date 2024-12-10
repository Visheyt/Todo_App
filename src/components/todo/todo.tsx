import { FC, useContext, useState } from "react";
import { TodoProps } from "./todo.type";
import { Button, Checkbox } from "antd";
import styles from "./todo.module.scss";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { TodoContext } from "../context/todoContext";
import { EditOutlined } from "@ant-design/icons";

export const Todo: FC<TodoProps> = ({ text, isComplete, id }) => {
  const [checked, setChecked] = useState(isComplete);

  const { toggleTodo, setEdit } = useContext(TodoContext) || {};

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const checkedStatus = e.target.checked;

    setChecked(checkedStatus);

    if (toggleTodo) toggleTodo(id, checkedStatus);
  };

  const handleEdit = () => {
    if (setEdit) setEdit({ isEdit: true, todoToEdit: id, msgToEdit: text });
  };

  return (
    <div className={styles.todo}>
      <div className={styles.checkbox}>
        <Checkbox checked={checked} onChange={handleCheckboxChange} />
        <span className={`${checked ? styles.checked : ""}`}>{text}</span>
      </div>
      {!checked && (
        <Button
          type="default"
          shape="circle"
          icon={<EditOutlined />}
          onClick={handleEdit}
        ></Button>
      )}
    </div>
  );
};
