import { useState, useEffect } from 'react'
import "./App.css"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import TodoItem from "./components/TodoItem"

export default function App() {
  document.addEventListener("DOMContentLoaded", () => {
    const addTask = document.querySelector("#add-todo");
    const newTask = document.querySelector("#new-task");

    addTask.addEventListener("click", () => {handleTask(newTask, {key: "click"})});
    newTask.addEventListener("keydown", (e) => handleTask(newTask, e));
  });

  const [taskList, setTaskList] = useState(() => {
    const stored = localStorage.getItem('taskList');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (taskList.length > 0)
      localStorage.setItem('taskList', JSON.stringify(taskList));
    else
      localStorage.removeItem('taskList');
  }, [taskList]);


  const [inputError, setInputError] = useState(false);

  function handleTask(task, c) {
    if (task.value.trim() == "")
      handleEmpty(task, c);
    else if (c.key == "click" || c.key == "Enter")
      addNewTask(task);
    else
      handleEmpty(task, c);
  }

  function handleEmpty(task, c) {
    if (c.key == "click" || c.key == "Enter") {
      task.value = "";
      setInputError(true);
    }
    else
      setInputError(false);
  }

  function addNewTask(task) {
    setInputError(false);
    setTaskList(tasks => [...tasks, { text: task.value, checked: false, show: true, editable: false, editError: false }]);
    hideFadeText(task);
  }

  function hideFadeText(task) {
    task.style.color = "transparent";
    setTimeout(() => {
      task.value = "";
      task.style.color = "var(--text)";
    }, 150);
  }

  return <>
    <TodoForm inputError={inputError} />
    <TodoList taskList={taskList} setTaskList={setTaskList} />
    <TodoItem taskList={taskList} setTaskList={setTaskList} addNewTask={addNewTask} />
  </>
}