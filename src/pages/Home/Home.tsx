import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonButtons,
  IonMenuButton,
  IonImg,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonPage,
  IonRouterContext,
  IonButton,
  IonMenuToggle,
  IonModal,
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonIcon,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, {
  StrictMode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Route, Redirect } from "react-router";
import Tab1 from "./Join";
import "./Home.css";
import Tab2 from "./Drive";
import getUser from "../../functions/getUser";
import {
  exitOutline,
  helpOutline,
  reloadOutline,
  settingsOutline,
  triangleOutline,
  walletOutline,
  warningOutline,
} from "ionicons/icons";

function Home() {
  const [selectedTab, setSelectedTab] = useState<any>("tab1");
  const [user, setUser] = useState<any>(localStorage.getItem("user"));
  const [loaded, setLoaded] = useState<any>(false);

  const carSportBlack = "/assets/images/carSportBlack.svg";
  const carSportGreen = "/assets/images/carSportGreen.svg";
  const steeringWheelBlack = "/assets/images/steeringWheelBlack.svg";
  const steeringWheelGreen = "/assets/images/steeringWheelGreen.svg";

  const ionRouterContext = useContext(IonRouterContext);

  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    console.log("home rendered");
    setLoaded(true);
    const fetchUser = async () => {
      let user = await getUser();
      console.log("Home", user);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    };
    fetchUser();
    localStorage.removeItem("createRideDetails");
  }, []);

  const handleProfileClick = () => {
    ionRouterContext.push("/profile", "forward", "push");
  };

  const handleHistoryClick = () => {
    ionRouterContext.push("/history", "forward", "push");
  };

  const handleDestinationClick = () => {
    ionRouterContext.push("/destination", "forward");
  };

  const handleJoinMapClick = () => {
    if (selectedTab === "tab1") {
      ionRouterContext.push("/findride", "forward");
    } else {
      ionRouterContext.push("/createride", "forward");
    }
  };

  return (
    <>
      <IonMenu contentId="main-content" className="menu">
        <IonMenuToggle className="menuToggle">
          <IonList lines="none">
            <IonItem routerLink="/profile">
              <div
                className="profileIcon menuProfile"
                style={{ marginRight: "10px" }}
              >
                <IonImg
                  className="profileImage"
                  src={user?.ProfileUrl}
                ></IonImg>
              </div>
              <div>
                <IonLabel>Shinosuke Nohara</IonLabel>
                <IonLabel style={{ color: "#a1a1a1", marginTop: "3px" }}>
                  View Profile
                </IonLabel>
              </div>
            </IonItem>
            <hr></hr>
            <IonItem routerLink="/history">
              <IonIcon slot="start" icon={reloadOutline}></IonIcon>
              <IonLabel>History</IonLabel>
            </IonItem>
            <IonItem routerLink="/profile">
              <IonIcon slot="start" icon={walletOutline}></IonIcon>
              <IonLabel>Wallet</IonLabel>
            </IonItem>
            <IonItem routerLink="/profile">
              <IonIcon slot="start" icon={settingsOutline}></IonIcon>
              <IonLabel>Settings</IonLabel>
            </IonItem>
            <IonItem routerLink="/profile">
              <IonIcon slot="start" icon={helpOutline}></IonIcon>
              <IonLabel>Support</IonLabel>
            </IonItem>
            <IonItem routerLink="/profile">
              <IonIcon slot="start" icon={warningOutline}></IonIcon>
              <IonLabel>SOS</IonLabel>
            </IonItem>
            <IonItem routerLink="/profile">
              <IonIcon slot="start" icon={exitOutline}></IonIcon>
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonMenuToggle>
        <IonContent className="ion-padding"></IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center", fontWeight: "bold" }}>
              {selectedTab === "tab1" ? "Join Ride" : "Drive"}
            </IonTitle>
            <IonButtons slot="end">
              <div
                onClick={handleProfileClick}
                className="profileIcon"
                style={{ marginRight: "10px" }}
              >
                <IonImg
                  className="profileImage"
                  src={user?.ProfileUrl}
                ></IonImg>
              </div>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Tab1
            hdc={handleDestinationClick}
            handleJoinMapClick={handleJoinMapClick}
            selectedTab={selectedTab}
          />
        </IonContent>
        <div
          className="tabBar"
          slot="bottom"
          style={{ height: "90px", backgroundColor: "#f1f1f1" }}
        >
          <IonButton
            className={
              selectedTab === "tab1" ? "tabButton selectedButton" : "tabButton"
            }
            // href="/home/tab1"
            onClick={() => setSelectedTab("tab1")}
            style={{ backgroundColor: "#f1f1f1" }}
          >
            <div className={selectedTab === "tab1" ? "div" : "div"}>
              <IonImg
                src={selectedTab === "tab1" ? carSportGreen : carSportBlack}
                style={{ height: "25px", color: "red" }}
              ></IonImg>

              <IonText>Join</IonText>
            </div>
          </IonButton>

          <IonButton
            className={
              selectedTab === "tab2" ? "tabButton selectedButton" : "tabButton"
            }
            onClick={() => {
              setSelectedTab("tab2");
            }}
            // href="/home/tab2"
            style={{ "--background": "#f1f1f1" }}
          >
            <div className="div">
              <IonImg
                src={
                  selectedTab === "tab2"
                    ? steeringWheelGreen
                    : steeringWheelBlack
                }
                style={{ height: "25px", color: "red" }}
              ></IonImg>
              <IonText>Drive</IonText>
            </div>
          </IonButton>
        </div>
      </IonPage>
    </>
  );
}

export default Home;
