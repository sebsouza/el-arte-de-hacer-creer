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
  IonImg,
  IonReorderGroup,
  IonReorder,
  IonIcon,
} from "@ionic/react";
import { Howl, Howler } from "howler";
import { useParams } from "react-router";
import "./ViewScene.css";
import { closeCircleOutline } from "ionicons/icons";
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
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home"></IonBackButton>
        </IonButtons>
      </IonToolbar>

      <IonContent fullscreen>
        {scene ? (
          <IonGrid className="gridscene">
            <IonRow className="rowscene">
              {scene.sounds.slice(1).map((m) => (
                <IonCol key={m.id}>
                  <IonReorderGroup>
                    <IonReorder>
                      <IonItem>
                        <IonImg
                          src={img(m.img)}
                          onClick={() => {
                            player[m.id]
                              ? howls[m.id].stop()
                              : howls[m.id].play();
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
                    </IonReorder>
                  </IonReorderGroup>
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
