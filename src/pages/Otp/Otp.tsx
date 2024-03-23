import {
  IonAlert,
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
  IonRouterContext,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Otp.css";
import { navigateOutline } from "ionicons/icons";
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { firestore } from "../../services/firebase";

const otp = "/assets/images/otp.svg";

const Tab: React.FC = () => {
  const [seconds, setSeconds] = useState(60);
  const [isGoBackAlertOpen, setIsGoBackAlertOpen] = useState<boolean>(false);
  const [isOtpInvalid, setIsOtpInvalid] = useState<boolean>(false);

  const ionRouterContext = useContext(IonRouterContext);

  const otpInputRef = useRef<HTMLInputElement>(null);

  const resendOtp = () => {
    let phoneNumber = localStorage.getItem("phoneNumber");
    let otp = localStorage.getItem("otp");
    const url = "";
    const data = new URLSearchParams();
    data.append("To", `+91${phoneNumber}`);
    data.append("From", "+15642442806");
    data.append("Body", `Your verification code for CoDrive is: ${otp}`);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: "",
        password: import.meta.env.VITE_TWILIO_AUTH_ID,
      },
    };

    axios
      .post(url, data, config)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (seconds === 0) {
      return;
    }
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(timer);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [seconds]);

  const checkUserExists = async (phoneNumber: number) => {
    const usersRef = firestore.collection("Users");
    const querySnapshot = await usersRef
      .where("PhoneNumber", "==", phoneNumber)
      .get();

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      localStorage.setItem("userId", doc.id);
      console.log({ exists: true, docId: doc.id });
      ionRouterContext.push("/home", "root");
    } else {
      console.log({ exists: false, docId: null });
    }
  };

  // Format the timer to display in minutes and seconds
  const formatTime = (seconds: number): string => {
    return seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
  };
  const handleResendClick = () => {
    resendOtp();
    setSeconds(60); // Reset the timer to 60 seconds
  };

  const handleBackClick = () => {
    setIsGoBackAlertOpen(true);
  };

  const handleConfirmBack = () => {
    ionRouterContext.back();
  };

  const handleOtpInput = () => {
    if (isOtpInvalid === true) {
      setTimeout(() => {
        setIsOtpInvalid(false);
      }, 1000);
    }
    if (otpInputRef.current?.value.toString().length === 5) {
      let otp = localStorage.getItem("otp");
      let inputOtp = otpInputRef?.current?.value;
      let validated = otp === inputOtp;
      if (validated) {
        let phoneNumber = parseInt(
          localStorage.getItem("phoneNumber") as string
        );
        let userExists = checkUserExists(phoneNumber);
      } else {
        setTimeout(() => {
          setIsOtpInvalid(true);
        }, 1000);
      }
    }
  };
  return (
    <>
      <IonPage>
        <IonContent className="otpContent">
          <IonGrid style={{ marginTop: "30px" }}>
            <IonRow>
              <IonCol>
                <IonButton className="otp_back" onClick={handleBackClick}>
                  Back
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonLabel className="otp_font">OTP Verification</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonLabel>
                  We've sent you an OTP on your number +91 9876543210
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonImg src={otp} className="otp_img"></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="otpInputHolder">
                <input
                  ref={otpInputRef}
                  type="tel"
                  placeholder="Enter OTP"
                  maxLength={5}
                  className="otpInput"
                  onInput={handleOtpInput}
                ></input>
              </IonCol>
            </IonRow>
            {isOtpInvalid && (
              <IonRow>
                <IonText style={{ margin: "5px auto" }}>Invalid OTP</IonText>
              </IonRow>
            )}
            <IonRow>
              <IonCol className="ion-text-center resendHolder">
                {seconds === 0 ? (
                  <IonButton onClick={handleResendClick} className="otp_resend">
                    Resend
                  </IonButton>
                ) : (
                  <IonLabel>
                    <b>Resend</b> after {formatTime(seconds)}
                  </IonLabel>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonButton className="otp_submit"> Submit</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
      <IonAlert
        header={"Are you sure!"}
        message={"Want to go back?"}
        isOpen={isGoBackAlertOpen}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              setIsGoBackAlertOpen(false);
            },
          },
          {
            text: "Yes",
            handler: handleConfirmBack,
          },
        ]}
      ></IonAlert>
    </>
  );
};

export default Tab;
