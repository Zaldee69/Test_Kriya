import "./App.scss";
import Done from "./components/done/Done";
import OnProgress from "./components/onProg/OnProgress";
import Todo from "./components/todo/Todo";

function App() {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="home-container">
        <Todo />
        <OnProgress />
        <Done />
      </div>
    </div>
  );
}

export default App;
