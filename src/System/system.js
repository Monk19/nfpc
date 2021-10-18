// import React, { useState } from "react";
import React, { useState, Fragment } from "react";
import Table from "./table.js";
import data from "./threshold.json";

// import { TiArrowUnsorted } from "react-icons/ti";

const System = () => {
  const [contacts, setContacts] = useState(data);

  return (
    <>
      <div className="tablecontainer">
        <h3>System Threshold </h3>
        <form>
          <table>
            <thead>
              <tr>
                <th>
                  Sno
                  {/* <TiArrowUnsorted /> */}
                </th>
                <th>Defect</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => {
                return <Table contact={contact} sno={+index} />;
              })}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};
export default System;
