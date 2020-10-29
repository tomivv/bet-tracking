import React from "react";
import Betform from "./Betform";
import Gameform from "./Gameform";
import Teamform from "./Teamform";

export default function Modal({ showModal, setModal, modalType }) {
  if (showModal) {
    if (modalType === "bet") {
      return (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <Betform showModal={showModal} setModal={setModal} />
        </div>
      );
    } else if (modalType === "game") {
      return (
        <div className="modal is-active">
          <div className="modal-background">
            <Gameform showModal={showModal} setModal={setModal} />
          </div>
        </div>
      );
    } else if (modalType === "team") {
      return (
        <div className="modal is-active">
          <div className="modal-background">
            <Teamform showModal={showModal} setModal={setModal} />
          </div>
        </div>
      );
    }
  } else {
    return <div className="modal"></div>;
  }
}
