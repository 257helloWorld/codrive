import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonText,
} from "@ionic/react";
import "./Tab1.css";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Polygon,
  DirectionsRenderer,
  DirectionsService,
  Autocomplete,
  LoadScript,
  StandaloneSearchBox,
  AutocompleteProps,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { location, locationSharp, navigateOutline } from "ionicons/icons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

type Pointers = {
  lat: any;
  lng: any;
};

const Tab1: React.FC = () => {
  const [center, setCenter] = useState<Pointers>({
    lat: 19.0989,
    lng: 72.8515,
  });
  const [marker, setMarker] = useState({ lat: 19.0989, lng: 72.8515 });
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>();
  const [polylineCords, setPolylineCords] = useState<any>();
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const [mapLibraries, setMapLibraries] = useState<any>(["places"]);

  const autoCompleteRef = useRef<any>(null);

  const origin = { lat: 19.0989, lng: 72.8515 };
  const destination = { lat: 19.11867, lng: 72.84799 };

  const drivingMode = "DRIVING";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: mapLibraries,
  });

  const showPos = (position: any) => {
    // setCenter({
    //   lat: position.coords.latitude,
    //   lng: position.coords.longitude,
    // });
  };

  const posErr = (err: any) => {
    console.log("Error: Position: " + err);
  };

  const getUser = async () => {};
  useEffect(() => {
    console.log();
    // Call the getUser function
    getUser();
    // Get current location on load
    // getDirections();
    if (navigator?.geolocation) {
      navigator?.geolocation.getCurrentPosition(showPos, posErr);
    } else {
      alert("Error: Unable to find geolocation.");
    }
  }, []);

  // Map Load
  const handleOnLoad = (map: any) => {
    setMapRef(map);
    console.log("Map Loaded");
  };

  const handleClick = (e: any) => {
    console.log(
      "Success: Clicked to: " + e.latLng.lat() + "," + e.latLng.lng()
    );
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    console.log(origin);
  };

  const getDirections = () => {
    if (destination === undefined || origin === undefined) {
      console.log("Origin and destination not set");
      return;
    }
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;

  // Autocomplete

  const onLoad = (autocomplete: any) => {
    console.log(autocomplete);
    autoCompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    console.log("onPlaceChanged");
    if (autoCompleteRef.current !== null) {
      console.log(autoCompleteRef.current.getPlace());
    }
  };

  const directionsCallback = (result: any, status: any) => {
    if (status === "OK") {
      setDirections(result);
      setPolylineCords(result?.routes[0]?.overview_path);
      console.log("direction", result);
    } else {
      console.error(`Error fetching directions: ${status}`);
    }
  };

  const handleMapCenterChanged = () => {
    const newCenter = mapRef?.getCenter();
    let lat = newCenter?.lat();
    let lng = newCenter?.lng();
    // setCenter({ lat: lat, lng: lng });
  };
  return (
    <>
      <IonContent>
        {!isLoaded ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <IonContent>
            <GoogleMap
              center={center}
              onLoad={handleOnLoad}
              zoom={18}
              mapContainerStyle={{
                width: "100%",
                height: "calc(100% - 70px)",
              }}
              onClick={(e) => handleClick(e)}
              onCenterChanged={handleMapCenterChanged}
              options={{
                disableDefaultUI: true,
                keyboardShortcuts: false,
                mapId: mapId,
                clickableIcons: false,
                gestureHandling: "greedy",
              }}
            >
              {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <input
                    type="text"
                    placeholder="Search Places"
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `240px`,
                      height: `32px`,
                      padding: `0 12px`,
                      borderRadius: `3px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                      fontSize: `14px`,
                      outline: `none`,
                      textOverflow: `ellipses`,
                      position: "absolute",
                      left: "50%",
                      marginLeft: "-120px",
                    }}
                  />
                </Autocomplete> */}
              <MarkerF
                position={marker}
                animation={window.google.maps.Animation.DROP}
                // label={"You"}
              />

              {/* <DirectionsService
                  options={{
                    destination: destination,
                    origin: origin,
                    travelMode: google.maps.TravelMode.DRIVING,
                    // provideRouteAlternatives: true,
                  }}
                  callback={directionsCallback}
                /> */}

              {/* {directions && (
              <DirectionsRenderer
              options={{
                preserveViewport: false,
                polylineOptions: {
                  strokeColor: "black",
                  strokeOpacity: 0.5,
                  strokeWeight: 5,
                },
              }}
                    directions={directions}
                  />
                )} */}

              {/* {polylineCords && (
              <Polyline
                path={polylineCords}
                options={{
                  strokeColor: "#0000FF",
                  strokeOpacity: 1,
                  strokeWeight: 4,
                }}
              />
            )} */}
            </GoogleMap>

            {/* DestinationInput */}
            <div
              style={{
                height: "70px",
                // backgroundColor: "red",
                display: "flex",
              }}
            >
              <IonItem lines="none" id="destinationInputHolder">
                <IonIcon
                  slot="start"
                  icon={locationSharp}
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                  color="black"
                ></IonIcon>
                <IonInput
                  id="destinationInput"
                  disabled={true}
                  placeholder="Enter Destination"
                ></IonInput>
              </IonItem>
            </div>
          </IonContent>
        )}
      </IonContent>
    </>
  );
};

export default Tab1;
