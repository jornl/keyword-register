import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Fragment, useState } from "react";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput";

export default function Department({ department = {} }) {
  let [isOpen, setIsOpen] = useState(false);
  const { data, setData, put, processing, errors, reset } = useForm({
    id: department.id ?? "",
    name: department.name ?? "",
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    put(route("departments.update", data.id), {
      data,
      onSuccess: () => {
        reset("name");
        closeModal();
      },
    });
  };

  return (
    <>
      <Link
        onClick={(event) => {
          event.preventDefault();
          openModal();
        }}
        className="text-hkblue mr-4"
      >
        <PencilSquareIcon className="w-4" />
      </Link>

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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-hkblue"
                  >
                    Endre avdeling
                  </Dialog.Title>
                  <form
                    action="post"
                    className="my-4 grid gap-5 md:max-w-md"
                    onSubmit={handleSubmit}
                  >
                    <div className="mt-2">
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
                          value={data.name || ""}
                        />
                        <InputError message={errors.name} className="mt-2" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <PrimaryButton processing={processing}>
                        Endre avdeling
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
