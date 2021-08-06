import { useState } from "react";
import { Stage, getStage } from "../data/stages";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonList,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
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
            <IonBackButton text="Volver" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {stage ? (
          <IonContent fullscreen>
            {stage.sounds.map((m) => (
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonAvatar>
                      {/*   <img alt={stage.fromName} src={img(stage.avatar)} /> */}
                    </IonAvatar>
                    <IonLabel className="ion-text-wrap">
                      <h2>{stage.fromName}</h2>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            ))}
          </IonContent>
        ) : (
          <div>Stage not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewStage;
