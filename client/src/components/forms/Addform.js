import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { apiUri } from "../shared/apiUri";

export default function Betform() {
  const changeModal = useContext(ModalContext);
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    site: "",
    betString: "",
  });

  useEffect(() => {
    fetch(`${apiUri}/sites`)
      .then((res) => res.json())
      .then((result) => {
        setInformation(result);
        setLoading(false);
      });
  }, []);

  function handleClose(e) {
    e.preventDefault();
    if (e.target.id === "add" || e.type === "submit") {
      fetch(`${apiUri}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.code !== 201) {
            changeModal({ hidden: true, type: "" });
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
    let newInput = Object.assign({}, data);
    newInput[id] = value;
    setData(newInput);
  }

  if (!loading) {
    return (
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add bet</p>
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
              <label className="label">Site</label>
              <div className="control">
                <div className="select">
                  <select onChange={handleInputChange} id="site">
                    <option>Select site</option>
                    {information.map(site => {
                      return (
                        <option key={site.name}>{site.name}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Bet string</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  value={data.betString}
                  onChange={handleInputChange}
                  id="betString"
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
  } else {
    return <div></div>;
  }
}
