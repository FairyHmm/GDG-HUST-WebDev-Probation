import { useState } from "react"
import "./../styles/TodoList.css"

export default function TodoList({ taskList, setTaskList }) {
  function filter(type) {
    if (type == "all")
      setTaskList(tasks => tasks.map((task) => ({ ...task, show: true })));
    else if (type == "done")
      setTaskList(tasks => tasks.map((task) =>
        !task.checked ? { ...task, show: false } : { ...task, show: true }
      ));
    else 
      setTaskList(tasks => tasks.map((task) =>
        task.checked ? { ...task, show: false } : { ...task, show: true }
      ));
  }

  return <section className="section" id="todo-list">
    <h2 className="title">Todo List</h2>
    <div className="button-wrapper">
      <button
        className="button button-edit" 
        id="filter-all"
        onClick={() => filter("all")}
      >
        All
      </button>
      <button
        className="button button-edit" 
        id="filter-done"
        onClick={() => filter("done")}
      >
        Done
      </button>
      <button
        className="button button-edit" 
        id="filter-todo"
        onClick={() => filter("todo")}
      >
        Todo
      </button>
    </div>
  </section>
}