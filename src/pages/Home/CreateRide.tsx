import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { memo, useEffect, useRef, useState } from "react";
import { Loader, LoaderOptions } from "google-maps";
import {
  ConfirmDetails,
  SelectCoRiders,
  SelectSchedule,
  SelectVehicle,
} from "../../components/CreateRideForm";
import "./CreateRide.css";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
// import { PathLayer } from '@deck.gl/layers';

const mapOptions = {
  disableDefaultUI: true,
  keyboardShortcuts: false,
  clickableIcons: false,
  gestureHandling: "greedy",
};

function CreateRide(props: any) {
  const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [polylineCords, setPolylineCords] = useState<any>();
  const [sourceLatLng, setSourceLatLng] = useState<any>();
  const [vehicles, setVechicles] = useState<any>([]);
  const [destinationLatLng, setDestinationLatLng] = useState<any>(
    localStorage.getItem("destinationLatLng")
  );
  const [visibleForm, setVisibleForm] = useState<number>(1);
  const [mapHeight, setMapHeight] = useState<number>(60);
  const [distance, setDistance] = useState<string>();
  const [destinationInput, setDestinationInput] = useState<any>(
    localStorage.getItem("destinationInput")
  );

  const formTabs: any = {
    1: "selectVehicle",
    2: "selectCoriders",
    3: "selectSchedule",
    4: "confirmDetails",
  };
  const [balance, setBalance] = useState<number>();
  const [center, setCenter] = useState<any>({
    lat: 19.0989,
    lng: 72.8515,
  });

  const [joinMapRef, setJoinMapRef] = useState<google.maps.Map>();
  const mapLibraries: any = ["places"];
  var bounds = new google.maps.LatLngBounds();

  const Directions = memo(() => {
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
          origin: sourceLatLng,
          destination: destinationLatLng,
          travelMode: google.maps.TravelMode.DRIVING,
          // provideRouteAlternatives: true,
        })
        .then((response: any) => {
          setDistance(response?.routes[0]?.legs[0]?.distance?.text);
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
        });

      return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer]);

    // Update direction route
    useEffect(() => {
      if (!directionsRenderer) return;
      directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex]);
    // }, [routeIndex, directionsRenderer]);

    if (!leg) return null;
  });

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    if (!user) return;
    user = JSON.parse(user);
    let vehicles = user?.Vehicles;
    setVechicles(vehicles);
    console.log();
  }, []);

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
    if (formTabs[visibleForm.toString()] === "confirmDetails") {
      setMapHeight(40);
    } else if (formTabs[visibleForm.toString()] === "selectVehicle") {
      setMapHeight(50);
    } else if (formTabs[visibleForm.toString()] === "selectSchedule") {
      setMapHeight(65);
    } else {
      setMapHeight(60);
    }
  }, [visibleForm]);
  const handleBackClick = () => {
    let container = document.getElementById("container");
    if (visibleForm > 1) {
      container?.classList.replace("visible", "invisible");
      container?.classList.replace("invisible", "visible");
      setVisibleForm(visibleForm - 1);
    }
  };

  const handleNextClick = () => {
    let container = document.getElementById("container");
    if (visibleForm < 4) {
      container?.classList.replace("visible", "invisible");
      container?.classList.replace("invisible", "visible");
      setVisibleForm(visibleForm + 1);
    }
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center" }}>Create Ride</IonTitle>
            <IonButtons slot="end">
              <div
                style={{
                  width: "30px",
                }}
              ></div>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="createRideContent">
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
                fontFamily: "Poppins",
              }}
              styles={[{ stylers: [] }]}
            >
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
              <Directions />
            </Map>
          </APIProvider>
          <div className="searchModal">
            {formTabs[visibleForm.toString()] === "selectVehicle" && (
              <SelectVehicle
                vehicles={vehicles}
                onNextClick={handleNextClick}
                onBackClick={handleBackClick}
              />
            )}
            {formTabs[visibleForm.toString()] === "selectCoriders" && (
              <SelectCoRiders
                onNextClick={handleNextClick}
                onBackClick={handleBackClick}
              />
            )}
            {formTabs[visibleForm.toString()] === "selectSchedule" && (
              <SelectSchedule
                onNextClick={handleNextClick}
                onBackClick={handleBackClick}
              />
            )}
            {formTabs[visibleForm.toString()] === "confirmDetails" && (
              <ConfirmDetails
                onNextClick={handleNextClick}
                onBackClick={handleBackClick}
              />
            )}
          </div>
        </IonContent>
      </IonPage>
      <IonLoading isOpen={isLoading}></IonLoading>
    </>
  );
}

export default CreateRide;
