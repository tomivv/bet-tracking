import React from "react";

export default function Nav({ setModal, showModal, setModaltype }) {
  function handleBtn(e) {
    e.preventDefault();
    setModaltype(e.target.id);
    setModal(!showModal);
  }
  return (
    <nav className="level" role="navigation" aria-label="main navigation">
      <div className="level-item"></div>
      <div className="level-item"></div>
      <div className="level-item">
        <button className="button is-black" onClick={handleBtn} id="team">
          Add team
        </button>
      </div>
      <div className="level-item">
        <button className="button is-black" onClick={handleBtn} id="bet">
          Add bet
        </button>
      </div>
      <div className="level-item">
        <button className="button is-black" onClick={handleBtn} id="game">
          Add game
        </button>
      </div>
      <div className="level-item"></div>
      <div className="level-item"></div>
    </nav>
  );
}
