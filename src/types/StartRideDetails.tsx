import LatLng from "./LatLng";

interface StartRideDetails {
  userId: string;
  vehicleId: string;
  totalDistance: string;
  sourceLatLng: LatLng;
  sourceInput: string;
  destinationLatLng: LatLng;
  destinationInput: string;
  isNow: boolean;
  startTime: any;
}

export default StartRideDetails;
