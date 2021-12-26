import { useState, useEffect, useContext } from "react";
import "./ProgressBar.scss";
import { TodoContext } from "../../context/TodoProvider";

interface Props {
  done: string;
}

const ProgressBar = ({ done }: Props) => {
  const [style, setStyle] = useState({});
  const { initialValue, dispatch } = useContext(TodoContext);

  const isDone = initialValue?.filter((items: any) => items.isDone);

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${(
          ((isDone.length / initialValue.length) * 100) |
          0
        ).toFixed()}%`,
      };

      setStyle(newStyle);
    }, 200);
  });

  return (
    <div style={{ paddingTop: "20px" }}>
      <h1>Your Progress</h1>
      <div className="progress">
        <div className="progress-done" style={style}>
          <p>
            {(((isDone.length / initialValue.length) * 100) | 0).toFixed()}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
