import { useState } from "react";
import { Stage, getStage } from "../data/stages";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewStage.css";

function ViewStage() {
  const [stage, setStage] = useState<Stage>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const msg = getStage(parseInt(params.id, 10));
    setStage(msg);
  });

  return (
    <IonPage id="view-stage-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {stage ? (
          <>
            <IonItem>
              <IonIcon color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>{stage.fromName}</h2>
                <h3>
                  To: <IonNote>Me</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{stage.subject}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </>
        ) : (
          <div>Stage not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewStage;
