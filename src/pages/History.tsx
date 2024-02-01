import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonPage,
  IonRouterContext,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./History.css";
import navigate from "/assets/images/navigate.svg";
import { navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";

const Tab: React.FC = () => {
  const loopArray = [1, 2, 3, 4];
  const ionRouterContext = useContext(IonRouterContext);
  const handleRideInfoClick = () => {
    ionRouterContext.push("/rideInfo", "forward");
  };
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center" }}>Ride History</IonTitle>
            <IonButtons slot="end">
              <div style={{ marginRight: "50px" }}></div>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {loopArray.map((key) => (
            <div className="historyCard" key={key}>
              <IonText className="dateTime">28 Sep, 23 | 13 : 15</IonText>
              <div className="locationsContainer">
                <IonText className="cardLocation">
                  M. L. Dahanukar College of Commerce, Vile ...
                </IonText>
                <IonImg src={navigate} className="navigateIcon"></IonImg>
                <IonText className="cardLocation">
                  Chhatrapati Shivaji Maharaj Chowk, Andheri (E)
                </IonText>
              </div>
              <IonButton
                onClick={handleRideInfoClick}
                className="viewDetailsBtn"
              >
                View Details
              </IonButton>
            </div>
          ))}

          <p style={{ paddingBottom: "30px" }}></p>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab;
