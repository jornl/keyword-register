import React, { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/inertia-react";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput";

function CreateUpdateKeyword({
  keyword = {},
  departments = [],
  update = false,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(
    keyword.department ?? ""
  );

  const { data, setData, post, put, processing, errors, reset } = useForm({
    id: keyword.id ?? "",
    department_id: keyword.department_id ?? "",
    keyword: keyword.keyword ?? "",
    additional_info: keyword.additional_info ?? "",
  });

  const filteredDepartments =
    query === ""
      ? departments
      : departments.filter((department) => {
          return department.name.toLowerCase().includes(query.toLowerCase());
        });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    data["department_id"] = selectedDepartment.id;

    if (update === true) {
      put(route("keywords.update", data.id), {
        data,
        onSuccess: () => {
          reset("keyword");
          closeModal();
        },
      });
    } else {
      post(route("keywords.store"), {
        data,
        onSuccess: () => {
          reset("keyword");
          closeModal();
        },
      });
    }
  };

  return (
    <>
      {update === false ? (
        <PrimaryButton type="button" onClick={openModal}>
          Opprett Nøkkelord
        </PrimaryButton>
      ) : (
        <Link
          as="button"
          type="button"
          onClick={openModal}
          className="text-hkblue mr-4"
        >
          <PencilSquareIcon className="w-4" />
        </Link>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-hkblue"
                  >
                    {update === true ? "Endre" : "Opprett"} nøkkelord
                  </Dialog.Title>
                  <form
                    action="post"
                    className="my-4 grid gap-5 md:max-w-md"
                    onSubmit={handleSubmit}
                  >
                    <div className="mt-2">
                      <InputLabel forInput="keyword" value="Nøkkelord" />
                      <TextInput
                        name="keyword"
                        required={true}
                        placeholder="Nøkkelord"
                        className="w-full"
                        handleChange={(event) =>
                          setData("keyword", event.target.value)
                        }
                        value={data.keyword || ""}
                      />
                      <InputError message={errors.keyword} className="mt-2" />
                    </div>

                    <div className="mt-2">
                      <InputLabel forInput="department_id" value="Avdeling" />
                      <Combobox
                        name="department_id"
                        value={selectedDepartment}
                        onChange={setSelectedDepartment}
                      >
                        <div className="relative overflow-hidden">
                          <Combobox.Input
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={(department) => department.name}
                            className="border-gray-300 rounded-md shadow-sm w-full focus:ring-0 focus:border-hkblue focus:border-hkblue"
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
                                `relative cursor-pointer select-none py-2 pl-3  ${
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

                    <div className="mt-2">
                      <InputLabel
                        forInput="additional_info"
                        value="Tilleggsinformasjon"
                      />
                      <TextInput
                        name="additional_info"
                        placeholder="Tillegsinformasjon"
                        className="w-full"
                        handleChange={(event) =>
                          setData("additional_info", event.target.value)
                        }
                        value={data.additional_info || ""}
                      />
                      <InputError
                        message={errors.additional_info}
                        className="mt-2"
                      />
                    </div>

                    <div className="mt-4">
                      <PrimaryButton processing={processing}>
                        {update === true ? "Endre" : "Opprett"} nøkkelord
                      </PrimaryButton>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CreateUpdateKeyword;
