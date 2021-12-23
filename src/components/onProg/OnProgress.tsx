import DeleteButton from "../molecules/atom/button/DeleteButton";
import DoneButton from "../molecules/atom/button/DoneButton";
import EditButton from "../molecules/atom/button/EditButton";
import "./OnProg.scss";

const onProg = () => {
  return (
    <div className="onprog-container">
      <h1>On Progress</h1>
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

export default onProg;
