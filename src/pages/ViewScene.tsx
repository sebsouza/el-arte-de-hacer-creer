import { useState } from "react";
import { Scene, getScene } from "../data/scenes";
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
import "./ViewScene.css";

import { audio } from "../util";

function ViewScene() {
  const [scene, setScene] = useState<Scene>();
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
    const msg = getScene(parseInt(params.id, 10));
    setScene(msg);
  });

  return (
    <IonPage id="view-scene-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Volver" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {scene ? (
          <IonContent fullscreen>
            <IonGrid>
              <IonRow>
                {scene.sounds.map((m) => (
                  <IonCol>
                    <IonAvatar>
                      {/*   <img alt={scene.fromName} src={img(scene.avatar)} /> */}
                    </IonAvatar>
                    <IonItem>
                      <IonLabel className="ion-text-wrap">
                        <h2>{scene.fromName}</h2>
                      </IonLabel>
                      <IonButton
                        onClick={() =>
                          // new Howl({
                          //   src: [audio(m)],
                          //   onplayerror: function () {
                          //     sound.once("unlock", function () {
                          //       sound.play();
                          //     });
                          //   },
                          // }).play()
                          console.log(m)
                        }
                      ></IonButton>
                    </IonItem>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonContent>
        ) : (
          <div>Scene not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewScene;
