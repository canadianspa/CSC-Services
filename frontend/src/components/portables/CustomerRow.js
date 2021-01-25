import React from "react";
import "./PortablesPage.css";

import { Table } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons";

function CustomerRow({ customer, index, isOpen, onClick }) {
  const {
    name,
    status,
    product,
    in_warranty,
    fault,
    notes,
    freshdesk_tickets,
  } = customer;

  return (
    <>
      <tr id={index} onClick={onClick}>
        <td>{name}</td>
        <td>{status}</td>
        <td>{product}</td>
        <td>{in_warranty ? "Yes" : "No"}</td>
        <td>{fault}</td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan="5">
            <div className="customer-row-container">
              <div className="notes-container">
                {notes.map((note, index) => (
                  <>
                    {index !== 0 && <FontAwesomeIcon icon={faLongArrowAltDown} />}
                    <div className="note">
                      <FontAwesomeIcon icon={faComment} />
                      <div>
                        <p>{note.content}</p>
                        <span>{new Date(note.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div>
                {freshdesk_tickets.map((ticket) => (
                  <div>{ticket}</div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default CustomerRow;
