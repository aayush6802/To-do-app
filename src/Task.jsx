import { isEditable } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useState } from "react";

const Task = (props) => {
  const { taskList, handleEdit, checked, onCheck, taskName, id, onSelect } =
    props;
  const [isEditing, setIsEditing] = useState(false);
  const handleEditing = (e) => {
    let newList = [...taskList];
    console.log(e);
    const text = e.target.parentElement.innerText;
    if (text === "") {
      alert("Please enter valid value");
      return;
    }

    setIsEditing(!isEditing);
    if (isEditing && text != "") {
      console.log(text);
      newList[parseInt(e.target.id)] = text;
      handleEdit(newList);
    }
    console.log(e.target.parentElement.innerText);
    console.log("Editing : " + e.target.id);
  };
  return (
    <>
      <li
        className="toDoItem done"
        style={{ opacity: checked ? "50%" : "100%" }}
      >
        {checked ? (
          <>
            <p className="line"></p>
          </>
        ) : (
          <></>
        )}
        <span className="checkbox" onClick={onCheck}>
          {checked ? (
            <>
              <i
                className="fa-solid fa-check-double green"
                style={{ fontSize: "1.4rem" }}
              ></i>
              <p className="line"></p>
            </>
          ) : (
            <></>
          )}
        </span>

        <span className="toDoTitle" contentEditable={isEditing ? true : false}>
          {taskName}
        </span>

        <i
          className="fa-solid fa-trash-can red"
          style={{ fontSize: "1.4rem" }}
          id={id}
          onClick={onSelect}
        ></i>
        <i
          className={`fa-solid ${isEditing ? "fa-check" : "fa-pen-to-square"}`}
          style={{ fontSize: "1.4rem" }}
          id={id}
          onClick={handleEditing}
        ></i>
      </li>
    </>
  );
};
export default Task;
