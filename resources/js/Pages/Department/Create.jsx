import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/inertia-react";
import StatusCard from "@/Components/StatusCard";

function Create(props) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("departments.store"), data);
  };

  return (
    <AuthenticatedLayout auth={props.auth} errors={props.errors}>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg">
            <StatusCard
              header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                  Opprett avdeling
                </h1>
              }
            >
              <form
                action="post"
                className="my-4 grid gap-5 md:max-w-md"
                onSubmit={handleSubmit}
              >
                <div>
                  <InputLabel forInput="name" value="Avdelingsnavn" />
                  <TextInput
                    name="name"
                    required={true}
                    placeholder="Avdelingsnavn"
                    className="w-full"
                    handleChange={(event) =>
                      setData("name", event.target.value)
                    }
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <PrimaryButton processing={processing}>Opprett</PrimaryButton>
              </form>
            </StatusCard>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Create;
