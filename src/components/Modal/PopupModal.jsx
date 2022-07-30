import React, { useState } from "react";
import { Modal } from "antd";

const PopupModal = ({ children, visible, onCancel }) => {
  return (
    <Modal centered={true} visible={visible} footer={null} onCancel={onCancel}>
      {children}
    </Modal>
  );
};

export default PopupModal;
