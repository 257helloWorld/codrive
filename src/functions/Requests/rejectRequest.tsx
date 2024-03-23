import axios from "axios";

const rejectRequest = async (rideId: string, coriderId: string) => {
  let msg;
  try {
    let data = await axios.get(
      "https://codrive.pythonanywhere.com/reject_join_request",
      {
        params: {
          rideId: rideId,
          coriderId: coriderId,
        },
      }
    );

    msg = data.data?.message;
  } catch (error) {
    console.error(error);
  }
  return msg;
};

export default rejectRequest;
