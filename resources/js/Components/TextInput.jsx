import React, { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
  {
    type = "text",
    name,
    value,
    id,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
  },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        className={
          `border-gray-300 focus:ring-0 focus:border-hkblue rounded-md shadow-sm ` +
          className
        }
        ref={input}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
});
