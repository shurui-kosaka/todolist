import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  const handleChange=(e)=>setNewName(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group bg-neutral-950 text-white p-4 opacity-95 rounded-md">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text text-black"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button
          type="submit"
          className="btn btn__primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  function StatusBadge({ status }) {
    const getBadgeColor = (status) => {
      switch (status) {
        case 'completed':
          return 'bg-green-500';
        case 'cancelled':
          return 'bg-red-500';
        default:
          return 'bg-yellow-500';
      }
    };
    return (
      <span
        className={`w-4 h-4 rounded-full ${getBadgeColor(status)} border-2 border-white absolute bottom-0.4 left-px`}
      ></span>
    );
  }

  const viewTemplate = (
    <div className={`stack-small todo-${props.status}-bg rounded-md`}>
      <div className="c-cb relative inline-block">
        <StatusBadge status={props.status} />
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>

        <button
          type="button"
          className="btn btn__danger bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>

        <button
          type="button"
          className="btn btn__danger bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => props.cancelTask(props.id)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <li
      className={`todo flex items-center rounded-md animate-trans-down`}
    >
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;
