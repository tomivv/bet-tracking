import React from "react";

export default function Notification({ notification }) {
  if (notification.hidden) {
    return <div className="is-hidden"></div>;
  } else {
    return (
      <div className="notification is-link">
        <button className="delete"></button>
        {notification.msg}
      </div>
    );
  }
}
