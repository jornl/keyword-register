import React from "react";

function Activities({ activities }) {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-4 py-3">
            Aktivitet
          </th>
          <th scope="col" className="px-4 py-3">
            Utført
          </th>
          <th scope="col" className="px-4 py-3">
            Utført av
          </th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity.id} className="bg-white border-b">
            <th scope="row" className="px-4 py-4 font-medium text-gray-900">
              {activity.name}
            </th>
            <td className="px-4 py-4">
              {new Date(activity.created_at).toLocaleDateString()}
            </td>
            <td className="flex justify-end items-center pr-4 py-4">
              Jørn Lemika
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Activities;
