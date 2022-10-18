import React from "react";

export default function PrimaryButton({
  type = "submit",
  className = "",
  processing,
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-hkblue border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-hkblue transition ease-in-out duration-150 hover:bg-hkgreen ${
          processing && "opacity-25"
        } ` + className
      }
      disabled={processing}
    >
      {children}
    </button>
  );
}
