import moment from "moment";

import * as api from "../../api/BackendApi";

const database = "portables";
const collection = "customers";

export function createCustomer(customers, formState, onSuccess, onError) {
  var params = {
    database: database,
    collection: collection,
    body: {
      name: formState.name,
      created_at: moment().toISOString(),
      notes: [],
      product: {
        title: formState.title,
        fault: formState.fault,
        serial_numbers: formState.serial_numbers,
        in_warranty: formState.in_warranty,
      },
      links: [],
    },
  };

  api
    .dbCreate(params)
    .then((response) =>
      onSuccess({
        updatedCustomers: [...customers, response],
        callToggleModal: true,
        successMsg: "Added customer",
      })
    )
    .catch(onError);
}

export function editProduct(activeCustomer, formState, onSuccess, onError) {
  var params = {
    _id: activeCustomer._id,
    database: database,
    collection: collection,
    body: {
      product: {
        title: formState.title,
        fault: formState.fault,
        serial_numbers: formState.serial_numbers,
        in_warranty: formState.in_warranty,
      },
    },
  };

  api
    .dbUpdate(params)
    .then((response) =>
      onSuccess({
        updatedCustomer: response,
        callToggleModal: true,
        successMsg: "Updated product",
      })
    )
    .catch(onError);
}

export function addNote(activeCustomer, formState, onSuccess, onError) {
  var params = {
    _id: activeCustomer._id,
    database: database,
    collection: collection,
    body: {
      notes: [
        ...activeCustomer.notes,
        {
          content: formState.note,
          created_at: moment().toISOString(),
        },
      ],
    },
  };

  api
    .dbUpdate(params)
    .then((response) =>
      onSuccess({
        updatedCustomer: response,
      })
    )
    .catch(onError);
}

export function addLink(activeCustomer, formState, onSuccess, onError) {
  modifyLinks("add", activeCustomer, formState, onSuccess, onError, null);
}

export function deleteLink(index, activeCustomer, formState, onSuccess, onError) {
  index = parseInt(index);
  modifyLinks("delete", activeCustomer, formState, onSuccess, onError, index);
}

function modifyLinks(action, activeCustomer, formState, onSuccess, onError, index) {
  var links, callToggleModal, successMsg, errorMsg;

  if (action === "add") {
    links = [
      ...activeCustomer.links,
      {
        title: formState.urlTitle,
        url: formState.url,
      },
    ];

    callToggleModal = true;
    successMsg = "Link added";
  } else if (action === "delete") {
    links = activeCustomer.links.filter((link, idx) => idx !== index);

    callToggleModal = false;
    successMsg = "Link removed";
  }

  var params = {
    _id: activeCustomer._id,
    database: database,
    collection: collection,
    body: {
      links: links,
    },
  };

  api
    .dbUpdate(params)
    .then((response) => {
      onSuccess({
        updatedCustomer: response,
        callToggleModal: callToggleModal,
        successMsg: successMsg,
      });
    })
    .catch(onError);
}

export function archiveCustomer(activeCustomer, onSuccess, onError) {
  var params = {
    _id: activeCustomer._id,
    database: database,
    collection: collection,
    body: {
      status: "archived",
    },
  };

  api
    .dbUpdate(params)
    .then((response) =>
      onSuccess({
        updatedCustomer: response,
        callToggleModal: true,
        successMsg: "Archived customer",
      })
    )
    .catch(onError);
}
