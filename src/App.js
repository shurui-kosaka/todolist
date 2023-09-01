import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import usePrevious from "./components/usePrevious"

const status = {
  all: "all",
  pending: "pending",
  completed: "completed",
  cancelled: "cancelled"
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(status.all);
  const listHeadingRef = useRef(null);

  // useEffect(()=>{
  //   console.log(tasks)
  // },[tasks])

  function addTask(name) {
    if(!name) {
      alert("Enter an item!");
      return;
    }
    const newTask = { id: `todo-${nanoid()}`, name, status: status.pending };
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
        return { ...task, status: task.status===status.completed ? status.pending : status.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task)=>task.id!==id)
    setTasks(updatedTasks);
  }

  function cancelTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, status: status.cancelled };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function toggleTaskCancelled(id) {
    const cancelledTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, status: status.cancelled };
      }
      return task;
    });
    setTasks(cancelledTasks);
  }

  const taskList = tasks
  .map((task) => {
    if(task.status===currentStatus || currentStatus===status.all) {
      return (
        <Todo
          completed={task.status===status.completed}
          {...task}
          key={task.id}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTask={editTask}
          cancelTask={cancelTask}
          toggleTaskCancelled={toggleTaskCancelled}
        />
      )
    }
    return null
  });

  const filterList = Object.entries(status).map((val) => (
    <FilterButton
    key={val[1]}
    name={val[1]}
    onClick={()=>setCurrentStatus(val[1])}
  />
  ));

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  function number() {
    const result = tasks.filter((task)=>task.status===currentStatus)
    return result.length
  }

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
          className="bg-white p-4 rounded-lg"
          ref={listHeadingRef}
        >
          {number()} {number() > 1 ? "tasks" : "task" } {currentStatus===status.all ? "remaining" : currentStatus}
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
