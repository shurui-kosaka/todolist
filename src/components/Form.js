import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="leading-4 font-medium p-3 mb-4 text-gray-950">
          ! BE PRODUCTIVE !
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input
          bg-white
          border-2
          p-6
          shadow-sm
          border-black
          placeholder-slate-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-sky-500
          block
          w-full
          rounded-md
          focus:ring-1
          font-sans
          text-center
          text-3xl"
        placeholder="🤸Anong gagawin ng beshy ko?🤸"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <div className="flex justify-center">
        <button
        type="submit"
        className="relative
          border-2
          border-black
          bg-transparent py-2.5 px-5
          font-medium uppercase text-black
          transition-colors
          before:absolute before:left-0 before:top-0
          before:-z-10 before:h-full before:w-full
          before:origin-top-left before:scale-y-0
          before:bg-black before:transition-transform
          before:duration-300 before:content-[''] hover:text-white before:hover:scale-y-100
          before:scale-y-1
          w-full"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;
