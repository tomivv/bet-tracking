import React, { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

export default function Nav() {
  const changeModal = useContext(ModalContext);
  function handleBtn(e) {
    e.preventDefault();
    changeModal({ hidden: false, type: e.target.id });
  }
  return (
    <nav className="level" role="navigation" aria-label="main navigation">
      <div className="level-item">
        <button className="button is-black" onClick={handleBtn} id="bet">
          Add bet
        </button>
      </div>
    </nav>
  );
}
