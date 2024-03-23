import axios from "axios";

const getRideDetails = async (rideId: string) => {
  let ridesDetails;
  try {
    let data = await axios.get("https://codrive.pythonanywhere.com/get_ride", {
      params: {
        rideId: "LknG10qarBrKgoYnTAmj",
      },
    });

    ridesDetails = data.data;
  } catch (error) {
    console.log("error", error);
  }
  return ridesDetails;
};

export default getRideDetails;
