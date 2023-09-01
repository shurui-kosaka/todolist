import React from "react";

function FilterButton(status) {
  return (
    <button
      type="button"
      className="btn toggle-btn bg-black text-white py-4 px-8 rounded text-4xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-transparent hover:text-black duration-300 ..."
      onClick= {status.onClick}>
      <span className="visually-hidden">Show </span>
      <span>{status.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
