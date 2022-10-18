import React from "react";

function SearchList({ search, items, selectedItem }) {
  const filteredData = items.filter((item) => {
    if (search === "") {
      return item;
    } else {
      return item.name.toLowerCase().includes(search.toLowerCase());
    }
  });

  return (
    <>
      {search !== "" && (
        <ul className="fixed bg-white px-4 py-8 shadow-xl rounded-lg space-y-2">
          {filteredData.map((item) => (
            <li
              key={item.id}
              onClick={() => selectedItem(item.name)}
              className="cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchList;
