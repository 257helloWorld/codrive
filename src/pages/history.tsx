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
import "./history.css";
import navigate from "/assets/images/navigate.svg";
import { navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";

const Tab: React.FC = () => {
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
          {/* recall below for all history rides */}
          {/* <p className="history_card">
            <p className="history_dateTime">28 Sep, 23 | 13 : 15</p>
            <div style={{ display: "flex" }}>
              <IonText className="history_location">
                M. L. Dahanukar College of Commerce, Vile ...
              </IonText>
              <IonImg src={navigate} className="history_img"></IonImg>
              <IonText className="history_location">
                Chhatrapati Shivaji Chowk, Andheri (E)
              </IonText>
            </div>
            <IonButton className="history_details">View Details</IonButton>
          </p> */}
          <p className="history_card">
            <IonText className="history_dateTime">28 Sep, 23 | 13 : 15</IonText>
            <div style={{ display: "flex" }}>
              <IonText className="history_location">
                M. L. Dahanukar College of Commerce, Vile ...
              </IonText>
              <IonImg src={navigate} className="history_img"></IonImg>
              <IonText className="history_location">
                Chhatrapati Shivaji Chowk, Andheri (E)
              </IonText>
            </div>
            <IonButton
              onClick={handleRideInfoClick}
              className="history_details"
            >
              View Details
            </IonButton>
          </p>
          <p className="history_card">
            <IonText className="history_dateTime">28 Sep, 23 | 13 : 15</IonText>
            <div style={{ display: "flex" }}>
              <IonText className="history_location">
                M. L. Dahanukar College of Commerce, Vile ...
              </IonText>
              <IonImg src={navigate} className="history_img"></IonImg>
              <IonText className="history_location">
                Chhatrapati Shivaji Chowk, Andheri (E)
              </IonText>
            </div>
            <IonButton
              onClick={handleRideInfoClick}
              className="history_details"
            >
              View Details
            </IonButton>
          </p>
          <p className="history_card">
            <IonText className="history_dateTime">28 Sep, 23 | 13 : 15</IonText>
            <div style={{ display: "flex" }}>
              <IonText className="history_location">
                M. L. Dahanukar College of Commerce, Vile ...
              </IonText>
              <IonImg src={navigate} className="history_img"></IonImg>
              <IonText className="history_location">
                Chhatrapati Shivaji Chowk, Andheri (E)
              </IonText>
            </div>
            <IonButton
              onClick={handleRideInfoClick}
              className="history_details"
            >
              View Details
            </IonButton>
          </p>

          <p style={{ paddingBottom: "30px" }}></p>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab;
