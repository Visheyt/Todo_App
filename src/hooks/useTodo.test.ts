import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTodo } from "./useTodo";

describe("useTodo", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("must add todo to localStorage", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("new todo");
    });

    expect(result.current.incompletedTodos).toHaveLength(1);
    expect(result.current.incompletedTodos[0].text).toBe("new todo");
    expect(localStorage.getItem("Visheyt")).toBeTruthy();
  });

  it("must download todos to localStorage", () => {
    const initialTodos = [
      { text: "todo from storage", isComplete: false, id: 1 },
    ];

    localStorage.setItem("Visheyt", JSON.stringify(initialTodos));

    const { result } = renderHook(() => useTodo());

    expect(result.current.incompletedTodos).toHaveLength(1);
    expect(result.current.incompletedTodos[0].text).toBe("todo from storage");
  });

  it("must add todo", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("new todo");
    });

    expect(result.current.incompletedTodos).toHaveLength(1);
    expect(result.current.incompletedTodos[0].text).toBe("new todo");
  });

  it("must toggle todo", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("todo for toggle");
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
      result.current.addTodo("todo 1", 1);
      result.current.addTodo("todo 2", 2);
      result.current.addTodo("todo 3", 3);
    });

    const todoId = result.current.incompletedTodos[1].id;

    act(() => {
      result.current.toggleTodo(todoId, true);
    });

    expect(result.current.completedTodos).toHaveLength(1);
    expect(result.current.incompletedTodos).toHaveLength(2);
  });

  it("should consistently generate todo IDs", () => {
    const { result } = renderHook(() => useTodo());

    vi.spyOn(Date, "now").mockReturnValueOnce(1638420000000);

    act(() => {
      result.current.addTodo("Mocked ID todo");
    });

    expect(result.current.incompletedTodos[0].id).toBe(1638420000000);
  });
});
