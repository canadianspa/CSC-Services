import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAltV,
  faArrowsAltH,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import { InlineButton } from "../../Shared";

function ParcelForm({ formState, onFormChange, onClick }) {
  const { height, width, length, weight } = formState;

  return (
    <>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <FontAwesomeIcon icon={faArrowsAltV} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            name="height"
            min="1"
            placeholder="Height (cm)"
            value={height}
            onChange={onFormChange}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <FontAwesomeIcon icon={faArrowsAltH} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            name="width"
            min="1"
            placeholder="Width (cm)"
            value={width}
            onChange={onFormChange}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <FontAwesomeIcon
                icon={faArrowsAltH}
                style={{ transform: "rotate(-45deg)" }}
              />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            name="length"
            min="1"
            placeholder="Length (cm)"
            value={length}
            onChange={onFormChange}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <FontAwesomeIcon icon={faWeightHanging} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            name="weight"
            min="1"
            placeholder="Weight (g)"
            value={weight}
            onChange={onFormChange}
          />
        </InputGroup>
      </FormGroup>
      <InlineButton>
        <Button color="primary" name="addParcel" onClick={onClick}>
          Add Parcel
        </Button>
      </InlineButton>
    </>
  );
}

export default ParcelForm;
