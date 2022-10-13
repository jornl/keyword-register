import { Link } from "@inertiajs/inertia-react";
import React from "react";

function StatusCard({ children, header, buttonText = "", containerClassName }) {
  return (
    <div
      className={
        `p-6 bg-white border-b border-gray-200 flex-1 rounded sm:rounded-xl ` +
        containerClassName
      }
    >
      <div className="flex justify-between mb-5 items-center">
        {header}
        {buttonText && (
          <Link
            href={route("users.create")}
            className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 hover:bg-gray-700"
          >
            {buttonText}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

export default StatusCard;
