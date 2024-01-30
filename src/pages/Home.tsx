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
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import getUser from "../functions/getUser";

function Home() {
  const [selectedTab, setSelectedTab] = useState<any>("tab1");
  const carSportBlack = "/assets/images/carSportBlack.svg";
  const carSportGreen = "/assets/images/carSportGreen.svg";
  const steeringWheelBlack = "/assets/images/steeringWheelBlack.svg";
  const steeringWheelGreen = "/assets/images/steeringWheelGreen.svg";

  const ionRouterContext = useContext(IonRouterContext);

  useEffect(() => {
    const fetchUser = async () => {
      let user = await getUser();
      console.log("Home", user);
      localStorage.setItem("user", JSON.stringify(user));
    };
    // fetchUser();
  }, []);

  const handleProfileClick = () => {
    ionRouterContext.push("/profile", "forward");
  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText>This is menu</IonText>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center" }}>
              {selectedTab === "tab1" ? "Join Ride" : "Create Ride"}
            </IonTitle>
            <IonButtons slot="end">
              <div
                onClick={handleProfileClick}
                className="profileIcon"
                style={{ marginRight: "10px" }}
              >
                <IonImg
                  className="profileImage"
                  src="https://sugermint.com/wp-content/uploads/2020/04/Biography-of-Sundar-Pichai.jpg"
                ></IonImg>
              </div>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

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

                    <IonText style={{ marginLeft: "15px", fontSize: "15px" }}>
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
                    <IonText style={{ marginLeft: "15px", fontSize: "15px" }}>
                      Drive
                    </IonText>
                  </div>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Home;
