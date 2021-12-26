import "./Todo.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useState, MouseEvent, useContext } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TodoContext } from "../../context/TodoProvider";
import DeleteButton from "../molecules/atom/button/DeleteButton";
const Todo = () => {
  interface editInterFace {
    id: number;
    status: boolean;
  }

  const [form, setForm] = useState("");
  const [isUpdate, setIsUpdate] = useState<editInterFace>({
    id: 0,
    status: false,
  });
  const { initialValue, dispatch } = useContext<any>(TodoContext);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setForm(e.currentTarget.value);
  };

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();
    if (form === "") {
      return false;
    }
    if (isUpdate.status) {
      dispatch({
        type: "EDIT_TODO",
        payload: {
          id: isUpdate.id,
          title: form,
        },
      });
      setIsUpdate({ id: 0, status: false });
      setForm("");
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: {
          id: Date.now(),
          title: form,
          isDone: false,
          onProgress: false,
        },
      });
      setForm("");
    }
  };

  const handleEdit = (id: number) => {
    const newData = [...initialValue];
    const foundData = newData.find((items) => items.id === id);
    setForm(foundData.title);
    setIsUpdate({ id: id, status: true });
  };

  const handleDelete = (id: number) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const moveToProgress = (id: number, e: MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: "MOVE_TO_PROGRESS",
      payload: {
        id,
      },
    });
  };

  return (
    <Droppable droppableId="Todo">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="todo-container"
        >
          <h1>Todo</h1>

          <div>
            <div className="input-container">
              <input
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  changeHandler(e)
                }
                type="text"
                value={form}
              />
              <button onClick={(e: MouseEvent) => onSubmit(e)} type="submit">
                <AiFillPlusCircle />
              </button>
            </div>
            <div className="todo-content">
              {initialValue
                ?.filter((items: any) => !items.onProgress && !items.isDone)
                .map((el: any) => {
                  return (
                    <Draggable
                      draggableId={el.id && el.id.toString()}
                      index={el.id}
                    >
                      {(provided) => (
                        <div
                          key={el.id}
                          id={el.id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="todo-list"
                        >
                          <span>{el.title}</span>
                          <div className="button-container">
                            <button onClick={() => handleDelete(el.id)}>
                              <MdDelete />
                            </button>
                            <button onClick={() => handleEdit(el.id)}>
                              <HiOutlinePencilAlt />
                            </button>
                            <button
                              onClick={(e: MouseEvent) =>
                                moveToProgress(el.id, e)
                              }
                            >
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
        </div>
      )}
    </Droppable>
  );
};

export default Todo;
