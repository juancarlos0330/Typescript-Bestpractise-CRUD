import React from "react";
import "../assets/scss/card.scss";
import { Popconfirm } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartFilled,
} from "@ant-design/icons";

import { User } from "../types";

export type UserCardProps = {
  item: User;
  handleDelUser: (e: User) => void;
  handleLikeUser: (e: User) => void;
  handleEditUser: (e: User) => void;
};

const Card = ({
  item,
  handleDelUser,
  handleLikeUser,
  handleEditUser,
}: UserCardProps) => {
  const delConfirm = () => {
    handleDelUser(item);
  };

  return (
    <div className="card">
      <div className="user-avatar">
        <img
          className="avatar"
          src={
            "https://avatars.dicebear.com/v2/avataaars/" +
            item.username +
            ".svg?options[mood][]=happy"
          }
          alt="user avatar"
        />
      </div>

      <div className="user-detail-section">
        <p className="user-name">{item.name}</p>
        <p className="user-detail-item">
          <MailOutlined twoToneColor="#535353" />
          {item.email}
        </p>
        <p className="user-detail-item">
          <PhoneOutlined twoToneColor="#535353" />
          {item.phone}
        </p>
        <p className="user-detail-item">
          <GlobalOutlined twoToneColor="#535353" />
          https://{item.website}
        </p>
      </div>

      <div className="user-action-section">
        <div className="action-item favorite">
          <button type="button" onClick={() => handleLikeUser(item)}>
            {item.like ? <HeartFilled /> : <HeartOutlined />}
          </button>
        </div>
        <div className="action-item">
          <button type="button" onClick={() => handleEditUser(item)}>
            <EditOutlined />
          </button>
        </div>
        <div className="action-item">
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={delConfirm}
            okText="Yes"
            cancelText="No"
          >
            <button type="button">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default Card;
