import {
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
import "./Drive.css";
import startRide from "/assets/images/drive.png";
import scheduleRide from "/assets/images/calendar.png";

import { navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const Drive: React.FC = () => {
  return (
    <>
      <IonContent>
        {/* <IonButton routerLink="/profile">Hello</IonButton> */}
        <div className="card" id="driveContent">
          <h4 className="font">Create Ride</h4>
          <p className="ContentFont">Begin Your Shared Ride Experience</p>
          <p className="createNow"> Create Now </p>
          <IonImg className="Img" src={startRide}></IonImg>
        </div>

        <div className="card" id="scheduleRide">
          <h4 className="font">Schedule Ride</h4>
          <p className="ContentFont">
            Set the date, Plan your next shared drive!
          </p>
          <p className="schedule"> Schedule </p>

          <IonImg src={scheduleRide} className="Img"></IonImg>
        </div>
      </IonContent>
    </>
  );
};

export default Drive;
