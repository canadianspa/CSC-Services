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
        toggleModal: true,
        successMsg: "Added customer",
      })
    )
    .catch((error) => {
      onError("Error updating customer");
    });
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
        toggleModal: true,
        successMsg: "Updated product",
      })
    )
    .catch((error) => {
      onError("Error updating product");
    });
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
    .catch((error) => {
      onError("Error updating product");
    });
}

export function addLink(activeCustomer, formState, onSuccess, onError) {
  modifyLinks("add", activeCustomer, formState, onSuccess, onError);
}

export function deleteLink(index, activeCustomer, formState, onSuccess, onError) {
  modifyLinks("delete", activeCustomer, formState, onSuccess, onError, index);
}

function modifyLinks(action, activeCustomer, formState, onSuccess, onError, index) {
  var links;

  if (action === "add") {
    links = [
      ...activeCustomer.links,
      {
        title: formState.urlTitle,
        url: formState.url,
      },
    ];
  } else if (action === "delete") {
    links = activeCustomer.links.filter((link, idx) => idx !== index);
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
    .then((response) =>
      onSuccess({
        updatedCustomer: response,
        toggleModal: true,
        successMsg: "Link added",
      })
    )
    .catch((error) => {
      onError("Error adding link");
    });
}
