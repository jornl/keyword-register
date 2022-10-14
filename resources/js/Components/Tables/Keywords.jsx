import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

function Keywords({ keywords }) {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-4 py-3">
            Nøkkelord/Stikkord
          </th>
          <th scope="col" className="px-4 py-3">
            Avdeling
          </th>
          <th scope="col" className="px-4 py-3">
            Opprettet
          </th>
          <th scope="col" className="px-4 py-3">
            Opprettet av
          </th>
          <th className="sr-only" aria-hidden="true">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {keywords.map((keyword) => (
          <tr key={keyword.id} className="bg-white border-b">
            <th scope="row" className="px-4 py-4 font-medium text-gray-900">
              {keyword.keyword}
            </th>
            <td className="px-4 py-4">{keyword.department.name}</td>
            <td className="px-4 py-4">
              {new Date(keyword.created_at).toLocaleDateString()}
            </td>
            <td className="px-4 py-4">{keyword.user.name}</td>
            <td className="flex justify-end items-center pr-4 py-4">
              <Link
                href={`/user/${keyword.id}/edit`}
                className="text-hkblue mr-4"
              >
                <PencilSquareIcon className="w-4" />
              </Link>
              <Link href={`/user/${keyword.id}/delete`} className="text-hkblue">
                <TrashIcon className="w-4" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Keywords;
