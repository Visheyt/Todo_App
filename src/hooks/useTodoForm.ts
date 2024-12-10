import { useForm } from "antd/es/form/Form";
import { useState, useEffect } from "react";
import { FormValues } from "../components/todo-page/todo-page.type";

export type useTodoForm = {
  addTodo: (text: string) => void;
  editTodo: (id: number, newText: string) => void;
};
export const useTodoForm = ({ addTodo, editTodo }: useTodoForm) => {
  const [editOptions, setEdit] = useState<{
    isEdit: boolean;
    todoToEdit: number | null;
    msgToEdit: string;
  }>({
    isEdit: false,
    todoToEdit: null,
    msgToEdit: "",
  });

  const [form] = useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    addTodo(values.todo);
    form.resetFields();
  };

  const onEdit = (values: FormValues) => {
    if (editOptions.todoToEdit) editTodo(editOptions.todoToEdit, values.todo);
    form.resetFields();
    setEdit({ isEdit: false, todoToEdit: null, msgToEdit: "" });
  };

  useEffect(() => {
    if (editOptions.todoToEdit) {
      form.setFieldValue("todo", editOptions.msgToEdit);
    }
  }, [editOptions, form]);
  return {
    onFinish,
    onEdit,
    form,
    setEdit,
    editOptions,
  };
};
