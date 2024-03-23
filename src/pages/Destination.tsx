import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonInput,
  IonModal,
  IonRippleEffect,
  IonText,
  IonTitle,
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
  const [confirmDisabled, setConfirmDisabled] = useState<boolean>(true);
  const [isSourceValid, setIsSourceValid] = useState<boolean>();
  const [isDestinationValid, setIsDestinationValid] = useState<boolean>(false);

  const sourceInput = useRef<HTMLInputElement>(null);
  const destinationInput = useRef<HTMLInputElement>(null);
  const placesListRef = useRef<HTMLDivElement>(null);
  const modalTitleRef = useRef<HTMLIonTitleElement>(null);
  const destinationModalContentRef = useRef<HTMLIonContentElement>(null);

  let debounceTimer: any;

  const handleSourceFocus = () => {
    if (props.sourceInputValue.current == "Your current location") {
      props.sourceInputValue.current = "";
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
    // if (destinationInput.current) {
    //   destinationInput.current.scrollIntoView({ behavior: "smooth" });
    // }
    destinationModalContentRef?.current?.scrollToPoint(0, 220, 500);
  };

  const handleNextClick = () => {
    props.modal.current?.setCurrentBreakpoint(0);
    props.renderDirection();
    setIsDestinationValid(false);
    setIsSourceValid(false);
  };

  const handleOnPlaceClick = (place: any) => {
    props?.modal?.current.setCurrentBreakpoint(0.8);
    setPlaces([]);
    let placeLatLng = {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    };
    if (isSourceFocused) {
      // props.sourceInputValue.current = place.name;
      if (sourceInput?.current) {
        sourceInput.current.value = place.name;
      }
      props.setOrigin(placeLatLng);
      localStorage.setItem("sourceLatLng", JSON.stringify(placeLatLng));
      localStorage.setItem("sourceInput", place.name);
      setIsSourceValid(true);
    } else if (isDestinationFocused) {
      let formattedAddress = place.name + ", " + place.formatted_address;
      props.destinationInputValue.current = formattedAddress;
      if (destinationInput?.current) {
        destinationInput.current.value = formattedAddress;
      }
      props.setDestination(placeLatLng);
      setIsDestinationValid(true);
      localStorage.setItem("destinationLatLng", JSON.stringify(placeLatLng));
      localStorage.setItem("destinationInput", place.name);
      // if (
      //   !props.sourceInputValue.current ||
      //   props.sourceInputValue.current === null
      // ) {
      //   sourceInput.current?.focus();
      //   return;
      // }
    }
    if (destinationModalContentRef.current) {
      destinationModalContentRef.current.scrollToTop(300); // Scrolls to top with animation duration of 300ms
    }
  };

  const handleSourceChange = (event: any) => {
    console.log("source changed");
    setIsSourceValid(false);
    props.setIsSourceValid(false);
    clearTimeout(debounceTimer);
    props.sourceInputValue.current = event.target.value;
    debounceTimer = setTimeout(() => {
      handleInputChange(event);
    }, 1000);
  };

  const handleDestinationChange = (event: any) => {
    setIsDestinationValid(false);
    clearTimeout(debounceTimer);
    props.destinationInputValue.current = event.target.value;
    debounceTimer = setTimeout(() => {
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
    // props.sourceInputValue.current = "Your current location";
    if (sourceInput?.current) {
      sourceInput.current.value = "Your current location";
    }
    setIsSourceValid(true);
    props.setCurrentLocationAsSource();
    if (props.destinationInputValue.current) {
      // confirmAddress();
    }
    props.modal?.current?.setCurrentBreakpoint(0.8);
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

  useEffect(() => {
    let sourceTxt = document.getElementById(
      "sourceInputTxt"
    ) as HTMLInputElement;
    if (sourceTxt) {
      sourceTxt.value = "Your current location";
    }
  }, []);

  return (
    <>
      <IonModal
        onDidDismiss={() => {
          setIsSourceValid(false);
          setIsDestinationValid(false);
        }}
        onDidPresent={() => {
          let sourceTxt = document.getElementById(
            "sourceInputTxt"
          ) as HTMLInputElement;
          if (sourceTxt) {
            sourceTxt.value = "Your current location";
          }
          props.setCurrentLocationAsSource();
          props.setIsSourceValid(true);
        }}
        id="destinationModal"
        ref={props.modal}
        isOpen={props.isModalOpen}
        initialBreakpoint={0.8}
        canDismiss={true}
        backdropBreakpoint={0.4}
        breakpoints={[0, 0.4, 0.8, 1]}
      >
        <IonContent ref={destinationModalContentRef}>
          <IonTitle
            ref={modalTitleRef}
            id="modalTitleTxt"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            {selectedInput}
          </IonTitle>
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

                <input
                  id="sourceInputTxt"
                  type="text"
                  onFocus={handleSourceFocus}
                  placeholder="Enter Source Location"
                  ref={sourceInput}
                  className="placeInput"
                  onInput={handleSourceChange}
                  onClick={handleSourceClick}
                  // value={props.sourceInputValue.current}
                ></input>
                <IonButtons>
                  <IonButton
                    onClick={() => {
                      setIsSourceValid(false);
                      props.setIsSourceValid(false);
                      props.sourceInputValue.current = "";
                      if (sourceInput.current) {
                        sourceInput.current.value = "";
                      }
                      setPlaces([]);
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
                <input
                  id="destinationInputTxt"
                  ref={destinationInput}
                  onFocus={handleDestinationFocus}
                  placeholder="Enter Destination"
                  onInput={handleDestinationChange}
                  className="placeInput"
                  onClick={handleDestinationClick}
                  // value={props.destinationInputValue.current}
                ></input>
                <IonButtons>
                  <IonButton
                    onClick={() => {
                      setIsDestinationValid(false);
                      props.destinationInputValue.current = "";
                      if (destinationInput.current) {
                        destinationInput.current.value = "";
                      }
                      setPlaces([]);
                    }}
                    style={{ marginLeft: "12px" }}
                  >
                    <IonIcon icon={closeOutline}></IonIcon>
                  </IonButton>
                </IonButtons>
              </div>
            </div>
          </div>
          <div className="actionButtonsHolder">
            <IonButton onClick={handleOnCancelClick}>Cancel</IonButton>
            <IonButton
              onClick={handleNextClick}
              disabled={confirmDisabled}
              className={`confirmButton ${
                confirmDisabled ? "confirmDisabled" : ""
              }`}
            >
              Next
            </IonButton>
          </div>
          <IonText className="suggestionsText">Suggestions</IonText>
          <div className="placesList" ref={placesListRef}>
            {/* {places && places.length <= 0 && <div>No results</div>} */}
            {places &&
              places.length > 0 &&
              places.map((place, index) => (
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
              ))}
            {places && places?.length < 10 && (
              <>
                <div className="space" style={{ height: "500px" }}></div>
              </>
            )}
          </div>
        </IonContent>
      </IonModal>
      {/* </IonPage> */}
    </>
  );
};

export default Destination;
