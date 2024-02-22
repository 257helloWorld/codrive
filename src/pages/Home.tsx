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
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { StrictMode, useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import Tab1 from "./Join";
import Tab2 from "./Drive";
import getUser from "../functions/getUser";

function Home() {
  const [selectedTab, setSelectedTab] = useState<any>("tab1");
  const [user, setUser] = useState<any>(localStorage.getItem("user"));
  const [loaded, setLoaded] = useState<any>(false);

  const carSportBlack = "/assets/images/carSportBlack.svg";
  const carSportGreen = "/assets/images/carSportGreen.svg";
  const steeringWheelBlack = "/assets/images/steeringWheelBlack.svg";
  const steeringWheelGreen = "/assets/images/steeringWheelGreen.svg";

  const ionRouterContext = useContext(IonRouterContext);

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
  }, []);

  const handleProfileClick = () => {
    ionRouterContext.push("/profile", "forward", "push");
  };

  const handleHistoryClick = () => {
    ionRouterContext.push("/history", "forward", "push");
  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonMenuToggle>
          <IonButton className="home_menuButton" onClick={handleHistoryClick}>
            History
          </IonButton>
        </IonMenuToggle>
        {/* <IonMenuToggle>
          <IonButton className="home_menuButton" onClick={handleRideInfoClick}>
            RideInfo
          </IonButton>
        </IonMenuToggle> */}
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
        {loaded && (
          <IonContent>
            <IonReactRouter>
              <IonTabs
                onIonTabsDidChange={(e) => {
                  setSelectedTab(e.detail.tab);
                }}
              >
                <IonRouterOutlet>
                  <Route exact path="/home/tab1">
                    <Tab1 />
                  </Route>
                  <Route exact path="/home/tab2">
                    <Tab2 />
                  </Route>
                  <Route exact path="/home">
                    <Redirect to="/home/tab1" />
                  </Route>
                </IonRouterOutlet>

                <IonTabBar
                  slot="bottom"
                  style={{ height: "80px", backgroundColor: "#f1f1f1" }}
                >
                  <IonTabButton
                    className="tabButtons"
                    tab="tab1"
                    href="/home/tab1"
                    style={{ backgroundColor: "#f1f1f1" }}
                  >
                    <div
                      className={
                        selectedTab === "tab1" ? "div selectedDiv" : "div"
                      }
                    >
                      <IonImg
                        src={
                          selectedTab === "tab1" ? carSportGreen : carSportBlack
                        }
                        style={{ height: "25px", color: "red" }}
                      ></IonImg>

                      <IonText
                        style={{
                          marginLeft: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Join
                      </IonText>
                    </div>
                  </IonTabButton>

                  <IonTabButton
                    className="tabButtons"
                    tab="tab2"
                    href="/home/tab2"
                    style={{ backgroundColor: "#f1f1f1" }}
                  >
                    <div
                      className={
                        selectedTab === "tab2" ? "div selectedDiv" : "div"
                      }
                    >
                      <IonImg
                        src={
                          selectedTab === "tab2"
                            ? steeringWheelGreen
                            : steeringWheelBlack
                        }
                        style={{ height: "25px", color: "red" }}
                      ></IonImg>
                      <IonText
                        style={{
                          marginLeft: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Drive
                      </IonText>
                    </div>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonReactRouter>
          </IonContent>
        )}
      </IonPage>
    </>
  );
}

export default Home;
