import React, { useState, useEffect } from "react";
import { List } from "antd";
import { fetchUserList } from "./api/User";
import Card from "./components/Card";
import EditModal from "./components/EditModal";
import isEmpty from "./validations/is-empty";
import { User } from "./types";

const Dashboard = () => {
  const defaultUserInfo = {
    id: 0,
    username: "",
    name: "",
    email: "",
    phone: "",
    website: "",
    like: false,
  }; // initial user info

  const [users, setUsers] = useState<User[]>([]); // set users with array
  const [editableUserItem, setEditableUserItem] =
    useState<User>(defaultUserInfo); // user detail data for edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // modal flag for editing user

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    var userData = await fetchUserList();

    setUsers(
      !isEmpty(userData)
        ? userData.map((item: any) => {
            return {
              id: item.id,
              username: item.username,
              name: item.name,
              phone: item.phone,
              email: item.email,
              website: item.website,
              like: false,
            };
          })
        : []
    );
  };

  const handleDelUser = (item: User) => {
    let tempUsers = [...users];
    tempUsers.splice(tempUsers.indexOf(item), 1);
    setUsers(tempUsers);
  };

  const handleLikeUser = (item: User) => {
    let tempUsers = [...users];
    tempUsers[tempUsers.indexOf(item)].like =
      !tempUsers[tempUsers.indexOf(item)].like;
    setUsers(tempUsers);
  };

  const handleEditUser = (item: User) => {
    setIsEditModalOpen(true);
    setEditableUserItem(item);
  };

  const handleUpdateUserInfo = (editedItem: User) => {
    let tempUsers: User[] = [];
    tempUsers = [...users].map((userDetail) => {
      return userDetail.id === editedItem.id ? editedItem : userDetail;
    });
    setUsers(tempUsers);
  };

  return (
    <div className="container">
      <List
        grid={{
          gutter: 24,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <Card
              item={item}
              handleDelUser={handleDelUser}
              handleLikeUser={handleLikeUser}
              handleEditUser={handleEditUser}
            />
          </List.Item>
        )}
      />
      <EditModal
        editableUserItem={editableUserItem}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        updateUserInfo={handleUpdateUserInfo}
      />
    </div>
  );
};

export default Dashboard;
