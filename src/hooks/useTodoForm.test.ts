import { renderHook, act } from "@testing-library/react";
import { useTodoForm } from "./useTodoForm";

import { describe, expect, it, vi } from "vitest";

describe("useTodoForm", () => {
  it("should set the form value when editing", () => {
    const addTodoMock = vi.fn();
    const editTodoMock = vi.fn();

    const { result } = renderHook(() =>
      useTodoForm({
        addTodo: addTodoMock,
        editTodo: editTodoMock,
      })
    );

    const initialEditOptions = {
      isEdit: true,
      todoToEdit: 1,
      msgToEdit: "Existing todo",
    };

    act(() => {
      result.current.setEdit(initialEditOptions);
    });

    expect(result.current.form.getFieldValue("todo")).toBe("Existing todo");
  });
});
