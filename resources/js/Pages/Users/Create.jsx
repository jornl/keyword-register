import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Create(props) {
  return (
    <AuthenticatedLayout auth={props.auth} errors={props.errors}>
      Hello World. Como es das
    </AuthenticatedLayout>
  );
}

export default Create;
