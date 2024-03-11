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
import {
  GoogleMap,
  useJsApiLoader,
  OverlayView,
  Marker,
  LoadScript,
  Polygon,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Loader, LoaderOptions } from "google-maps";
import "./FindRide.css";
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

function FindRide(props: any) {
  const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [polylineCords, setPolylineCords] = useState<any>();
  const [sourceLatLng, setSourceLatLng] = useState<any>();
  const [destinationLatLng, setDestinationLatLng] = useState<any>(
    localStorage.getItem("destinationLatLng")
  );
  const [distance, setDistance] = useState<string>();
  const [destinationInput, setDestinationInput] = useState<any>(
    localStorage.getItem("destinationInput")
  );
  const [balance, setBalance] = useState<number>();
  const [center, setCenter] = useState<any>({
    lat: 19.0989,
    lng: 72.8515,
  });

  const [joinMapRef, setJoinMapRef] = useState<google.maps.Map>();
  const mapLibraries: any = ["places"];
  var bounds = new google.maps.LatLngBounds();
  function Directions() {
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
          console.log("renderer response", response);
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
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;
  }

  const handleOnLoad = (map: any) => {
    setJoinMapRef(map);
    setTimeout(() => {
      // setIsLoading(false);
      plotPolyline();
    }, 2000);
  };

  const plotPolyline = () => {
    let polylineCoordinates = localStorage.getItem("polylineCoordinates");
    if (!polylineCoordinates) {
      return;
    }
    let directions = JSON.parse(polylineCoordinates);
    console.log("directions2", directions);
    directions?.forEach(function (coord: any) {
      bounds.extend(coord);
    });
    joinMapRef?.fitBounds(bounds);
    setPolylineCords(directions);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: mapLibraries,
  });

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let data = JSON.parse(user);
      let balance = data.Balance;
      setBalance(balance);
    }
    plotPolyline();
    let src = localStorage.getItem("sourceLatLng");
    let dest = localStorage.getItem("destinationLatLng");
    if (!src || !dest) {
      return;
    }
    src = JSON.parse(src);
    dest = JSON.parse(dest);
    setSourceLatLng(src);
    setDestinationLatLng(dest);
    plotPolyline();
  }, [joinMapRef]);

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
        <IonContent>
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={center}
              defaultZoom={10}
              mapId={mapId}
              keyboardShortcuts={false}
              clickableIcons={false}
              disableDefaultUI={true}
            >
              <Directions />
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
                  {`${distance} - ${destinationInput}`}
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
          <div className="searchModal">
            <div className="charges">
              <IonText>You Pay</IonText>
              <IonText>
                <span className="amount">₹ 20</span>($1.5 per km)
              </IonText>
            </div>
            <div className="details">
              <p>Total Distance: 12 Kms</p>
              <p>Your Balance: ₹ {balance}</p>
            </div>
            <div className="btnHolder">
              <IonButton>Search Rides</IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
      <IonLoading isOpen={isLoading}></IonLoading>
    </>
  );
}

export default FindRide;
