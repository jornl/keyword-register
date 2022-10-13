import React from "react";

export default function SearchBar({
  name = "search",
  value,
  className,
  placeholder,
  handleChange,
}) {
  return (
    <div className="search w-full col-start-2 relative">
      <input
        type="text"
        name={name}
        value={value}
        id="search"
        className={
          `block border-2 border-hkblue w-full focus:ring-0 focus:outline-hkorange focus:outline-offset-2 focus:border-hkblue rounded-full text-xl py-4 px-8 ` +
          className
        }
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      />
      <button className="absolute top-0 right-0 p-3 m-2 bg-hkblue rounded-full hover:bg-hkgreen">
        <svg viewBox="0 0 512 512" className="h-6 w-6 text-white">
          <path
            fill="#fff"
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
          />
        </svg>
      </button>
    </div>
  );
}
