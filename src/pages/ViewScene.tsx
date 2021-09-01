import { useState, useEffect } from "react";
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
  IonLabel,
  IonButton,
  IonIcon,
  IonToggle,
} from "@ionic/react";
import { Howl, Howler } from "howler";
import { useParams } from "react-router";
import "./ViewScene.css";
import { play, stop, volumeHigh, volumeMute } from "ionicons/icons";

import { audio } from "../util";

function ViewScene() {
  const [scene, setScene] = useState<Scene>();
  const params = useParams<{ id: string }>();
  const [howls, setHowls] = useState<Howl[]>([]);

  useIonViewWillEnter(() => {
    Howler.autoUnlock = false;

    const _scene = getScene(parseInt(params.id, 10));
    setScene(_scene);
  });

  useEffect(() => {
    if (scene && scene !== null) {
      var _howls: Howl[] = [];

      scene?.sounds.forEach((s) => {
        const id = s.id;
        _howls[id] = new Howl({
          src: [audio(s.src)],
          volume: 1,
        });
      });

      _howls[0].once("load", function () {
        _howls[0].play();
      });

      setHowls(_howls);
    }
    // return () => {
    //   if (scene && scene !== null) {
    //     fadeOut();
    //   }
    // };
  }, [scene]);

  const fadeOut = () => {
    howls.forEach((h) => {
      if (h.volume() > 0.9) {
        h.fade(1, 0, 2000);
      } else if (h.volume(0)) {
        h.fade(0, 1, 2000);
      }
    });
  };

  console.log(Howler.volume());

  return (
    <IonPage id="view-scene-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Volver" defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonIcon slot="icon-only" icon={volumeHigh} />
            <IonToggle onClick={fadeOut} />
            <IonIcon slot="icon-only" icon={volumeMute} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {scene ? (
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol></IonCol>
            </IonRow>
            <IonRow>
              {scene.sounds.slice(1).map((m) => (
                <IonCol>
                  <IonItem>
                    <IonLabel className="ion-text-wrap">{m.name}</IonLabel>
                    <IonButton
                      onClick={() => {
                        howls[m.id].play();
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
    </IonPage>
  );
}

export default ViewScene;
