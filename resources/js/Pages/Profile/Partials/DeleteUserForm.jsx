import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/inertia-react";

export default function DeleteUserForm({ className }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    reset();
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Slett konto</h2>

        <p className="mt-1 text-sm text-gray-600">
          Når kontoen din er slettet er det umulig å gjenopprette den.
        </p>
      </header>

      <DangerButton onClick={confirmUserDeletion}>Slett konto</DangerButton>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Er du sikker på at du vil slette kontoen din?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Når kontoen din er slettet er det umulig å gjenopprette den.
            Vennligst tast inn ditt passord for å bekrefte sletting.
          </p>

          <div className="mt-6">
            <InputLabel for="password" value="Passord" className="sr-only" />

            <TextInput
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={data.password}
              handleChange={(e) => setData("password", e.target.value)}
              className="mt-1 block w-3/4"
              isFocused
              placeholder="Passord"
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Avbryt</SecondaryButton>

            <DangerButton className="ml-3" processing={processing}>
              Slett konto
            </DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}
