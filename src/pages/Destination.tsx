import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonRippleEffect,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Destination.css";
import { closeOutline, locate, locationOutline, map } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

const location = "/assets/images/location.svg";
import navigateGreen from "/assets/images/navigateGreen.svg";
import navigateGray from "/assets/images/navigateGray.svg";

import getPlaces from "../functions/getPlaces";

const Destination = (props: any) => {
  const [isSourceFocused, setIsSourceFocused] = useState(false);
  const [isDestinationFocused, setIsDestinationFocused] = useState(true);
  const [selectedInput, setSelectedInput] = useState<string>("Destination");
  const [places, setPlaces] = useState<any[]>();
  const [error, setError] = useState<any>();
  const [readonlySource, setReadonlySource] = useState<boolean>(false);
  const [confirmDisabled, setConfirmDisabled] = useState<boolean>(true);
  const [isSourceValid, setIsSourceValid] = useState<boolean>();
  const [isDestinationValid, setIsDestinationValid] = useState<boolean>(false);

  const sourceInput = useRef<HTMLIonInputElement>(null);
  const destinationInput = useRef<HTMLIonInputElement>(null);

  let debounceTimer: any;

  const handleSourceFocus = () => {
    if (props.sourceInputValue == "Your current location") {
      props.setSourceInputValue("");
    }
    setIsSourceFocused(true);
    setIsDestinationFocused(false);
    setSelectedInput("Source");
  };

  const handleDestinationFocus = () => {
    setIsSourceFocused(false);
    setIsDestinationFocused(true);
    setSelectedInput("Destination");
  };

  const fetchPlaces = async (
    query: string,
    src_lat: number,
    src_lng: number
  ) => {
    let places = await getPlaces(query, src_lat, src_lng);
    setPlaces(places.places);
  };

  const handleConfirmClick = () => {
    props.modal.current?.setCurrentBreakpoint(0);
    props.renderDirection();
  };

  const handleOnPlaceClick = (place: any) => {
    setPlaces([]);
    let placeLatLng = {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    };
    if (isSourceFocused) {
      /* 
      if source input is selected, set input text to selected place name
       */
      props.setSourceInputValue(place.name);
      props.setOrigin(placeLatLng);
      localStorage.setItem("sourceLatLng", JSON.stringify(placeLatLng));
      setIsSourceValid(true);
    } else if (isDestinationFocused) {
      let formattedAddress = place.name + ", " + place.formatted_address;
      props.setDestinationInputValue(formattedAddress);
      props.setDestination(placeLatLng);
      setIsDestinationValid(true);
      localStorage.setItem("destinationLatLng", JSON.stringify(placeLatLng));
      if (isSourceValid && isDestinationValid) {
        props.modal?.current?.setCurrentBreakpoint(0);
        props.renderDirection();
      }
      if (!props.sourceInputValue || props.sourceInputValue === null) {
        sourceInput.current?.setFocus();
        return;
      }
    }
  };

  const handleSourceChange = (event: any) => {
    setIsSourceValid(false);
    props.setIsSourceValid(false);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      props.setSourceInputValue(event.target.value);
      handleInputChange(event);
    }, 1000);
  };

  const handleDestinationChange = (event: any) => {
    setIsDestinationValid(false);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      props.setDestinationInputValue(event.target.value);
      handleInputChange(event);
    }, 1000);
  };

  const handleInputChange = (event: any) => {
    console.log("searched for", event.target.value);
    const query = event.target.value;

    let source: any = localStorage.getItem("sourceLatLng");
    if (source === null || source === undefined) {
      return;
    }
    source = JSON.parse(source);
    let lat = source.lat;
    let lng = source.lng;

    if (query.length > 2) {
      fetchPlaces(query, lat, lng);
    }
  };

  const handleCurrentLocationClick = () => {
    props.setSourceInputValue("Your current location");
    setIsSourceValid(true);
    props.setCurrentLocationAsSource();
    if (props.destinationInputValue) {
      // confirmAddress();
    }
  };

  const handleBreakpointChange = async () => {
    // if (props.modal?.current.getCurrentBreakpoint()) {
    let breakPoint = await props.modal?.current.getCurrentBreakpoint();
    if (breakPoint == 0.5) {
      // setIsSourceFocused(true);
    } else {
      setReadonlySource(false);
    }
    // }
  };

  const handleSourceClick = () => {
    props.modal?.current?.setCurrentBreakpoint(1);
    setIsSourceFocused(true);
  };

  const handleDestinationClick = () => {
    props.modal?.current.setCurrentBreakpoint(1);
    setIsDestinationFocused(true);
  };

  const handleLocateOnMapClick = () => {
    props.modal?.current?.setCurrentBreakpoint(0.4);
  };

  const handleOnCancelClick = () => {
    props.modal?.current?.setCurrentBreakpoint(0);
  };

  useEffect(() => {
    if ((isSourceValid || props.isSourceValid) && isDestinationValid) {
      setConfirmDisabled(false);
    } else {
      setConfirmDisabled(true);
    }
  }, [isSourceValid, isDestinationValid, props.isSourceValid]);

  return (
    <>
      {/* <IonPage> */}
      <IonModal
        ref={props.modal}
        isOpen={props.isModalOpen}
        initialBreakpoint={0.8}
        canDismiss={true}
        backdropBreakpoint={0.4}
        breakpoints={[0, 0.4, 0.8, 1]}
        onIonBreakpointDidChange={handleBreakpointChange}
      >
        <IonContent>
          <IonHeader>
            <IonToolbar className="modalToolbar">
              <IonButton
                slot="start"
                className="cancelButton"
                onClick={handleOnCancelClick}
              >
                Cancel
              </IonButton>
              <IonTitle style={{ textAlign: "center" }}>
                {selectedInput}
              </IonTitle>
              <IonButton
                slot="end"
                className={`confirmButton ${
                  confirmDisabled ? "confirmDisabled" : ""
                }`}
                disabled={confirmDisabled}
                onClick={handleConfirmClick}
              >
                Confirm
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <div className="placeInputForm">
            <div className="sourceBlock">
              <IonText className="blockLabel">From</IonText>

              <div
                className={`placeInputHolder ${
                  isSourceFocused
                    ? "selectedPlaceInput"
                    : "deselectedPlaceInput"
                }`}
              >
                <div
                  className={`sourceCircle ${
                    isSourceFocused ? "selectedCircle" : "deselectedCircle"
                  }`}
                ></div>

                <IonInput
                  onFocus={handleSourceFocus}
                  placeholder="Enter Source Location"
                  ref={sourceInput}
                  readonly={readonlySource}
                  className="placeInput"
                  onIonInput={handleSourceChange}
                  onClick={handleSourceClick}
                  value={props.sourceInputValue}
                ></IonInput>
                <IonButtons>
                  <IonButton
                    onClick={() => {
                      setIsSourceValid(false);
                      props.setIsSourceValid(false);
                      props.setSourceInputValue("");
                    }}
                    style={{ marginLeft: "12px" }}
                  >
                    <IonIcon icon={closeOutline}></IonIcon>
                  </IonButton>
                </IonButtons>
              </div>
            </div>
            <div className="sourceOptionsHolder">
              <div
                onClick={handleLocateOnMapClick}
                className="locateOnMapButton button ion-activatable ripple-parent"
              >
                <IonRippleEffect className="roundedRipple"></IonRippleEffect>
                <IonIcon icon={map}></IonIcon>
                <IonText>Locate on Map</IonText>
              </div>
              <div
                onClick={handleCurrentLocationClick}
                className="useCurrentLocationButton button ion-activatable ripple-parent"
              >
                <IonRippleEffect className="roundedRipple"></IonRippleEffect>
                <IonIcon icon={locate}></IonIcon>
                <IonText>Use My Current Location</IonText>
              </div>
            </div>
            <div className="line"></div>
            <div className="sourceBlock">
              <IonText className="blockLabel">
                &nbsp;To&nbsp;&nbsp;&nbsp;
              </IonText>

              <div
                className={`placeInputHolder ${
                  isDestinationFocused
                    ? "selectedPlaceInput"
                    : "deselectedPlaceInput"
                }`}
              >
                <IonIcon
                  icon={isDestinationFocused ? navigateGreen : navigateGray}
                  className="destinationNavigate"
                ></IonIcon>
                <IonInput
                  ref={destinationInput}
                  onFocus={handleDestinationFocus}
                  placeholder="Enter Destination"
                  onIonInput={handleDestinationChange}
                  className="placeInput"
                  onClick={handleDestinationClick}
                  value={props.destinationInputValue}
                ></IonInput>
                <IonButtons>
                  <IonButton
                    onClick={() => {
                      setIsDestinationValid(false);
                      props.setDestinationInputValue("");
                    }}
                    style={{ marginLeft: "12px" }}
                  >
                    <IonIcon icon={closeOutline}></IonIcon>
                  </IonButton>
                </IonButtons>
              </div>
            </div>
          </div>
          <IonText className="suggestionsText">Suggestions</IonText>
          <div className="placesList">
            {/* {places && places.length <= 0 && <div>No results</div>} */}
            {places &&
              places.length > 0 &&
              places.map((place, index) => (
                <>
                  <div
                    key={index}
                    className="ion-activatable ripple-parent placeItem"
                    onClick={() => handleOnPlaceClick(place)}
                  >
                    <div className="locationLeftHolder">
                      <IonRippleEffect></IonRippleEffect>
                      <div className="locationIconCircle">
                        <IonIcon
                          className="locationIcon"
                          icon={locationOutline}
                        ></IonIcon>
                      </div>
                      <IonText className="distanceText">
                        {place.distance.toFixed(2)} km
                      </IonText>
                    </div>
                    <div>
                      <IonText className="placeName">{place.name}</IonText>
                      <br />
                      <IonText className="placeFormattedAddress">
                        {place.formatted_address}
                      </IonText>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </IonContent>
      </IonModal>
      {/* </IonPage> */}
    </>
  );
};

export default Destination;
