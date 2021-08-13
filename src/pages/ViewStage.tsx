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
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { Howl, Howler } from "howler";
import { useParams } from "react-router";
import "./ViewStage.css";

function ViewStage() {
  const [stage, setStage] = useState<Stage>();
  const params = useParams<{ id: string }>();

  Howler.autoUnlock = false;

  var sound = new Howl({
    src: ["assets/audios/keys.wav"],
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  });

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
                    <IonItem>
                      <IonLabel className="ion-text-wrap">
                        <h2>{stage.fromName}</h2>
                      </IonLabel>
                      <IonButton onClick={() => sound.play()}></IonButton>
                    </IonItem>
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
