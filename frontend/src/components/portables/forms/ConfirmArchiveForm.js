import React from "react";

import { Button } from "reactstrap";

import { InlineButton } from "../../Shared";

function ConfirmArchiveForm({ toggle, onSubmit }) {
  return (
    <InlineButton>
      <Button color="primary" onClick={toggle}>
        Cancel
      </Button>
      <Button color="danger" name="archive" onClick={onSubmit}>
        Confirm
      </Button>
    </InlineButton>
  );
}

export default ConfirmArchiveForm;
