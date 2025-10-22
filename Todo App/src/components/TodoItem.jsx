import { useState, useEffect } from "react"
import "./../styles/TodoItem.css"

export default function TodoItem({ taskList, setTaskList, addNewTask }) {

  function toggleCheck(taskKey) {
    // console.log(taskList[taskKey]);
    setTaskList(tasks => tasks.map((task, index) =>
      index === taskKey ? { ...task, checked: !task.checked } : task
    ));
  }

  function updateTask(taskKey, newValue) {
    setTaskList(tasks => tasks.map((task, index) =>
      index === taskKey ? { ...task, text: newValue } : task
    ));
  };

  function toggleEdit(taskKey) {
    const editElement = document.querySelector(`#item-${taskKey} .task`);
    if (taskList[taskKey].editable && editElement) {
      if (editElement.value.trim() === "") {
        toggleError(taskKey, true);
        return;
      }
      else
        updateTask(taskKey, editElement.value);
    }
    setTaskList(tasks => tasks.map((task, index) =>
      index === taskKey ? { ...task, editable: !task.editable } : task
    ));
  }

  function toggleError(taskKey, type) {
    setTaskList(tasks => tasks.map((task, index) =>
      index === taskKey ? { ...task, editError: type } : task
    ));
  }

  useEffect(() => {
    taskList.forEach((task, index) => {
      const editElement = document.querySelector(`#item-${index} .task`);
      if (task.editable && editElement) {
        const handleKeyDown = (e) => {
          if (e.key === "Enter") {
            if (editElement.value.trim() != "") {
              updateTask(index, editElement.value);
              toggleEdit(index);
              toggleError(index, false);
            }
            else
              toggleError(index, true);
          }
          else
            toggleError(index, false);
        };
        
        editElement.addEventListener("keydown", handleKeyDown);
        return () => {
          editElement.removeEventListener("keydown", handleKeyDown);
        };
      }
    });
  }, [taskList]);

  function trash(taskKey) {
    // console.log(taskKey)
    setTaskList(tasks => tasks.filter((_, index) => index !== taskKey));
  };

  function deleteDone() {
    setTaskList(tasks => tasks.filter((task) => !task.checked));
  }

  function deleteAll() {
    setTaskList([]);
  }

  return <section className="section" id="todo-item">
    <div className="item-wrapper">
      {taskList.map((task, index) => (
        <Item
          key={index}
          task={task}
          taskKey={index}
          toggleCheck={toggleCheck}
          toggleEdit={toggleEdit}
          trash={trash}
        />
      ))}
    </div>
    <div className="button-wrapper">
      <button
        className="button button-danger"
        id="sort-done"
        onClick={() => deleteDone()}
      >
        Delete done tasks
      </button>
      <button
        className="button button-danger"
        id="sort-todo"
        onClick={() => deleteAll()}
      >
        Delete all tasks
      </button>
    </div>
  </section>
}

function Item({task, taskKey, toggleCheck, toggleEdit, trash}) {
  return <div
      className={`item ${task.show ? "" : "hidden"} ${task.checked ? "done" : ""} ${task.editable ? "editable" : ""} ${task.editError ? "error" : ""}`}
      id={`item-${taskKey}`}
    >
    <input
      className="task"
      defaultValue={task.text}
      disabled={!task.editable}
    />
    <div className="actions">
      <Checkbox
        taskKey={taskKey}
        checked={task.checked}
        toggleCheck={toggleCheck}
      />
      <Edit
        taskKey={taskKey}
        toggleEdit={toggleEdit}
      />
      <Trash
        taskKey={taskKey}
        trash={trash}
      />
    </div>
  </div>
}

// Credit: https://uiverse.io/kyle1dev/afraid-wasp-94
function Checkbox({taskKey, checked, toggleCheck}) {
  return <div className="checkbox-container">
    <label className="checkbox" htmlFor={`checkbox-${taskKey}`}>
    <input
      type="checkbox"
      id={`checkbox-${taskKey}`}
      onChange={() => toggleCheck(taskKey)}
      checked={checked}
    />
    <div className="checkbox-wrapper">
      <div className="checkbox-bg"></div>
        <svg fill="none" className="checkbox-icon svg">
          <path stroke="currentColor" d="M4 12l6 6 10-12"/>
        </svg>
      </div>
    </label>
  </div>
}

function Edit({taskKey, toggleEdit}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="svg edit" onClick={() => toggleEdit(taskKey)}>
    <path d="M23.0 5.47c1.09-1.07-2.59-5.25-4.04-4.03l-2.84 2.55 4.05 4.33Z"/>
    <path d="M1.12 18.84v4.04h4.04l11.93-11.92L12.99 6.93Z"/>
  </svg>
}

function Trash({taskKey, trash}) {
  return <svg xmlns="http://www.wtoggleCheck3.org/2000/svg" className="svg trash" onClick={() => trash(taskKey)}>
    <path className="lid" d="M7.2 4.8c.43-1.28.7-2.86 2.06-3.44.93-.33 4.99-.2 5.49 0 1.47.73 1.55 2.06 2.05 3.43z"/>
    <path className="line" d="M2.06 4.54h19.88"/>
    <path className="base" d="m4.8 4.8.97 14.4c.09 1.35.08 2.7 1.43 3.36.5.25 1.13.25 2.4.25 2.27 0 4.98.24 7.2-.25 1.43-.74 1.33-1.92 1.43-3.36l.96-14.4Z"/>
    <path className="detail" d="M14.39 9.6V18M9.6 9.59v8.42"/>
  </svg>
}
