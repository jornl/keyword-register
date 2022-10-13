import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import StatusCard from "@/Components/StatusCard";
import UserTable from "@/Components/Tables/User";
import DepartmentsTable from "@/Components/Tables/Departments";
import KeywordsTable from "@/Components/Tables/Keywords";

export default function Home(props) {
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
            buttonText="Registrer avdeling"
            buttonUrl={route("departments.create")}
          >
            <DepartmentsTable departments={props.departments} />
          </StatusCard>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-5 mt-5">
          <StatusCard
            header={
              <h2 className="font-bold text-xl">
                Nøkkelord/Stikkord ({props.keywords.total})
              </h2>
            }
            buttonText="Opprett nytt nøkkelord"
            buttonUrl={route("keywords.create")}
            containerClassName="w-full"
          >
            <div className="">
              <TextInput placeholder="Søk" className="mb-5" />
            </div>

            <KeywordsTable keywords={props.keywords} />

            <Pagination className="mt-5" links={props.keywords.links} />
          </StatusCard>
        </div>
      </div>
    </Authenticated>
  );
}
