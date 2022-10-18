import { Link } from "@inertiajs/inertia-react";
import React from "react";

function StatusCard({
  children,
  header,
  buttonText = "Create",
  buttonUrl,
  containerClassName,
  modal,
}) {
  return (
    <div
      className={
        `p-6 bg-white border-b border-gray-200 flex-1 rounded sm:rounded-xl ` +
        containerClassName
      }
    >
      <div className="flex justify-between mb-5 items-center">
        {header}
        {modal}
        {buttonUrl && (
          <Link
            href={buttonUrl}
            className="inline-flex items-center px-4 py-2 bg-hkblue border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-hkblue transition ease-in-out duration-150 hover:bg-hkgreen"
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
