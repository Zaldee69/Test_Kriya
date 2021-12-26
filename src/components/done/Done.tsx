import { MdDelete } from "react-icons/md";
import { TodoContext } from "../../context/TodoProvider";
import { useContext } from "react";
import "./Done.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";
const Done = () => {
  const { initialValue, dispatch } = useContext<any>(TodoContext);

  const handleDelete = (id: number) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };
  return (
    <Droppable droppableId="Done">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="done-container"
        >
          <div>
            <h1>Done</h1>
            <div className="todo-content">
              {initialValue
                ?.filter((items: any) => items.isDone)
                .map((el: any, i: number) => {
                  return (
                    <Draggable
                      draggableId={el.id && el.id.toString()}
                      index={i}
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
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Done;
