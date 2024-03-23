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
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRouterContext,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./CraftProfile.css";
import { camera, download, navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { storage } from "../../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CraftProfile: React.FC = () => {
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const genderRadioGroupRef = useRef<HTMLIonRadioGroupElement>(null);

  const croppedImageData: string | null = localStorage.getItem("croppedImage");
  console.log("cropped", croppedImageData);

  const [image, setImage] = useState<any>(null);

  const ionRouterContext = useContext(IonRouterContext);

  const storageRef = ref(
    storage,
    `/profileImages/${localStorage.getItem("phoneNumber")}.jpg`
  );
  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setImage(reader.result);
        const imageData: string | null = reader.result as string;
        localStorage.setItem("imageData", imageData);
        ionRouterContext.push("/imagecropper", "forward");
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirebase = async () => {
    const response = await fetch(croppedImageData as string);
    const blob = await response.blob();
    const uploadTask = uploadBytes(storageRef, blob).then(async (snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
      let downloadUrl = await getDownloadURL(snapshot.ref);
      console.log(downloadUrl);
    });
  };

  return (
    <>
      <IonPage>
        <IonContent className="craftProfileContent">
          <IonGrid>
            <IonRow style={{ height: "60px" }}>
              <IonCol>
                <IonButton className="back_button">Back</IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <IonLabel className="Name_font">Craft Your Profile</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol style={{ padding: "0% 10% 0% 10%" }}>
                <IonLabel className="name_normalfont">
                  Introduce yourself with your Name and Profile Picture.
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  className="name_profileCircle"
                  style={{ overflow: "hidden" }}
                >
                  {croppedImageData != null ? (
                    <IonImg
                      style={{ objectFit: "cover" }}
                      src={croppedImageData}
                    ></IonImg>
                  ) : (
                    <IonImg src={camera} className="eP_camera"></IonImg>
                  )}
                  {/* eP_camera from Edit Profile.css */}
                </div>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <IonButton onClick={handleUploadClick} className="name_upload">
                  Upload
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow style={{ padding: "10px" }}>
              <input
                ref={firstNameInputRef}
                placeholder="First Name"
                maxLength={17}
                type="text"
                className="nameInput"
              ></input>
            </IonRow>
            <IonRow style={{ padding: "10px" }}>
              <input
                ref={lastNameInputRef}
                placeholder="Last Name"
                maxLength={17}
                type="text"
                className="nameInput"
              ></input>
            </IonRow>
            <IonRow
              className="ion-align-items-stretch"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <IonText
                style={{
                  textAlign: "center",
                  width: "100%",
                  margin: "10px auto",
                }}
              >
                Select Gender
              </IonText>
              <IonRadioGroup ref={genderRadioGroupRef}>
                <div>
                  <IonList
                    lines={"none"}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <IonItem>
                      <IonRadio value={"Male"}></IonRadio>
                      <IonLabel style={{ marginLeft: "10px" }}>Male</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonRadio value={"Female"}></IonRadio>
                      <IonLabel style={{ marginLeft: "10px" }}>Female</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonRadio value={"Other"}></IonRadio>
                      <IonLabel style={{ marginLeft: "10px" }}>Other</IonLabel>
                    </IonItem>
                  </IonList>
                </div>
              </IonRadioGroup>
            </IonRow>
            <IonRow className="ion-text-center" style={{ marginTop: "15px" }}>
              <IonCol style={{ padding: "0% 10% 0% 10%" }}>
                <IonLabel
                  className="name_normalfont"
                  style={{ color: "#3f3f3f" }}
                >
                  These details are pubilicly visible to all users.
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow style={{ marginTop: "10px" }}>
              <IonCol className="ion-text-center">
                <IonButton
                  className="otp_submit"
                  onClick={uploadImageToFirebase}
                >
                  Save
                </IonButton>
                {/* Save css from otp.css */}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default CraftProfile;
