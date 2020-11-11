import React, { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
const apiUri = "http://localhost:3001";

export default function Gameform() {
  const changeModal = useContext(ModalContext);
  const [formdata, setFormdata] = useState({
    name: "",
  });
  const [serverResponse, setServerResponse] = useState("");

  function handleClose(e) {
    e.preventDefault();
    if (e.target.id === "add" || e.type === "submit") {
      fetch(`${apiUri}/games`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.code !== 201) {
            setServerResponse(result.msg);
          } else {
            changeModal({ hidden: true, type: "" });
          }
        });
    } else {
      changeModal({ hidden: true, type: "" });
    }
  }

  function handleInputChange(e) {
    const id = e.target.id;
    let value = e.target.value;
    if (id === "amount" || id === "odds") {
      if (value.length > 0) {
        value = parseFloat(value);
      }
    }

    let newInput = Object.assign({}, formdata);
    newInput[id] = value;
    setFormdata(newInput);
  }
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Add new game</p>
        <button
          className="delete"
          aria-label="close"
          onClick={handleClose}
          id="cancel"
        ></button>
      </header>
      <section className="modal-card-body">
        <form onSubmit={handleClose}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="League of Legends"
                value={formdata.name}
                onChange={handleInputChange}
                id="name"
              />
            </div>
            <p class="help is-danger">{serverResponse}</p>
          </div>
        </form>
      </section>
      <footer className="modal-card-foot">
        <button className="button is-success" onClick={handleClose} id="add">
          Add
        </button>
        <button className="button" onClick={handleClose} id="cancel">
          Cancel
        </button>
      </footer>
    </div>
  );
}
