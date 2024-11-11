import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import { User } from "../types";
import {
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

export type EditModalProps = {
  editableUserItem: User;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (e: boolean) => void;
  updateUserInfo: (eb: User) => void;
};

const EditModal = ({
  editableUserItem,
  isEditModalOpen,
  setIsEditModalOpen,
  updateUserInfo,
}: EditModalProps) => {
  const [editedUserInfo, setEditedUserInfo] = useState<User>(editableUserItem);

  useEffect(() => {
    setEditedUserInfo(editableUserItem);
  }, [editableUserItem]);

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateUserInfo = () => {
    updateUserInfo(editedUserInfo);
    handleCancel();
  };

  if (!isEditModalOpen) return <></>;

  return (
    <Modal
      title="Edit User"
      open={isEditModalOpen}
      onCancel={handleCancel}
      onOk={handleUpdateUserInfo}
      okText="Update"
      cancelText="Cancel"
    >
      <div className="modal-form-item">
        <Input
          placeholder="Name"
          prefix={<UserOutlined />}
          defaultValue={editableUserItem.name}
          onChange={(e) => {
            setEditedUserInfo({
              ...editedUserInfo,
              name: e.target.value,
            });
          }}
        />
      </div>
      <div className="modal-form-item">
        <Input
          placeholder="Email"
          prefix={<MailOutlined />}
          defaultValue={editableUserItem.email}
          onChange={(e) => {
            setEditedUserInfo({
              ...editedUserInfo,
              email: e.target.value,
            });
          }}
        />
      </div>
      <div className="modal-form-item">
        <Input
          placeholder="Phone"
          prefix={<PhoneOutlined />}
          defaultValue={editableUserItem.phone}
          onChange={(e) => {
            setEditedUserInfo({
              ...editedUserInfo,
              phone: e.target.value,
            });
          }}
        />
      </div>
      <div className="modal-form-item">
        <Input
          placeholder="Website"
          prefix={<GlobalOutlined />}
          defaultValue={editableUserItem.website}
          onChange={(e) => {
            setEditedUserInfo({
              ...editedUserInfo,
              website: e.target.value,
            });
          }}
        />
      </div>
    </Modal>
  );
};

export default EditModal;
