import { useState, useEffect } from "react";

export default function useModal() {
  const [modal, setModal] = useState({
    hidden: true,
    type: "",
  });

  async function changeModal(notificationObject) {
    setModal(notificationObject);
  }
  // TODO: tarpeellinen?
  useEffect(() => {});
  return { modal, changeModal };
}
