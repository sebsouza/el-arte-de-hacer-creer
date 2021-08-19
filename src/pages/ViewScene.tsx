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
  useIonViewWillLeave,
} from "@ionic/react";
import { Howl, Howler } from "howler";
import { useParams } from "react-router";
import "./ViewScene.css";

import { audio } from "../util";

function ViewScene() {
  const [scene, setScene] = useState<Scene>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    Howler.autoUnlock = false;

    const scene = getScene(parseInt(params.id, 10));
    setScene(scene);

    var sound = new Howl({
      src: [audio(scene!.sounds[0].src)],
      onplayerror: function () {
        sound.once("unlock", function () {
          sound.play();
        });
      },
      autoplay: true,
      loop: true,
      // volume: 0.5,
      // onend: function () {
      //   console.log("Finished!");
      // },
    });
    // sound.once("load", function () {
    //   sound.play();
    // });
    // console.log(scene!.sounds[0].src);
  });

  useIonViewWillLeave(() => {
    Howler.stop();
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
                {scene.sounds.slice(1).map((m) => (
                  <IonCol>
                    <IonAvatar>
                      {/*   <img alt={scene.fromName} src={img(scene.avatar)} /> */}
                    </IonAvatar>
                    <IonItem>
                      <IonLabel className="ion-text-wrap">{m.name}</IonLabel>
                      <IonButton
                        onClick={() => {
                          const sound = new Howl({
                            src: [audio(m.src)],
                            volume: 0.5,
                            // onplayerror: function () {
                            //   sound.once("unlock", function () {
                            //     sound.play();
                            //   });
                            // },
                          });
                          sound.play();
                          // console.log(m);
                        }}
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
