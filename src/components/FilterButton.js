import React from "react";

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn bg-gray-600 text-white py-4 px-8 rounded text-4xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}>
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}


export default FilterButton;
