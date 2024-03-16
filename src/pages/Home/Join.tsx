import {
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonText,
  IonRouterContext,
  IonAlert,
  IonButton,
  IonImg,
  IonRippleEffect,
} from "@ionic/react";
import "./Join.css";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";
import { Geolocation } from "@capacitor/geolocation";
import { locationSharp } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";

import Destination from "../Destination";

import pin from "/assets/images/pin.svg";
import startRide from "/assets/images/drive.png";
import scheduleRide from "/assets/images/calendar.png";

import getDirections from "../../functions/getDirections";
import getUser from "../../functions/getUser";

import LatLng from "../../types/LatLng";

const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;
const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

const mapOptions = {
  disableDefaultUI: true,
  keyboardShortcuts: false,
  mapId: mapId,
  clickableIcons: false,
  gestureHandling: "greedy",
};

const polylineOptions = {
  strokeColor: "#000",
  strokeOpacity: 1,
  strokeWeight: 4,
};

const Join = (props: any) => {
  const [centerLatLng, setCenterLatLng] = useState<LatLng>();
  const [polylineCords, setPolylineCords] = useState<any>();
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [mapLibraries, setMapLibraries] = useState<any>(["places"]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isFirstCall, setIsFirstCall] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isSecondCall, setIsSecondCall] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(80);
  const [sourceInputValue, setSourceInputValue] = useState<string>(
    "Your current location"
  );
  const [destinationInputValue, setDestinationInputValue] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSourceValid, setIsSourceValid] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();
  const [origin, setOrigin] = useState<any>({ lat: 19.0989, lng: 72.8515 });
  const [destination, setDestination] = useState({
    lat: 19.11867,
    lng: 72.84799,
  });

  const modal = useRef<HTMLIonModalElement>(null);
  const confirmModalRef = useRef<HTMLIonModalElement>(null);

  let debounceTimer: any;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: mapLibraries,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "calc(" + height + "% - 70px)",
    transition: "height 0.5s ease",
  };

  useEffect(() => {
    if (props.selectedTab === "tab1") {
      setHeight(80);
    } else {
      setHeight(75);
    }
  }, [props.selectedTab]);

  const renderDirection = () => {
    let directions: any;
    const fetchDirection = async () => {
      let origin = localStorage.getItem("sourceLatLng");
      let destination = localStorage.getItem("destinationLatLng");
      if (!origin || !destination) {
        return;
      }
      origin = JSON.parse(origin);
      destination = JSON.parse(destination);
      directions = await getDirections(origin, destination);
      console.log("directions", directions);
      localStorage.setItem("polylineCoordinates", JSON.stringify(directions));
      props.handleJoinMapClick();
    };
    fetchDirection();
  };

  useEffect(() => {
    const getUserDetails = async () => {
      let user = await getUser();
    };
    getUserDetails();
    getCenterPlace();
  }, []);

  useEffect(() => {
    if (mapRef !== null) {
      setCurrentLocationAsSource();
    }
  }, [mapRef]);

  const handleOnLoad = (map: any) => {
    setMapRef(map);
  };

  const getCurrentLocation = async () => {
    let position: any;
    const getCurLoc = async () => {
      try {
        position = await Geolocation.getCurrentPosition();
      } catch (error) {
        console.error("Error getting current position:", error);
      }
    };
    await getCurLoc();
    return {
      lat: position?.coords?.latitude,
      lng: position?.coords?.longitude,
    };
  };

  const handleClick = (e: any) => {
    console.log(
      "Success: Clicked to: " + e.latLng.lat() + "," + e.latLng.lng()
    );
  };

  const handleMapCenterChanged = () => {
    if (!isReady) {
      setIsReady(true);
      return;
    }
    const newCenter = mapRef?.getCenter();
    let sourceLatLng = {
      lat: newCenter?.lat(),
      lng: newCenter?.lng(),
    };
    localStorage.setItem("sourceLatLng", JSON.stringify(sourceLatLng));
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      getCenterPlace();
      modal?.current?.present();
    }, 500);
  };

  const handleDestinationClick = () => {
    modal?.current?.present();
  };

  const setCurrentLocationAsSource = async () => {
    let currentLocation: any = await getCurrentLocation();
    console.log("curr loc", currentLocation);
    setOrigin(origin);
    localStorage.setItem("sourceLatLng", JSON.stringify(origin));
    setCenterLatLng(currentLocation);
    setIsSourceValid(true);
  };

  const getCenterPlace = () => {
    const center = mapRef?.getCenter();
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: center }, (results, status) => {
      if (status === "OK") {
        if (!results) {
          return "";
        }
        if (results[0]) {
          setSourceInputValue(results[0].formatted_address);
          setIsSourceValid(true);
          localStorage.setItem("sourceInput", results[0].formatted_address);
        } else {
          console.log("No results found");
          return "";
        }
      } else {
        console.error("Geocoder failed due to: " + status);
        return "";
      }
    });
  };

  return (
    <>
      <IonContent>
        <div style={mapContainerStyle}>
          {!isLoaded ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : (
            <GoogleMap
              id="map"
              center={centerLatLng}
              onLoad={handleOnLoad}
              zoom={15}
              mapContainerStyle={{ height: "100%" }}
              onClick={(e) => handleClick(e)}
              onCenterChanged={handleMapCenterChanged}
              options={mapOptions}
            >
              <div className="locationPin">
                <div>
                  <IonText>Source</IonText>
                </div>
                <IonIcon icon={pin}></IonIcon>
              </div>

              {polylineCords && (
                <Polyline path={polylineCords} options={polylineOptions} />
              )}
            </GoogleMap>
          )}
        </div>
        {/* DestinationInput */}
        {props.selectedTab === "tab1" ? (
          <div
            style={{
              height: "70px",
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
                readonly={true}
                value={""}
                placeholder="Enter Destination"
                // onClick={props.hdc}
                onClick={handleDestinationClick}
              ></IonInput>
            </IonItem>
          </div>
        ) : (
          <div className="driveTabContainer">
            <IonText className="title">Select action</IonText>
            <div className="driveTab">
              <div
                className="createRideCard ion-activatable ripple-parent"
                onClick={handleDestinationClick}
              >
                <IonRippleEffect></IonRippleEffect>
                <IonImg src={startRide}></IonImg>
                <IonText>Drive Now</IonText>
              </div>
              <div
                className="scheduleRideCard ion-activatable ripple-parent"
                onClick={handleDestinationClick}
              >
                <IonRippleEffect></IonRippleEffect>
                <IonImg src={scheduleRide}></IonImg>
                <IonText>Schedule Ride</IonText>
              </div>
            </div>
          </div>
        )}

        <Destination
          setCurrentLocationAsSource={setCurrentLocationAsSource}
          sourceInputValue={sourceInputValue}
          setSourceInputValue={setSourceInputValue}
          destinationInputValue={destinationInputValue}
          setDestinationInputValue={setDestinationInputValue}
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
          isOpen={isModalOpen}
          modal={modal}
          confirmModal={confirmModalRef}
          renderDirection={renderDirection}
          setIsConfirmOpen={setIsConfirmOpen}
          isSourceValid={isSourceValid}
          setIsSourceValid={setIsSourceValid}
          selectedTab={props.selectedTab}
        />
      </IonContent>

      <IonAlert
        isOpen={isOpen}
        header={"Alert"}
        onDidDismiss={() => {
          setIsOpen(false);
        }}
        message={alertMessage}
        buttons={["OK"]}
      />
    </>
  );
};

export default Join;
