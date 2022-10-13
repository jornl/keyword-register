import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

function UserTable({ users }) {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-4 py-3">
            Navn
          </th>
          <th scope="col" className="px-4 py-3">
            Opprettet
          </th>
          <th className="sr-only" aria-hidden="true">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="bg-white border-b">
            <th scope="row" className="px-4 py-4 font-medium text-gray-900">
              {user.name}
            </th>
            <td className="px-4 py-4">
              {new Date(user.created_at).toLocaleDateString()}
            </td>
            <td className="flex justify-end items-center pr-4 py-4">
              <Link href={`/user/${user.id}/edit`} className="text-hkblue mr-4">
                <PencilSquareIcon className="w-4" />
              </Link>
              <Link href={`/user/${user.id}/delete`} className="text-hkblue">
                <TrashIcon className="w-4" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
