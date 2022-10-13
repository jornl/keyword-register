import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Pagination({ links }) {
  const getClassName = (active) => {
    if (active) {
      return "bg-hkblue text-white";
    }
  };

  return (
    links.length > 3 && (
      <div className="mb-4">
        <div className="flex flex-wrap mt-8">
          {links.map((link, key) =>
            link.url === null ? (
              <div
                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                key={key}
              >
                {link.label}
              </div>
            ) : (
              <Link
                className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-hkgreen hover:text-white focus:border-primary focus:text-primary ${getClassName(
                  link.active
                )}`}
                key={key}
                href={link.url}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    )
  );
}
