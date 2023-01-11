import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/inertia-react";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput";

function InviteUser({ update = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
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

    post(route("users.store"), {
      data,
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  return (
    <>
      {update === false ? (
        <PrimaryButton type="button" onClick={openModal}>
          Inviter bruker
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
                    Inviter bruker
                  </Dialog.Title>
                  <form
                    action="post"
                    className="my-4 grid gap-5 md:max-w-md"
                    onSubmit={handleSubmit}
                  >
                    <div className="mt-2">
                      <InputLabel forInput="name" value="Navn" />
                      <TextInput
                        name="name"
                        required={true}
                        placeholder="Navn"
                        className="w-full"
                        handleChange={(event) =>
                          setData("name", event.target.value)
                        }
                        value={data.name || ""}
                      />
                      <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-2">
                      <InputLabel forInput="email" value="E-post adresse" />
                      <TextInput
                        name="email"
                        required={true}
                        placeholder="E-post adresse"
                        className="w-full"
                        handleChange={(event) =>
                          setData("email", event.target.value)
                        }
                        value={data.email || ""}
                      />
                      <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                      <PrimaryButton processing={processing}>
                        Inviter bruker
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

export default InviteUser;
