import React, { useState } from "react";
// import { useState } from "react";

const Table = (props) => {
  const handleEdit = () => {
    setedit(true);
  };
  const handleCancel = () => {
    setedit(false);
  };
  const save = (e) => {
    e.preventDefault();
    // if (!newName.trim()) {
    //   return;
    // }
    setstore("");
    setstore([editvalue]);
    seteditvalue("");
    setedit(false);
  };

  const [edit, setedit] = useState(false);
  const [editvalue, seteditvalue] = useState();
  const [store, setstore] = useState(props.contact.Score);

  return (
    <tr>
      <td> {props.sno + 1}</td>
      <td>{props.contact.Defect}</td>
      <td>
        {" "}
        {edit ? (
          <>
            <input
              type="text"
              // required="required"
              // placeholder="Enter a phone number..."
              name="phoneNumber"
              defaultValue={editvalue || store}
              onChange={(e) => seteditvalue(e.target.value)}
            />
          </>
        ) : (
          store
        )}
      </td>
      <td>
        {edit ? (
          <>
            <button type="submit" onClick={save}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <div onClick={(event) => handleEdit(event)}>Edit</div>
        )}
      </td>
    </tr>
  );
};

export default Table;
