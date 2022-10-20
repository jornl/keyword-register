import React, { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useForm } from "@inertiajs/inertia-react";

function Create(props) {
  const [query, setQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const { data, setData, post, processing, errors } = useForm({
    keyword: "",
    department_id: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    data["department_id"] = selectedDepartment.id;

    post(route("keywords.store"), data);
  };

  const filteredDepartments =
    query === ""
      ? props.departments
      : props.departments.filter((department) => {
          return department.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <AuthenticatedLayout auth={props.auth} errors={props.errors}>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                Opprett nytt stikkord
              </h1>
              <div className="my-4 md:grid md:place-items-center">
                <form
                  action="post"
                  className="flex flex-col md:flex-row gap-5"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <InputLabel forInput="keyword" value="Stikkord" />
                    <TextInput
                      name="keyword"
                      required={true}
                      placeholder="Stikkord"
                      className="w-full"
                      handleChange={(event) =>
                        setData("keyword", event.target.value)
                      }
                    />
                    <InputError message={errors.keyword} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel forInput="department" value="Avdeling" />
                    <Combobox
                      name="department_id"
                      value={selectedDepartment}
                      onChange={setSelectedDepartment}
                    >
                      <div className="relative overflow-hidden">
                        <Combobox.Input
                          onChange={(event) => setQuery(event.target.value)}
                          displayValue={(department) => {
                            console.log(department);
                            department.name;
                          }}
                          className="border-gray-300 rounded-md shadow-sm w-full"
                          placeholder="Avdeling"
                          required={true}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Combobox.Options className="absolute mt-1 max-h-80 w-80 overflow-hidden rounded-md bg-white py-1 text-base shadow-lg">
                        {filteredDepartments.map((department) => (
                          <Combobox.Option
                            key={department.id}
                            value={department}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-3 ${
                                active
                                  ? "bg-hkgreen text-white"
                                  : "text-gray-900"
                              }`
                            }
                          >
                            {department.name}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </Combobox>
                    <InputError
                      message={errors.department_id}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <InputLabel forInput="extra" value="Tilleggsinformasjon" />
                    <TextInput
                      name="extra"
                      required={false}
                      placeholder="Tilleggsinformasjon"
                      className="w-full"
                      handleChange={(event) =>
                        setData("extra", event.target.value)
                      }
                    />
                    <InputError message={errors.extra} className="mt-2" />
                  </div>
                  <PrimaryButton processing={processing}>Opprett</PrimaryButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Create;
