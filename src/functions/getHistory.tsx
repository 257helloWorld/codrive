import axios from "axios";

const getHistory = async () => {
  let history;
  try {
    let data = await axios.get(
      "https://codrive.pythonanywhere.com/get_history",
      {
        params: {
          userId: "zoRqVAbw0ZI13ndOs0ni",
        },
      }
    );

    history = data.data;
  } catch (error) {
    console.error(error);
  }
  return history;
};

export default getHistory;
