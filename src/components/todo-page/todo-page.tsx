import { Button, Form, Input } from "antd";
import { TodoList } from "../todo-list/todo-list";
import styles from "./todo-page.module.scss";
import { useTodo } from "../../hooks/useTodo";
import { useForm } from "antd/es/form/Form";
import { FormValues } from "./todo-page.type";
import { TodoContext } from "../context/todoContext";

export const TodoPage = () => {
  const {
    completedTodos,
    incompletedTodos,
    addTodo,
    currentIndex,
    toggleTodo,
  } = useTodo();

  const [form] = useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    addTodo(values.todo, currentIndex);
    form.resetFields();
  };

  return (
    <main className={styles.container}>
      <Form name="todo" form={form} onFinish={onFinish}>
        <Form.Item<FormValues>
          name="todo"
          rules={[{ required: true, message: "Please Enter Todo text" }]}
        >
          <Input placeholder="Enter your todo" />
        </Form.Item>
        <Form.Item>
          <Button type="dashed" variant="outlined" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>

      <TodoContext.Provider value={{ toggleTodo }}>
        <div className={styles.todoContainer}>
          <TodoList list={incompletedTodos} title={"TO DO"} />
          <TodoList list={completedTodos} title={"Complete"} />
        </div>
      </TodoContext.Provider>
    </main>
  );
};
