import "./Todo.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import DeleteButton from "../molecules/atom/button/DeleteButton";
import DoneButton from "../molecules/atom/button/DoneButton";
import EditButton from "../molecules/atom/button/EditButton";

const Todo = () => {
  return (
    <div className="todo-container">
      <h1>Todo</h1>
      <div className="input-container">
        <input type="text" />
        <button type="submit">
          <AiFillPlusCircle />
        </button>
      </div>
      <div className="todo-content">
        <div draggable className="todo-list">
          <span>Makan</span>
          <div className="button-container">
            <DeleteButton />
            <EditButton />
            <DoneButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
