import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useTodo } from "./useTodo";

describe("useTodo", () => {
  it("must add todo", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("new todo", Date.now());
    });

    expect(result.current.incompletedTodos).toHaveLength(1);
    expect(result.current.incompletedTodos[0].text).toBe("new todo");
  });

  it("must toggle todo", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("todo for toggle", Date.now());
    });

    const todoId = result.current.incompletedTodos[0].id;

    act(() => {
      result.current.toggleTodo(todoId, true);
    });

    expect(result.current.completedTodos).toHaveLength(1);
    expect(result.current.completedTodos[0].isComplete).toBe(true);
  });

  it("must filter todos", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("todo 1", Date.now());
      result.current.addTodo("todo 2", Date.now() + 1);
      result.current.addTodo("todo 3", Date.now() + 2);
    });

    const todoId = result.current.incompletedTodos[1].id;

    act(() => {
      result.current.toggleTodo(todoId, true);
    });

    expect(result.current.completedTodos).toHaveLength(1);
    expect(result.current.incompletedTodos).toHaveLength(2);
  });
});
