import React, { useState } from "react";

const Render = (props) => {
  const [update, setupdate] = useState(false);

  const toggle = () => {
    setupdate(false);
  };

  const toggle1 = () => {
    setupdate(true);
  };
  return (
    <tr>
      <td> {props.sno + 1}</td>
      <td>{props.contact.Model}</td>
      <td>{props.contact.Version}</td>
      <td>{props.contact.LastUpdate}</td>
      <td>
        {/* {props.contact.Status} */}

        {update ? (
          <>
            <div onClick={(event) => toggle()}>active</div>
          </>
        ) : (
          <>
            <div onClick={() => toggle1()}>inactive</div>
          </>
        )}
      </td>
    </tr>
  );
};

export default Render;
