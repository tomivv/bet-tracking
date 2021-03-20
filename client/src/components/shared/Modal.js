import React from "react";
import Addform from "../forms/Addform";

export default function Modal({ modal }) {
  if (!modal.hidden) {
      return (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <Addform />
        </div>
      );
  } else {
    return <div className="modal"></div>;
  }
}
