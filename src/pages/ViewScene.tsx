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
  IonImg,
} from "@ionic/react";
import { Howl, Howler } from "howler";
import { useParams } from "react-router";
import "./ViewScene.css";
import {} from "ionicons/icons";
import { audio } from "../util";
import { img } from "../util";

function ViewScene() {
  const [scene, setScene] = useState<Scene>();
  const params = useParams<{ id: string }>();
  const [howls, setHowls] = useState<Howl[]>([]);
  const [player, setPlayer] = useState<boolean[]>([]);
  const [recorder, setRecorder] = useState<
    {
      timestamp: Date;
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
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Volver" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {scene ? (
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              {scene.sounds.slice(1).map((m) => (
                <IonCol key={m.id}>
                  <IonItem>
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
        </IonContent>
      ) : (
        <div>Scene not found</div>
      )}
    </IonPage>
  );
}

export default ViewScene;
