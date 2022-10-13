import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";

export default function Welcome(props) {
  const [query, setQuery] = useState("");

  const filteredKeywords =
    query === ""
      ? props.keywords.data
      : props.keywords.data.filter((keyword) => {
          return keyword.keyword.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = (event, department) => {};

  return (
    <>
      <Head title="Welcome" />

      <div className="min-h-screen bg-gray-100 sm:items-center sm:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex md:justify-between md:flex-row justify-center flex-col">
            <Link href="/">
              <ApplicationLogo className="block md:h-20 w-auto text-gray-500" />
            </Link>
            <div className="px-6 py-4 sm:block">
              {props.auth.user ? (
                <Link
                  href={route("dashboard")}
                  className="text-gray-700 text-gray-500 underline"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={route("login")}
                    className="text-gray-700 text-gray-500 underline"
                  >
                    Log in
                  </Link>

                  <Link
                    href={route("register")}
                    className="ml-4 text-gray-700 dark:text-gray-500 underline"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </header>
        </div>

        <main className="w-full">
          <div className="banner w-full grid md:grid-cols-3 place-items-center px-6">
            <div className="search w-full md:col-start-2 relative">
              <TextInput
                name="search"
                className="block border-2 border-hkblue w-full focus:ring-0 focus:outline-hkorange focus:outline-offset-2 focus:border-hkblue rounded-full text-xl py-4 px-8"
                handleChange={handleChange}
                placeholder="Hva leter du etter?"
              />
              <button className="absolute top-0 right-0 p-3 m-2 bg-hkblue rounded-full hover:bg-hkgreen">
                <svg viewBox="0 0 512 512" className="h-6 w-6 text-white">
                  <path
                    fill="#fff"
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                  <h1 className="text-2xl font-bold mb-5">
                    Stikkord/Nøkkelord
                  </h1>
                  <div className="grid gap-5 grid-cols-4">
                    {filteredKeywords.map((keyword) => (
                      <div
                        className="px-5 py-3 bg-hkblue rounded-xl text-white flex-1 min-w-25"
                        key={keyword.id}
                        onClick={(e) => handleClick(e, keyword.department)}
                      >
                        <p className="font-bold">{keyword.keyword}</p>
                        <p className="text-sm text-gray-300">
                          <span>Avdeling:</span> {keyword.department.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Pagination links={props.keywords.links} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
