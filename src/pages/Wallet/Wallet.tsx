import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
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
import "./Wallet.css";
import { navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const Wallet: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center", fontWeight: "bold" }}>
              Wallet
            </IonTitle>
            <IonButtons slot="end">
              <div style={{ width: "50px" }}></div>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div
            style={{
              height: "130px",
              width: "90%",
              margin: "5%",
              marginTop: "30px",
              marginBottom: "10px",
              padding: "20px 20px 20px 20px",
              backgroundColor: "#f1f1f1",
            }}
          >
            <IonLabel className="balance">Balance</IonLabel>
            <br></br>
            <IonGrid style={{ paddingRight: "10px" }}>
              <IonRow>
                <IonCol size="1">
                  {/* <IonImg src={rupee} className="payment_img"></IonImg> */}
                  <IonText>Rs.</IonText>
                </IonCol>
                <IonCol size="4">
                  <IonLabel className="amount">00.00</IonLabel>
                </IonCol>
                <IonCol size="6" style={{ marginRight: "5px" }}>
                  <IonButton className="wallet">RECHARGE WALLET</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <IonLabel className="balance_transaction">My Transactions </IonLabel>

          <IonCard
            style={{
              marginTop: "10px",
              paddind: "10",
              paddingBottom: "10px",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <IonGrid>
              <IonRow>
                <IonCol size="8">
                  <IonLabel className="balance_payment">
                    Paid for ticket
                  </IonLabel>
                </IonCol>
                <IonCol size="1">
                  <IonLabel className="py_amount">-</IonLabel>
                </IonCol>
                <IonCol size="1">
                  {/* <IonImg src={rupee} className="payment_rupee"></IonImg> */}
                  <IonText>Rs.</IonText>
                </IonCol>
                <IonCol size="1">
                  <IonLabel className="py_amount">5</IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonLabel className="datetime">11:40 AM, 21 Feb 2024</IonLabel>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Wallet;
