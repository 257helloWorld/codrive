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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./editProfile.css";
import camera from "/assets/images/camera.svg";
import { navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const Tab: React.FC = () => {
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
          <div className="photo">
            <IonImg src={camera} className="camera"></IonImg>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab;
