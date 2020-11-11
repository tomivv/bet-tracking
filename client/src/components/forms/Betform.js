import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
const apiUri = "http://localhost:3001";

export default function Betform() {
  const changeModal = useContext(ModalContext);
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    game: "",
    amount: 10,
    odds: 1.76,
    home: "",
    away: "",
    bet: "",
    won: false,
  });

  useEffect(() => {
    fetch(`${apiUri}/general/information`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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
                  <select onChange={handleInputChange} id="game">
                    <option>Select Site</option>
                    {information.sites.map((site, index) => (
                      <option key={index}>{site.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Game</label>
              <div className="control">
                <div className="select">
                  <select onChange={handleInputChange} id="game">
                    <option>Select Game</option>
                    {information.games.map((game, index) => (
                      <option key={index}>{game.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">bet amount</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="10"
                  min={0}
                  value={data.amount}
                  onChange={handleInputChange}
                  step={0.01}
                  id="amount"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">bet odds</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="3.33"
                  min={1}
                  value={data.odds}
                  onChange={handleInputChange}
                  step={0.01}
                  id="odds"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Home team</label>
              <div className="control">
                <div className="select">
                  <select onChange={handleInputChange} id="home">
                    <option>Select Team</option>
                    {information.teams.map((team, index) => (
                      <option key={index}>{team.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Away team</label>
              <div className="control">
                <div className="select">
                  <select onChange={handleInputChange} id="away">
                    <option>Select Team</option>
                    {information.teams.map((team, index) => (
                      <option key={index}>{team.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Bet on team</label>
              <div className="control">
                <div className="select">
                  <select onChange={handleInputChange} id="bet">
                    <option>Select Team</option>
                    <option>{data.home}</option>
                    <option>{data.away}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Bet won</label>
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="question"
                    onChange={handleInputChange}
                    id="won"
                    value="true"
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="question"
                    defaultChecked={true}
                    onChange={handleInputChange}
                    id="won"
                    value="false"
                  />
                  No
                </label>
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
