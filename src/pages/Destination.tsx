import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Destination.css";
const location = "/assets/images/location.svg";

import { locationOutline, navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import getPlaces from "../functions/getPlaces";

const Tab: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [places, setPlaces] = useState<any[]>();
  const [error, setError] = useState<any>();

  let debounceTimer: any;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const fetchPlaces = async (
    query: string,
    src_lat: number,
    src_lng: number
  ) => {
    let places = await getPlaces(query, src_lat, src_lng);
    console.log("Places", places);
    setPlaces(places.places);
  };

  const handleDestinationChange = (event: any) => {
    const query = event.target.value;

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (query.length > 2) {
        fetchPlaces(query, 19.087877, 72.8431146);
      }
    }, 500);
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center" }}>Destination</IonTitle>
            {/* <IonButtons slot="end"> */}
            {/* <IonCard slot="end" className="div1">
              <IonAccordion value="first">
                <IonItem slot="header">
                  <IonLabel>Myself</IonLabel>
                </IonItem>
              </IonAccordion>
            </IonCard> */}
            <IonButtons slot="end">
              <div style={{ width: "50px" }}></div>
            </IonButtons>

            {/* </IonButtons> */}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div
            style={{ display: "flex", alignContent: "center", padding: "10px" }}
          >
            <div
              style={{
                backgroundColor: "green",
                borderRadius: "50%",
                width: "5px",
                height: "5px",
                alignSelf: "center",
                margin: "15px",
              }}
              // className={isFocused ? "focused" : ""}
            ></div>
            <IonInput
              // className={isFocused ? "focused" : ""}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Pickup location"
            ></IonInput>
          </div>

          <div
            style={{ display: "flex", alignContent: "center", padding: "10px" }}
          >
            <div
              style={{
                backgroundColor: "red",
                borderRadius: "50%",
                width: "5px",
                height: "5px",
                alignSelf: "center",
                margin: "15px",
              }}
              // className={isFocused1 ? "focused1" : ""}
            ></div>
            <IonInput
              onFocus={handleFocus1}
              onBlur={handleBlur1}
              placeholder="Destination"
              onIonInput={handleDestinationChange}
            ></IonInput>
          </div>
          <div style={{ height: "60%" }}>
            <h3 style={{ padding: "20px", paddingLeft: "30px" }}>
              Suggestions
            </h3>

            <IonList lines="none">
              {places &&
                places.length > 0 &&
                places.map((place) => (
                  <IonItem
                    style={{
                      width: "95%",
                      margin: "auto",
                      marginBottom: "20px",
                    }}
                    key={place.place_id}
                  >
                    <div slot="start" className="locationLeftHolder">
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
                  </IonItem>
                ))}
            </IonList>
          </div>
        </IonContent>
        <IonTabBar
          slot="bottom"
          style={{ height: "80px", backgroundColor: "#f1f1f1" }}
        >
          <IonTabButton> Locate on Map </IonTabButton>
        </IonTabBar>
      </IonPage>
    </>
  );
};

export default Tab;
