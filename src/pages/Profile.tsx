import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Profile.css";
import { useEffect, useState } from "react";
const Profile: React.FC = () => {
  const [user, setUser] = useState<any>();
  const verifiedBadgeImg = "/assets/images/VerifiedBadge.svg";
  const personImg = "/assets/images/person.svg";
  const carImg = "/assets/images/car.svg";
  const userImg =
    "https://sugermint.com/wp-content/uploads/2020/04/Biography-of-Sundar-Pichai.jpg";

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    setUser(user);
    console.log(user);
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle style={{ textAlign: "center" }}>Profile</IonTitle>
          <IonButtons slot="end">
            <div style={{ marginRight: "50px" }}></div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          {/* Profile Banner & Icon */}
          <div className="profileBanner">
            <div className="profileCircle">
              <IonImg className="profilePic" src={user?.ProfileUrl}></IonImg>
            </div>
            <div className="profileNameHolder">
              <IonText className="profileName">
                {user?.FirstName} {user?.LastName}
              </IonText>
              <div className="verifiedBadgeHolder">
                <IonImg
                  className="verifiedBadge"
                  src={verifiedBadgeImg}
                ></IonImg>
                <IonText>Verified</IonText>
              </div>
            </div>
          </div>

          {/* Bio & Ratings Card */}
          <div className="bioRatingsHolder">
            {/* RatingsCard */}
            <div className="card ratingsCard">
              <IonText className="cardTitle">Ratings</IonText>
              <br />
              <p className="ratings">
                <span>{user?.Ratings}</span> / 5
              </p>
            </div>
            {/* BioCard */}
            <div className="card bioCard">
              <IonText className="cardTitle">Bio</IonText>
              <br />
              <IonText>{user?.Bio}</IonText>
            </div>
          </div>

          {/* Vehicles */}
          <div className="card vehiclesCard">
            <div className="cardHeader">
              <IonText className="cardTitle">My Vehicles</IonText>
              <IonButton className="manageBtn">Manage</IonButton>
            </div>
            <div className="vehicleHolder">
              <div>
                <IonImg src={carImg} className="carIcon"></IonImg>
                <IonText>{user?.Vehicles[0].VehicleName}</IonText>
                {/* <IonBadge>Primary</IonBadge> */}
              </div>
              <div className="seatingCapacityHolder">
                <IonImg src={personImg}></IonImg>
                <p>{user?.Vehicles[0].SeatingCapacity}</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="card reviewsCard">
            <div className="cardHeader">
              <IonText className="cardTitle">Reviews</IonText>
              <IonButton className="viewAllBtn" fill="clear">
                View All
              </IonButton>
            </div>
            {user?.Reviews.map((review: any) => (
              <div className="reviewHolder">
                <div className="reviewerIcon">
                  <IonImg src={review.Reviewer.ProfileUrl}></IonImg>
                </div>
                <div className="reviewContentHolder">
                  <IonText className="reviewerName">
                    {review.Reviewer.Name}
                  </IonText>
                  <IonText className="review">
                    {review.Feedback} <span>({review.Ratings}/5)</span>
                  </IonText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
      <IonFooter className="profileFooter">
        <IonButton className="editProfileBtn" expand="block">
          Edit Profile
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Profile;
