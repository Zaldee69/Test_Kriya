import { MdDelete } from "react-icons/md";

interface ToggleProps {
  ClickHandler: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => void;
}

const DeleteButton = (edit: ToggleProps) => {
  return (
    <div>
      <button>
        <MdDelete />
      </button>
    </div>
  );
};

export default DeleteButton;
