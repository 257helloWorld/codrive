import React from "react";
import axios from "axios";
const getUser = async () => {
  let user;
  try {
    let data = await axios.get("https://codrive.pythonanywhere.com/get_user", {
      params: {
        userId: "zoRqVAbw0ZI13ndOs0ni",
      },
    });
    user = data.data;
  } catch (error) {
    console.error(error);
  }
  return user;
};

export default getUser;
