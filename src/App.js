import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";

let JSON_KEY = "List";
const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: true,
  minute: "numeric",
  weekday: "long",
  timeZone: "Asia/Kolkata",
});
function App() {
  let [listName, setListName] = useState("");
  let [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem(JSON_KEY)) || []
  );
  let [checked, setChecked] = useState(false);
  let [date, setDate] = useState(new Date());
  let inputListName = "";
  let [isEditable, setIsEditable] = useState(false);
  const saveList = () => {};
  const inputEvent = (e) => {
    inputListName = e.target.value;

    setListName(inputListName);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  const createList = () => {
    setListName(inputListName);
    if (listName === "") return;
    setTaskList((prevTaskList) => [...prevTaskList, listName]);
    console.log(taskList);
    localStorage.setItem(JSON_KEY, JSON.stringify([...taskList, listName]));
  };
  const deleteTask = (e) => {
    console.log(e.target.id);
    taskList = taskList.filter((task, i) => {
      return e.target.id != i;
    });
    setTaskList([...taskList]);
    localStorage.setItem(JSON_KEY, JSON.stringify(taskList));
  };
  const checkTask = (e) => {
    console.log("checkTask called");
    setChecked(!checked);
  };
  const clearList = () => {
    let newList = [...taskList];
    let i = 0;
    taskList = taskList.filter((task) => task === "");

    setTaskList(taskList);
    localStorage.setItem(JSON_KEY, JSON.stringify(taskList));
    console.log(taskList);
    console.log(newList);
  };
  const handleEdit = (list) => {
    localStorage.setItem(JSON_KEY, JSON.stringify(list));
  };

  useEffect(() => {
    setTaskList(JSON.parse(localStorage.getItem(JSON_KEY)) || []);
  });

  return (
    <>
      <div className="container">
        <div className="heading">
          <p>{formatter.format(date)}</p>
        </div>
        <div className="toDoContainer">
          <div className="addList">
            <form onSubmit={onSubmitForm}>
              <button onClick={createList} type="submit">
                +
              </button>
              <input
                type="text"
                placeholder="Add To Do"
                id="toDoName"
                autoComplete="off"
                onChange={inputEvent}
                value={listName}
              />
            </form>
          </div>
          <ul className="listItem">
            {taskList.map((task, i) => {
              return (
                <Task
                  taskName={task}
                  key={i}
                  id={i}
                  onSelect={deleteTask}
                  onCheck={checkTask}
                  checked={checked}
                  taskList={taskList}
                  handleEdit={handleEdit}
                  JSON_KEY={JSON_KEY}
                />
              );
            })}
          </ul>
          <button id="clearBtn" onClick={clearList}>
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
