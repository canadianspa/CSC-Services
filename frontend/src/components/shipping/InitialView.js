import React from "react";

import { Header, FileUploadArea } from "../Shared";

function InitialView({ onFileSubmit }) {
  return (
    <>
      <Header>Select Veeqo CSV</Header>
      <FileUploadArea type=".csv" onSubmit={onFileSubmit} />
    </>
  );
}

export default InitialView;
