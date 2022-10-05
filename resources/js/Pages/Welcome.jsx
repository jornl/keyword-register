import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import SearchBar from "@/Components/SearchBar";

export default function Welcome(props) {
  return (
    <>
      <Head title="Welcome" />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex md:justify-between md:flex-row justify-center flex-col">
            <Link href="/">
              <ApplicationLogo className="block md:h-20 w-auto text-gray-500" />
            </Link>
            <div className="px-6 py-4 sm:block">
              {props.auth.user ? (
                <Link
                  href={route("dashboard")}
                  className="text-gray-700 dark:text-gray-500 underline"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={route("login")}
                    className="text-gray-700 dark:text-gray-500 underline"
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
          <div className="banner w-full grid md:grid-cols-3 place-items-center">
            <SearchBar />
          </div>
        </main>
      </div>
    </>
  );
}
