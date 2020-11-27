import React from "react";
import "./ShippingCreatePage.css";

import { Button } from "reactstrap";
import { SelectForm, Header } from "../../Shared";
import ItemsTable from "./ItemsTable";

function ItemsView({ items, formState, updateFormState }) {
  function handleAddItem(newItem) {
    var updatedItems = [...formState.items];
    var index = updatedItems.findIndex((item) => item._id === newItem._id);

    if (index > -1) {
      updatedItems[index].quantity += 1;
    } else {
      updatedItems.push({ ...newItem, quantity: 1 });
    }

    updateFormState(updatedItems, "items");
  }

  function handleDeleteItem(index) {
    var updatedItems = [...formState.items];

    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    } else {
      updatedItems.splice(index, 1);
    }

    updateFormState(updatedItems, "items");
  }

  function calculateWeight() {
    var total = 0;
    formState.items.forEach((item) => {
      total += item.quantity * item.weight;
    });
    return total;
  }

  return (
    <>
      <Header>Items</Header>
      <div className="items-container">
        <div>
          <ItemsTable items={formState.items} handleDeleteItem={handleDeleteItem} />
          {formState.items.length > 0 && (
            <h6>Total weight: {calculateWeight()} kg</h6>
          )}
        </div>
        <div className="items-menu">
          <Header>Select Item</Header>
          <SelectForm
            options={items}
            onSubmit={handleAddItem}
            useObjects={true}
            optionKey="name"
            children={
              <Button
                size="sm"
                color="primary"
                style={{ marginTop: "10px" }}
                type="submit"
              >
                Add
              </Button>
            }
            inputStyle={{ height: "200px" }}
          />
        </div>
      </div>
    </>
  );
}

export default ItemsView;
