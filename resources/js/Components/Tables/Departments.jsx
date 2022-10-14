import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

function Departments({ departments }) {
  const deleteDepartment = (departmentId) => {
    // Inertia.delete(route("departments.destroy", departmentId));
  };

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-4 py-3">
            Navn
          </th>
          <th scope="col" className="px-4 py-3">
            Registrert
          </th>
          <th scope="col" className="px-4 py-3">
            Registrert av
          </th>
          <th className="sr-only" aria-hidden="true">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {departments.map((department) => (
          <tr key={department.id} className="bg-white border-b">
            <th scope="row" className="px-4 py-4 font-medium text-gray-900">
              {department.name}
            </th>
            <td className="px-4 py-4">
              {new Date(department.created_at).toLocaleDateString()}
            </td>
            <td className="px-4 py-4">{department.user.name}</td>
            <td className="flex justify-end items-center pr-4 py-4">
              <Link
                href={route("departments.edit", department.id)}
                className="text-hkblue mr-4"
              >
                <PencilSquareIcon className="w-4" />
              </Link>
              <form className="" onSubmit={deleteDepartment(department.id)}>
                <Link as="button" type="button" className="text-hkblue">
                  <TrashIcon className="w-4" />
                </Link>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Departments;
