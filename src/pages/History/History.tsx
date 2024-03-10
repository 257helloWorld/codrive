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
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRouterContext,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./History.css";
import navigateGreen from "/assets/images/navigateGreen.svg";
import navigateGray from "/assets/images/navigateGray.svg";
import { navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import getHistory from "../../functions/getHistory";
import { Link } from "react-router-dom";

const History: React.FC = () => {
  const loopArray = [1, 2, 3, 4];
  const ionRouterContext = useContext(IonRouterContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<any>();

  useEffect(() => {
    setIsOpen(true);
    const fetchHistory = async () => {
      let history = await getHistory();
      console.log("History", history);
      localStorage.setItem("history", JSON.stringify(history));
      setHistory(history);
      setIsOpen(false);
    };
    fetchHistory();
  }, []);

  const handleRideInfoClick = (ride: any) => {
    console.log("ride", ride);
    localStorage.setItem("rideInfo", JSON.stringify(ride));
    ionRouterContext.push("/rideinfo");
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
          {history &&
            history.map((ride: any) => (
              <div className="historyCard" key={ride}>
                <IonText className="dateTime">{ride?.StartTime}</IonText>
                <div className="locationsContainer">
                  <div className="toDiv">
                    <div style={{ display: "flex" }}>
                      <IonImg
                        src={navigateGreen}
                        className="navigateIcon"
                      ></IonImg>
                    </div>
                    <div>
                      <IonText>To</IonText>
                      <IonText className="cardLocation">
                        {ride?.Destination[2]}
                      </IonText>
                    </div>
                  </div>
                </div>

                <div className="fromDiv">
                  <div style={{ display: "flex" }}>
                    <IonImg
                      src={navigateGray}
                      color={""}
                      className="navigateIcon"
                    ></IonImg>
                  </div>
                  <div>
                    <IonText>From</IonText>
                    <IonText className="cardLocation">
                      {ride?.Source[2]}
                    </IonText>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "20px 0 10px 0",
                      backgroundColor: "#e4e4e4",
                      padding: "7px 20px",
                      borderRadius: "30px",
                    }}
                  >
                    <div
                      style={{
                        height: "12px",
                        width: "12px",
                        backgroundColor: "green",
                        borderRadius: "50%",
                        display: "flex",
                        marginRight: "10px",
                      }}
                    ></div>
                    <IonText>{ride?.Status}</IonText>
                  </div>
                </div>
                <IonButton
                  onClick={() => {
                    handleRideInfoClick(ride);
                  }}
                  className="viewDetailsBtn"
                >
                  View Details
                </IonButton>
              </div>
            ))}

          <p style={{ paddingBottom: "30px" }}></p>
        </IonContent>
      </IonPage>
      <IonLoading message={"Loading..."} isOpen={isOpen}></IonLoading>
    </>
  );
};

export default History;
