import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import StatusCard from "@/Components/StatusCard";
import UserTable from "@/Components/Tables/User";
import DepartmentsTable from "@/Components/Tables/Departments";
import KeywordsTable from "@/Components/Tables/Keywords";
import CreateUpdateDepartment from "@/Components/Modals/CreateUpdateDepartment";
import CreateUpdateKeyword from "@/Components/Modals/CreateUpdateKeyword";

export default function Home(props) {
  const [query, setQuery] = useState("");

  const filteredKeywords =
    query === ""
      ? props.keywords.data
      : props.keywords.data.filter((keyword) => {
          return keyword.keyword.toLowerCase().includes(query.toLowerCase());
        });

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Authenticated auth={props.auth} errors={props.errors}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-5">
          <StatusCard
            header={
              <h2 className="font-bold text-xl">Siste registrerte brukere</h2>
            }
            buttonText="Registrer bruker"
            buttonUrl={route("users.create")}
            containerClassName="max-w-lg"
          >
            <UserTable users={props.users} />
          </StatusCard>

          <StatusCard
            header={
              <h2 className="font-bold text-xl">
                Siste registrerte avdelinger
              </h2>
            }
            modal={<CreateUpdateDepartment />}
          >
            <DepartmentsTable departments={props.departments.latest} />
          </StatusCard>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-5 mt-5">
          <StatusCard
            header={
              <h2 className="font-bold text-xl">
                Nøkkelord/Stikkord ({props.keywords.total})
              </h2>
            }
            modal={<CreateUpdateKeyword departments={props.departments.all} />}
            containerClassName="w-full"
          >
            <div className="">
              <TextInput
                placeholder="Søk"
                className="mb-5"
                handleChange={handleInput}
              />
            </div>

            <KeywordsTable
              keywords={filteredKeywords}
              departments={props.departments.all}
            />

            <Pagination className="mt-5" links={props.keywords.links} />
          </StatusCard>
        </div>
      </div>
    </Authenticated>
  );
}
