import React from "react";
import Betform from "../forms/Betform";
import Gameform from "../forms/Gameform";
import Siteform from "../forms/Siteform";
import Teamform from "../forms/Teamform";

export default function Modal({ modal }) {
  if (!modal.hidden) {
    if (modal.type === "bet") {
      return (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <Betform />
        </div>
      );
    } else if (modal.type === "game") {
      return (
        <div className="modal is-active">
          <div className="modal-background">
            <Gameform />
          </div>
        </div>
      );
    } else if (modal.type === "team") {
      return (
        <div className="modal is-active">
          <div className="modal-background">
            <Teamform />
          </div>
        </div>
      );
    } else if (modal.type === "site") {
      return (
        <div className="modal is-active">
          <div className="modal-background">
            <Siteform />
          </div>
        </div>
      );
    }
  } else {
    return <div className="modal"></div>;
  }
}
