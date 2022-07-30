import React, { useState } from "react";

const useModalHook = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(!visible);
  };

  const closeModal = () => {
    setVisible(!visible);
  };

  return { visible, showModal, closeModal };
};

export default useModalHook;
