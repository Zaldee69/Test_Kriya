import { createContext, useReducer } from "react";
let initialValue: any = [{}];
export const TodoContext = createContext(initialValue);

export type Dispatch = (action: any) => void;

const TodoReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TODO":
      initialValue.push(action.payload);
      localStorage.setItem("todo", JSON.stringify(initialValue));
      return {
        ...state,
      };
    case "DELETE_TODO":
      const filteredData = initialValue.filter(
        (items: any) => items.id !== action.payload
      );
      initialValue = filteredData;
      localStorage.setItem("todo", JSON.stringify(initialValue));
      return {
        ...state,
      };
    case "EDIT_TODO":
      initialValue.forEach((items: any) => {
        if (items.id === action.payload.id) {
          items.title = action.payload.title;
        }
      });
      localStorage.setItem("todo", JSON.stringify(initialValue));
      return {
        ...state,
      };
    case "MOVE_TO_PROGRESS":
      initialValue.forEach((items: any) => {
        if (items.id === action.payload.id) {
          items.onProgress = true;
        }
      });
      localStorage.setItem("todo", JSON.stringify(initialValue));
      return {
        ...state,
      };
    case "MOVE_TO_DONE":
      initialValue.forEach((items: any) => {
        if (items.id === action.payload.id) {
          items.isDone = true;
        }
      });
      localStorage.setItem("todo", JSON.stringify(initialValue));
      return {
        ...state,
      };

    case "GET_TODO":
      const todo: any = localStorage.getItem("todo");
      initialValue = JSON.parse(todo);

      return {
        ...state,
      };
    default:
      throw new Error();
  }
};

export const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialValue);

  return (
    <TodoContext.Provider value={{ initialValue, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
