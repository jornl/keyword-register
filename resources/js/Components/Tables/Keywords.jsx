import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import CreateUpdateKeyword from "../Modals/CreateUpdateKeyword";

function Keywords({ keywords, departments }) {
  const deleteKeyword = (event, keyword) => {
    event.preventDefault();

    if (confirm(`Er du sikker på at du vil slette ${keyword.keyword}`)) {
      Inertia.delete(route("keywords.destroy", keyword.id));
    }
  };

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-4 py-3">
            Stikkord
          </th>
          <th scope="col" className="px-4 py-3">
            Avdeling
          </th>
          <th scope="col" className="px-4 py-3">
            Informasjon
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
            <td className="px-4 py-4">{keyword.additional_info}</td>
            <td className="px-4 py-4">
              {new Date(keyword.created_at).toLocaleDateString()}
            </td>
            <td className="px-4 py-4">{keyword.user.name}</td>
            <td className="flex justify-end items-center pr-4 py-4">
              <CreateUpdateKeyword
                keyword={keyword}
                departments={departments}
                update={true}
              />
              <Link
                as="button"
                className="text-hkblue"
                onClick={(event) => deleteKeyword(event, keyword)}
              >
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
