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
  IonRouterContext,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Profile.css";
import { useContext, useEffect, useState } from "react";
const Profile: React.FC = () => {
  const [user, setUser] = useState<any>();
  const verifiedBadgeImg = "/assets/images/VerifiedBadge.svg";
  const personImg = "/assets/images/person.svg";
  const carImg = "/assets/images/car.svg";
  const userImg =
    "https://sugermint.com/wp-content/uploads/2020/04/Biography-of-Sundar-Pichai.jpg";
  const ionRouterContext = useContext(IonRouterContext);
  const handleEditProfileClick = () => {
    ionRouterContext.push("/editprofile", "forward");
  };

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    setUser(user);
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
          <div className="profile_profileBanner">
            <div className="profile_profileCircle">
              <IonImg
                className="profile_profilePic"
                src={user?.ProfileUrl}
              ></IonImg>
            </div>
            <div className="profile_profileNameHolder">
              <IonText className="profile_profileName">
                {user?.FirstName} {user?.LastName}
              </IonText>
              <div className="profile_verifiedBadgeHolder">
                <IonImg
                  className="profile_verifiedBadge"
                  src={verifiedBadgeImg}
                ></IonImg>
                <IonText>Verified</IonText>
              </div>
            </div>
          </div>

          {/* Bio & Ratings Card */}
          <div className="profile_bioRatingsHolder">
            {/* RatingsCard */}
            <div className="profile_card profile_ratingsCard">
              <IonText className="profile_cardTitle">Ratings</IonText>
              <br />
              <p className="profile_ratings">
                <span>{user?.Ratings}</span> / 5
              </p>
            </div>
            {/* BioCard */}
            <div className="profile_card profile_bioCard">
              <IonText className="profile_cardTitle">Bio</IonText>
              <br />
              <IonText>{user?.Bio}</IonText>
            </div>
          </div>

          {/* Vehicles */}
          <div className="profile_card profile_vehiclesCard">
            <div className="profile_cardHeader">
              <IonText className="profile_cardTitle">My Vehicles</IonText>
              <IonButton className="profile_manageBtn">Manage</IonButton>
            </div>
            <div className="profile_vehicleHolder">
              <div>
                <IonImg src={carImg} className="profile_carIcon"></IonImg>
                <IonText>{user?.Vehicles[0].VehicleName}</IonText>
                {/* <IonBadge>Primary</IonBadge> */}
              </div>
              <div className="profile_seatingCapacityHolder">
                <IonImg src={personImg}></IonImg>
                <p>{user?.Vehicles[0].SeatingCapacity}</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="profile_card profile_reviewsCard">
            <div className="profile_cardHeader">
              <IonText className="profile_cardTitle">Reviews</IonText>
              <IonButton className="profile_viewAllBtn" fill="clear">
                View All
              </IonButton>
            </div>
            {user?.Reviews.map((review: any) => (
              <div className="profile_reviewHolder">
                <div className="profile_reviewerIcon">
                  <IonImg src={review.Reviewer.ProfileUrl}></IonImg>
                </div>
                <div className="profile_reviewContentHolder">
                  <IonText className="profile_reviewerName">
                    {review.Reviewer.Name}
                  </IonText>
                  <IonText className="profile_review">
                    {review.Feedback} <span>({review.Ratings}/5)</span>
                  </IonText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
      <IonFooter className="profileFooter">
        <IonButton
          className="editProfileBtn"
          expand="block"
          onClick={handleEditProfileClick}
        >
          Edit Profile
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Profile;
