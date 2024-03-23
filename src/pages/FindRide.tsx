import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLoading,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useEffect, useRef, useState } from "react";
import { Loader, LoaderOptions } from "google-maps";
import "./FindRide.css";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import {
  carSportOutline,
  codeSlashOutline,
  person,
  personCircleOutline,
  personOutline,
} from "ionicons/icons";
import searchRides from "../functions/searchRides";
import firestore from "../services/firebase";
import { Firestore, doc, getDoc } from "@firebase/firestore";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import JoinRideDetails from "../types/JoinRideDetails";
import joinRide from "../functions/joinRide";

const mapOptions = {
  disableDefaultUI: true,
  keyboardShortcuts: false,
  clickableIcons: false,
  gestureHandling: "greedy",
};

function Directions(props: any) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  const bounds = new google.maps.LatLngBounds();

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsRenderer.setOptions({
      polylineOptions: {
        strokeColor: "#000",
        strokeWeight: 4,
        strokeOpacity: 0.9,
      },
      suppressMarkers: true,
    });
    directionsService
      .route({
        origin: props.sourceLatLng,
        destination: props.destinationLatLng,
        travelMode: google.maps.TravelMode.DRIVING,
        // provideRouteAlternatives: true,
      })
      .then((response: any) => {
        console.log("renderer response", response);
        props.setDistance(response?.routes[0]?.legs[0]?.distance?.text);
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;
}

function FindRide(props: any) {
  const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchRidesLoading, setIsSearchRidesLoading] =
    useState<boolean>(false);
  const [polylineCords, setPolylineCords] = useState<any>();
  const [sourceLatLng, setSourceLatLng] = useState<any>();
  const [destinationLatLng, setDestinationLatLng] = useState<any>(
    localStorage.getItem("destinationLatLng")
  );
  const [rides, setRides] = useState<any[]>();
  const [distance, setDistance] = useState<string>();
  const [destinationInput, setDestinationInput] = useState<any>(
    localStorage.getItem("destinationInput")
  );
  const [sourceInput, setSourceInput] = useState<any>(
    localStorage.getItem("sourceInput")
  );
  const [balance, setBalance] = useState<number>();
  const [center, setCenter] = useState<any>({
    lat: 19.0989,
    lng: 72.8515,
  });

  const [joinMapRef, setJoinMapRef] = useState<google.maps.Map>();

  const [mapHeight, setMapHeight] = useState<number>(90);
  const mapLibraries: any = ["places"];
  var bounds = new google.maps.LatLngBounds();

  const searchRidesModal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let data = JSON.parse(user);
      let balance = data.Balance;
      setBalance(balance);
    }
    let src = localStorage.getItem("sourceLatLng");
    let dest = localStorage.getItem("destinationLatLng");
    if (!src || !dest) {
      return;
    }
    src = JSON.parse(src);
    dest = JSON.parse(dest);
    setSourceLatLng(src);
    setDestinationLatLng(dest);
  }, [joinMapRef]);

  useEffect(() => {
    setTimeout(() => {
      setMapHeight(60);
    }, 500);
  }, []);

  const handleSearchClick = () => {
    setIsSearchRidesLoading(true);
    let rideIds: string[] = [];
    const fetchRides = async () => {
      let data = await searchRides(sourceLatLng, destinationLatLng);
      console.log(data);
      setRides(data);
      setIsSearchRidesLoading(false);
      searchRidesModal.current?.present();
    };
    fetchRides();
  };

  const handleRequestClick = (rideId: string) => {
    let details: JoinRideDetails = {
      rideId: rideId,
      userId: "",
      pickup: sourceLatLng,
      drop: destinationLatLng,
      pickupInput: sourceInput,
      dropInput: destinationInput,
      amount: 20,
    };
    const letsJoinRide = async () => {
      let msg = await joinRide(details);
      console.log(msg);
    };
    letsJoinRide();
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center" }}>Find Ride</IonTitle>
            <IonButtons slot="end">
              <div
                style={{
                  width: "30px",
                }}
              ></div>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="findRideContent">
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={center}
              defaultZoom={10}
              mapId={mapId}
              keyboardShortcuts={false}
              clickableIcons={false}
              disableDefaultUI={true}
              style={{
                height: mapHeight + "%",
                width: "100%",
                transition: "height 0.5s ease",
              }}
              styles={[{ stylers: [] }]}
            >
              {/* <Directions
                sourceLatLng={sourceLatLng}
                destinationLatLng={destinationLatLng}
                setDistance={setDistance}
              /> */}
              <AdvancedMarker
                className="advancedMarker"
                position={sourceLatLng}
              >
                <div className="infoWindow sourceInfoWindow">{"Start"}</div>
                <div
                  className="outerCircle"
                  style={{ backgroundColor: "black" }}
                >
                  <div className="innerCircle"></div>
                </div>
              </AdvancedMarker>

              <AdvancedMarker
                className="advancedMarker"
                position={destinationLatLng}
              >
                <div className="infoWindow destinationInfoWindow">
                  {`${destinationInput}`}
                </div>
                <div
                  className="outerCircle"
                  style={{ backgroundColor: "darkgreen" }}
                >
                  <div className="innerCircle"></div>
                </div>
              </AdvancedMarker>
            </Map>
          </APIProvider>
          <div className="findSearchModal">
            <div className="charges">
              <IonText className="label">You Pay</IonText>
              <IonText className="amount">₹ 20</IonText>
            </div>
            <div className="details">
              <p>Total Distance: {distance}</p>
            </div>
            <div className="balance">
              <IonText>Wallet Balance</IonText>
              <IonText>
                <span className="amount">₹ {balance}</span>
              </IonText>
            </div>
            <div className="findBtnHolder">
              <IonButton onClick={handleSearchClick}>Search Rides</IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
      <IonLoading isOpen={isLoading}></IonLoading>

      <IonModal
        ref={searchRidesModal}
        breakpoints={[0, 0.8, 1]}
        initialBreakpoint={0.8}
      >
        <IonContent className="searchRidesModalContent">
          <IonText className="searchRidesModalTitle">Rides</IonText>
          {rides &&
            rides.length > 0 &&
            rides?.map((ride: any) => (
              <>
                <div className="rideCard" key={ride?.Id}>
                  <div className="vehicleDetails">
                    <div className="vehicleIcon">
                      <IonIcon
                        icon={carSportOutline}
                        style={{ color: "darkgray" }}
                      ></IonIcon>
                    </div>
                    <div className="vehicleName">
                      <IonText>{ride?.Vehicle?.VehicleName}</IonText>
                      <br />
                      <IonText>Fuel Type: {ride?.Vehicle?.FuelType}</IonText>
                    </div>
                    <div className="vehicleCapacity">
                      <IonIcon
                        icon={personOutline}
                        style={{ fill: "gray" }}
                      ></IonIcon>
                      <IonText>
                        {ride?.JoinedRiders} / {ride?.SeatingCapacity}
                      </IonText>
                    </div>
                  </div>
                  <div className="dashedLine"></div>
                  <div className="rideCardFooter">
                    <div className="userDetails">
                      <div className="userProfileHolder">
                        <IonImg
                          className="userProfile"
                          src={ride?.Driver?.ProfileUrl}
                        ></IonImg>
                      </div>
                      <div className="userName">
                        <IonText>{ride?.Driver?.Name}</IonText>
                        <br />
                        <IonText>Gender To be added</IonText>
                      </div>
                    </div>
                    <div className="rideCardFooterButtonHolder">
                      <IonButton onClick={() => handleRequestClick(ride?.Id)}>
                        Request
                      </IonButton>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </IonContent>
      </IonModal>
      <IonLoading isOpen={isSearchRidesLoading}></IonLoading>
    </>
  );
}

export default FindRide;

// const fetchDocuments = async () => {
//         try {
//           const q = query(
//             collection(firestore, "Rides"),
//             where("__name__", "in", rideIds)
//           );
//           let a = collection(firestore, "Rides");

//           const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             console.log(querySnapshot.docs);
//             const data = querySnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));

//             console.log(data);
//           });

//           // Return unsubscribe function to detach the listener when component unmounts
//           return unsubscribe;
//         } catch (error) {
//           console.error("Error fetching documents:", error);
//         }
//       };
