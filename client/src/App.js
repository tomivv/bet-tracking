import React, { useState } from "react";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import Showbets from "./components/Showbets";

function App() {
  const [modal, setModal] = useState(false);
  const [modalType, setModaltype] = useState(null);
  return (
    <section className="section">
      <Nav setModal={setModal} showModal={modal} setModaltype={setModaltype} />
      <div className="container">
        <h1 className="title has-text-centered">Bets</h1>
        <Modal showModal={modal} setModal={setModal} modalType={modalType} />
        <Showbets />
      </div>
    </section>
  );
}

export default App;
