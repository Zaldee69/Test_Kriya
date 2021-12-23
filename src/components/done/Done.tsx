import DeleteButton from "../molecules/atom/button/DeleteButton";
import DoneButton from "../molecules/atom/button/DoneButton";
import EditButton from "../molecules/atom/button/EditButton";

import "./Done.scss";
const Done = () => {
  return (
    <div className="done-container">
      <div>
        <h1>Done</h1>
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
    </div>
  );
};

export default Done;
