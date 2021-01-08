import React from "react";
import Modal from "./components/shared/Modal";
import Nav from "./components/Nav";
import Showbets from "./components/Showbets";
import { ModalProvider } from "./contexts/ModalContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import useModal from "./hooks/useModal";
import useNotification from "./hooks/useNotification";

function App() {
  const { notification, changeNotification } = useNotification();
  const { modal, changeModal } = useModal();
  return (
    <ModalProvider value={changeModal}>
      <NotificationProvider value={changeNotification}>
        <section className="section">
          <Nav />
          <div className="container">
            <h1 className="title has-text-centered">Bets</h1>
            <Modal modal={modal} notification={notification} />
            <Showbets />
          </div>
        </section>
      </NotificationProvider>
    </ModalProvider>
  );
}

export default App;
