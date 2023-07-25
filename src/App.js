import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import usePrevious from "./components/usePrevious"

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const listHeadingRef = useRef(null);

  function addTask(name) {
    if(!name) {
      alert("Enter an item!");
      return;
    }
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const tasksToShow = tasks.filter(FILTER_MAP[filter]);
  const tasksRemaining = tasksToShow.filter((task) => !task.completed).length;
  const tasksCompleted = tasksToShow.filter((task) => task.completed).length;
  let headingText;
  if (filter === "All") {
    headingText = `${taskList.length} ${tasksNoun} remaining`;
  } else if (filter === "Active") {
    headingText = `${tasksRemaining} ${tasksNoun} remaining`;
  } else if (filter === "Completed") {
    headingText = `${tasksCompleted} ${tasksNoun} completed`;
  }
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large /*bg-genshin1 bg-cover bg-center bg-fixed bg-no-repeat*/">

      <h1 className="flex justify-center text-7xl font-black rounded-lg">To-Do</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <div className="bg-gray-200 p-1 rounded-lg opacity-80">
        <h2
          id="list-heading"
          tabIndex="-1"
          ref={listHeadingRef}
          className="bg-white p-4 rounded-lg"
        >
          {headingText}
        </h2>
      </div>

      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
