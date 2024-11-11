import axios from "axios";

export const fetchUserList = async () => {
  const userList = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return userList.data;
};
