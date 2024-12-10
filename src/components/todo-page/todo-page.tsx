import { Button, Form, Input } from "antd";
import { TodoList } from "../todo-list/todo-list";
import styles from "./todo-page.module.scss";
import { useTodo } from "../../hooks/useTodo";

import { FormValues } from "./todo-page.type";
import { TodoContext } from "../context/todoContext";

import { useTodoForm } from "../../hooks/useTodoForm";

export const TodoPage = () => {
  const { completedTodos, incompletedTodos, addTodo, toggleTodo, editTodo } =
    useTodo();

  const { onFinish, onEdit, form, setEdit, editOptions } = useTodoForm({
    addTodo,
    editTodo,
  });

  return (
    <main className={styles.container}>
      <Form
        name="todo"
        form={form}
        onFinish={editOptions.isEdit ? onEdit : onFinish}
      >
        <Form.Item<FormValues>
          name="todo"
          rules={[{ required: true, message: "Please Enter Todo text" }]}
        >
          <Input placeholder="Enter your todo" />
        </Form.Item>
        <Form.Item>
          <Button type="dashed" variant="outlined" htmlType="submit">
            {editOptions.isEdit ? "Edit" : "Add"}
          </Button>
        </Form.Item>
      </Form>

      <TodoContext.Provider value={{ toggleTodo, editTodo, setEdit }}>
        <div className={styles.todoContainer}>
          <TodoList list={incompletedTodos} title={"TO DO"} />
          <TodoList list={completedTodos} title={"Complete"} />
        </div>
      </TodoContext.Provider>
    </main>
  );
};
