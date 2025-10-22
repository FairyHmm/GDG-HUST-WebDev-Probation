import { useState } from "react"
import "./../styles/TodoForm.css"
import noteBook from "./../assets/notebook.svg"

export default function TodoForm({inputError}) {
  return <section className="section" id="todo-input">
    <h2 className="title">Todo Input</h2>
    <div className="todo-body">
      <div className="input-wrapper">
        <div className="icon">
          <img src={noteBook} />
        </div>
        <input
          id="new-task"
          placeholder={inputError ? "Please input" : "New todo"}
          className={inputError ? "error" : ""}
        >

        </input>
      </div>
      <button className="button" id="add-todo">Add new task</button>
    </div>
  </section>
}
