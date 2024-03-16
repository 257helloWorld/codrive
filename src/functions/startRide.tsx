import axios from "axios";
import StartRideDetails from "../types/StartRideDetails";

const startRide = async (d: StartRideDetails) => {
  //   let places;
  console.log(d);
  try {
    let data = await axios.get(
      "https://codrive.pythonanywhere.com/start_ride",
      {
        params: {
          userId: "zoRqVAbw0ZI13ndOs0ni",
          vehicleId: d?.vehicleId,
          totalDistance: "2km",
          s_lat: d?.sourceLatLng?.lat,
          s_lng: d?.sourceLatLng?.lng,
          s_str: d?.sourceInput,
          d_lat: d?.sourceLatLng?.lat,
          d_lng: d?.sourceLatLng?.lng,
          d_str: d?.destinationInput,
          isNow: d?.isNow,
          startTime: d?.startTime,
        },
      }
    );

    console.log(data);
  } catch (error) {
    console.log("error", error);
  }
  //   return places;
};

export default startRide;
