import "./App.scss";
import Done from "./components/done/Done";
import OnProgress from "./components/onProg/OnProgress";
import Todo from "./components/todo/Todo";
import { TodoContext } from "./context/TodoProvider";
import { useContext, useEffect } from "react";
import ProgressBar from "./components/progressBar/ProgressBar";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function App() {
  const { initialValue, dispatch } = useContext(TodoContext);

  useEffect(() => {
    dispatch({
      type: "GET_TODO",
    });
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    initialValue.forEach((items: any) => {
      if (
        items.id === parseInt(result.draggableId) &&
        destination.droppableId === "Progress"
      ) {
        items.onProgress = true;
        localStorage.setItem("todo", JSON.stringify(initialValue));
      } else if (
        source.droppableId === "Done" &&
        destination.droppableId === "Progress"
      ) {
        initialValue.map((items: any) => {
          if (items.id === parseInt(result.draggableId)) {
            items.isDone = false;
            localStorage.setItem("todo", JSON.stringify(initialValue));
          }
        });
      } else if (
        source.droppableId === "Progress" &&
        destination.droppableId === "Todo" &&
        items.id === parseInt(result.draggableId)
      ) {
        items.onProgress = false;
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
