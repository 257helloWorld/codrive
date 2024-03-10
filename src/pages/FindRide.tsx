import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  GoogleMap,
  Polyline,
  useJsApiLoader,
  OverlayView,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import "./FindRide.css";

function FindRide(props: any) {
  const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [polylineCords, setPolylineCords] = useState<any>();
  const [sourceLatLng, setSourceLatLng] = useState<any>();
  const [destinationLatLng, setDestinationLatLng] = useState<any>(
    localStorage.getItem("destinationLatLng")
  );
  const [balance, setBalance] = useState<number>();
  const [center, setCenter] = useState<any>({
    lat: 19.0989,
    lng: 72.8515,
  });

  const [joinMapRef, setJoinMapRef] = useState<google.maps.Map>();

  const mapLibraries: any = ["places"];
  var bounds = new google.maps.LatLngBounds();

  const handleOnLoad = (map: any) => {
    setJoinMapRef(map);
    setTimeout(() => {
      setIsLoading(false);
      plotPolyline();
    }, 2000);
  };

  const plotPolyline = () => {
    let polylineCoordinates = localStorage.getItem("polylineCoordinates");
    if (!polylineCoordinates) {
      return;
    }
    let directions = JSON.parse(polylineCoordinates);
    console.log("directions2", directions);
    directions?.forEach(function (coord: any) {
      bounds.extend(coord);
    });
    joinMapRef?.fitBounds(bounds);
    setPolylineCords(directions);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: mapLibraries,
  });

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let data = JSON.parse(user);
      let balance = data.Balance;
      setBalance(balance);
    }
    plotPolyline();
    let src = localStorage.getItem("sourceLatLng");
    let dest = localStorage.getItem("destinationLatLng");
    if (!src || !dest) {
      return;
    }
    src = JSON.parse(src);
    dest = JSON.parse(dest);
    setSourceLatLng(src);
    setDestinationLatLng(dest);
    plotPolyline();
  }, [joinMapRef]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center" }}>Find Ride</IonTitle>
            <IonButtons slot="end">
              <div
                style={{
                  width: "30px",
                }}
              ></div>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {!isLoaded && !isLoading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : (
            <GoogleMap
              id="map"
              center={center}
              onLoad={handleOnLoad}
              zoom={15}
              mapContainerStyle={{
                width: "100%",
                height: "60%",
              }}
              //   onClick={(e) => handleClick(e)}
              //   onCenterChanged={handleMapCenterChanged}
              options={{
                disableDefaultUI: true,
                keyboardShortcuts: false,
                mapId: mapId,
                clickableIcons: false,
                gestureHandling: "greedy",
              }}
            >
              {polylineCords && (
                <Polyline
                  path={polylineCords}
                  options={{
                    strokeColor: "#000",
                    strokeOpacity: 1,
                    strokeWeight: 4.5,
                  }}
                />
              )}
              <OverlayView
                position={sourceLatLng}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => ({
                  x: -(width / 2),
                  y: -height,
                })}
              >
                <div className="outerCircle">
                  <div className="innerCircle"></div>
                </div>
              </OverlayView>

              <OverlayView
                position={destinationLatLng}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => ({
                  x: -(width / 2),
                  y: -height,
                })}
              >
                <div
                  className="outerCircle"
                  style={{ backgroundColor: "darkgreen" }}
                >
                  <div className="innerCircle"></div>
                </div>
              </OverlayView>
            </GoogleMap>
          )}
          <div className="searchModal">
            <div className="charges">
              <IonText>You Pay</IonText>
              <IonText>
                <span className="amount">₹ 20</span>($1.5 per km)
              </IonText>
            </div>
            <div className="details">
              <p>Total Distance: 12 Kms</p>
              <p>Your Balance: ₹ {balance}</p>
            </div>
            <div className="btnHolder">
              <IonButton>Search Rides</IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
      <IonLoading isOpen={isLoading}></IonLoading>
    </>
  );
}

export default FindRide;
