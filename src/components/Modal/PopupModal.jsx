import React, { useState } from "react";
import { Modal } from "antd";

const PopupModal = ({ children, visible, onCancel, closable = true }) => {
  return (
    <Modal centered={true} visible={visible} footer={null} onCancel={onCancel} closable={closable}>
      {children}
    </Modal>
  );
};

export default PopupModal;
