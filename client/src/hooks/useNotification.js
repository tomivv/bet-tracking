import { useState, useEffect } from "react";

export default function useNotification() {
  const [notification, setNotification] = useState({
    hidden: true,
    msg: "",
    title: "",
  });

  async function changeNotification(notificationObject) {
    setNotification(notificationObject);
  }
  // TODO: tarpeellinen?
  useEffect(() => {});
  return { notification, changeNotification };
}
