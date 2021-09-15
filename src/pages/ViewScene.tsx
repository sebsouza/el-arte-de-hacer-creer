import { useState, useEffect } from "react";
import { Scene, getScene } from "../data/scenes";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/react";
import { Howl, Howler } from "howler";
import { useParams } from "react-router";
import "./ViewScene.css";

import { audio } from "../util";
import { img } from "../util";

function ViewScene() {
  const [scene, setScene] = useState<Scene>();
  const params = useParams<{ id: string }>();
  const [howls, setHowls] = useState<Howl[]>([]);
  const [player, setPlayer] = useState<boolean[]>([]);
  const [recorder, setRecorder] = useState<
    {
      step: number;
      id: number;
      player: boolean;
    }[]
  >([]);

  useIonViewWillEnter(() => {
    Howler.autoUnlock = false;

    const _scene = getScene(parseInt(params.id, 10));
    setScene(_scene);
  });

  useEffect(() => {
    if (scene && scene !== null) {
      var _howls: Howl[] = [];
      var _player: boolean[] = [];

      scene?.sounds.forEach((s) => {
        const id = s.id;
        _howls[id] = new Howl({
          src: [audio(s.src)],
          volume: 1,
          loop: id === 0 ? true : false,
        });
        _player[id] = false;
      });

      _howls[0].play();
      _player[0] = true;
      setHowls(_howls);
      setPlayer(_player);
    }
    return () => {
      if (scene && scene !== null) {
        scene?.sounds.forEach((s) => {
          const id = s.id;
          _howls[id].stop();
        });
      }
    };
  }, [scene]);

  return (
    <IonPage id="view-scene-page">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
      </IonToolbar>

      <IonContent className="contentScene">
        {scene ? (
          <IonGrid>
            <IonRow className="ion-justify-content-center ion-align-items-end">
              {scene.sounds.slice(1).map((m) => (
                <IonCol key={m.id} size="1">
                  <IonItem
                    onDrag={() => console.log("hola")}
                    draggable="true"
                    className="custom-button"
                  >
                    <IonImg
                      src={img(m.img)}
                      onClick={() => {
                        player[m.id] ? howls[m.id].stop() : howls[m.id].play();
                        player[m.id] = !player[m.id];
                      }}
                    ></IonImg>
                    {/* <IonLabel className="ion-text-wrap">{m.name}</IonLabel>
                    <IonButton
                      onClick={() => {
                        player[m.id] ? howls[m.id].stop() : howls[m.id].play();
                        player[m.id] = !player[m.id];
                      }}
                    ></IonButton> */}
                  </IonItem>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        ) : (
          <div>Scene not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewScene;
