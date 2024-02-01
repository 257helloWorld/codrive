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
import "./RideInfo.css";
import locationGreen from "/assets/images/locationGreen.svg";
import locationGrey from "/assets/images/locationGrey.svg";
import corider1 from "/assets/images/corider1.png";
import corider2 from "/assets/images/corider2.svg";
import wheel from "/assets/images/svg1.svg";
import tick from "/assets/images/Vector.png";

import { navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const RideInfo: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center" }}>
              Ride Information
            </IonTitle>
            <IonButtons slot="end">
              <div style={{ marginRight: "50px" }}></div>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="rideInfoContainer">
            <p className="rideInfo_font">
              Reference ID: <b>313216546498</b>
            </p>
            <div className="rideInfo_container">
              <IonImg src={locationGrey} className="rideInfo_img"></IonImg>
              <p className="rideInfo_text">
                M. L. Dahanukar College of Commerce, Vile Parle East
              </p>
              <p className="rideInfo_font2">
                28 Sep, 23
                <b> 13 : 15</b>
              </p>
            </div>
            <div className="rideInfo_container">
              <IonImg src={locationGreen} className="rideInfo_img"></IonImg>

              <p className="rideInfo_text">
                Chhatrapati Shivaji Maharaj Chowk, Andheri (E)
              </p>
              <p className="rideInfo_font2">
                28 Sep, 23
                <b> 13 : 36</b>
              </p>
            </div>
            <p className="rideInfo_font3">
              <b>Co Riders</b>
            </p>
            <div className="rideInfo_container" style={{ marginLeft: "21px" }}>
              <div className="rideInfo_profileIcon1">
                <IonImg
                  className="rideInfo_profileImage"
                  src={corider1}
                ></IonImg>
              </div>
              <div className="rideInfo_circle">
                <IonImg className="rideInfo_wheelImage" src={wheel}></IonImg>
              </div>
              <div className="rideInfo_profileIcon1">
                <IonImg
                  className="rideInfo_profileImage"
                  src={corider2}
                ></IonImg>
              </div>
            </div>
            {/* <p className="rideInfo_font3" style={{ marginTop: "-20px" }}>
            <b>Payment</b>
          </p> */}

            {/* <IonButton routerLink="/profile">Hello</IonButton> */}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default RideInfo;
