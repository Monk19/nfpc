import React, { useState } from "react";
import Render from "./Render.js";
import System from "../System/system.js";
import data from "./data.json";
// import { TiArrowUnsorted } from "react-icons/ti";
import "./model.Modules.css";

const Modelstatuslist = (props) => {
  const [contacts, setContacts] = useState(data);
  const [value, setvalue] = useState("");
  const [version, setversion] = useState("");
  const [newfile, setNewfile] = useState(null);
  const [imgname, setImgName] = useState("");

  const uploaddata = (event) => {
    event.preventDefault();
  
if(value){
  if(version){
 
    const newContact = {
      Model: value,
      Version: version,
      LastUpdate:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear(),
      Status: "inactive"
    };

    
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    setNewfile("");
    setImgName("");
    setvalue("");
    setversion("");
  }}
  };

  const handleChange = (event) => {
    setNewfile(URL.createObjectURL(event.target.files[0]));
    setImgName(event.target.files[0].name);
  };

  return (
    <>
      <div className="div-model-1">
        <div className="tablecontainer">
          <h3>Model Status List</h3>
          <form>
            <table >
              <thead >
                <tr>
                  <th>
                    Sno
                    {/* <TiArrowUnsorted /> */}
                  </th>
                  <th>Model</th>
                  <th>Version</th>
                  <th>LastUpdate</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((contact, index) => {
                  return <Render contact={contact} sno={+index} />;
                })}
              </tbody>
            </table>
          </form>
        </div>

        <div>
          <System />
        </div>
      </div>

      {/* below is insertion page */}
      <div className="div-model-2">
        <div>
          <h3>Upload a model</h3>
          <form>
            <label className="option" for="selectList">
              Select Model
            </label>
            <input
              className="select"
              type="text"
              name="selectList"
              placeholder="Enter a Model Name..."
              // required="true"
              required
              // requiredTxt
              // onChange={(e) => addchange(e)}
              onChange={(e) => setvalue(e.target.value)}
              // value={value}
              maxlength="20"
             
              
            />
            <label className="option" for="Version">
              Version
            </label>
            <input
              className="select"
              type="text"
              name="Version"
              placeholder="Enter a Version..."
              // required="true"
              required
              // onChange={handleAddFormChange}
              onChange={(e) => setversion(e.target.value)}
              value={version}
            />

            
            <label for="fileInput" className="option">
              Upload file
            </label>
            <label htmlFor="fileInput">
              <input type="text" value={imgname} className="select" />
              Browse
            </label>
            <input
              className="select"
              type="file"
              id="fileInput"
              // accept=".jpg, .jpeg, .png"
              onChange={(e) => handleChange(e)}
              style={{ display: "none" }}
            />
            <button
              onClick={(e) => {
                uploaddata(e);
              }}>
              Upload
            </button>
          </form>
        </div>
      </div>
      {/* {value.length} */}
    </>
  );
};
export default Modelstatuslist;
