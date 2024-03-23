import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Sos.css";
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
              <IonBackButton defaultHref="/"></IonBackButton>
            </IonButtons>
            <IonTitle className="IonTitle">Add contact</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ backgroundColor: "#f1f1f1", height: "100%" }}>
            <IonGrid style={{ marginRight: "8px" }}>
              <IonRow className="sos_display">
                <IonCol>
                  <IonLabel className="sos_display">
                    SMS will be automatically send to these contacts whenever an
                    alert is triggered. Regular SMS charges will apply.
                  </IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-start">
                  <IonLabel className="sos_title">Message</IonLabel>
                </IonCol>
                <IonCol className="ion-text-end">
                  <IonLabel className="sos_edit">Edit</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="sos_message">
                  <IonInput
                    value="I am in danger. Please help me out."
                    readonly={true}
                  ></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel className="sos_title">Contact</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow style={{ backgroundColor: "white" }}>
                <IonCol className="ion-text-center">
                  <IonButton className="sos_contact">+ Add Contact</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButton className="sos_alert">SEND ALERT</IonButton>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab;
