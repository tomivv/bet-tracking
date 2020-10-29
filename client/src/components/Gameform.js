import React, { useState } from "react";

export default function Gameform({ showModal, setModal }) {
  const [formdata, setFormdata] = useState({
    name: "",
  });

  function handleClose(e) {
    e.preventDefault();
    if (e.target.id === "add") {
      console.log("adding new data...");
      fetch("http://localhost:3001/games", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    }
    setModal(!showModal);
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
        <form>
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
