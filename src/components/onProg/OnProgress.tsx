import { MdDelete } from "react-icons/md";
import "./OnProg.scss";
import { TodoContext } from "../../context/TodoProvider";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const OnProg = () => {
  const { initialValue, dispatch } = useContext<any>(TodoContext);

  const handleDelete = (id: number) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const moveToProgress = (id: number) => {
    dispatch({
      type: "MOVE_TO_DONE",
      payload: {
        id,
      },
    });
  };

  return (
    <Droppable droppableId="Progress">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="onprog-container"
        >
          <h1>On Progress</h1>
          <div className="todo-content">
            {initialValue
              ?.filter((items: any) => items.onProgress && !items.isDone)
              .map((el: any) => {
                return (
                  <Draggable
                    draggableId={el.id && el.id.toString()}
                    index={el.id}
                  >
                    {(provided) => (
                      <div
                        key={el.id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        id={el.id}
                        className="todo-list"
                      >
                        <span>{el.title}</span>
                        <div className="button-container">
                          <button onClick={() => handleDelete(el.id)}>
                            <MdDelete />
                          </button>
                          <button onClick={() => moveToProgress(el.id)}>
                            <AiOutlineCheckCircle />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default OnProg;
