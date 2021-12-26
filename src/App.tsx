import "./App.scss";
import { MdDelete } from "react-icons/md";
import Done from "./components/done/Done";
import OnProgress from "./components/onProg/OnProgress";
import Todo from "./components/todo/Todo";
import { TodoContext } from "./context/TodoProvider";
import { useContext, useEffect, useState } from "react";
import ProgressBar from "./components/progressBar/ProgressBar";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

function App() {
  const { initialValue, dispatch } = useContext(TodoContext);

  useEffect(() => {
    dispatch({
      type: "GET_TODO",
    });
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log(destination, result);

    if (!destination) return;
    initialValue.forEach((items: any) => {
      if (
        items.id === parseInt(result.draggableId) &&
        destination.droppableId === "Progress"
      ) {
        items.onProgress = true;
        localStorage.setItem("todo", JSON.stringify(initialValue));
      } else if (
        items.onProgress &&
        destination.droppableId === "Done" &&
        items.id === parseInt(result.draggableId)
      ) {
        items.isDone = true;
        localStorage.setItem("todo", JSON.stringify(initialValue));
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1>Task Manager</h1>
        <div className="container">
          <ProgressBar done="80" />
          <div className="home-container">
            <Todo />
            <OnProgress />
            <Done />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
