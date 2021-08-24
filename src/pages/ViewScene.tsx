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
  IonAvatar,
  IonLabel,
  IonButton,
  useIonViewWillLeave,
  useIonViewDidLeave,
} from "@ionic/react";
import { Howl, Howler } from "howler";
import { useParams } from "react-router";
import "./ViewScene.css";

import { audio } from "../util";

function ViewScene() {
  const [scene, setScene] = useState<Scene>();
  const params = useParams<{ id: string }>();
  const [howls, setHowls] = useState<Howl[]>([]);

  useIonViewWillEnter(() => {
    Howler.autoUnlock = false;

    const _scene = getScene(parseInt(params.id, 10));
    console.log(_scene?.sounds);
    setScene(_scene);
  });

  //   var sound = new Howl({
  //     src: [audio(scene!.sounds[0].src)],
  //     onplayerror: function () {
  //       sound.once("unlock", function () {
  //         sound.play();
  //       });
  //     },
  //     autoplay: true,
  //     loop: true,
  //   });
  // });

  const fadeOut = () => {
    console.log(howls);
    howls.forEach((h) => {
      console.log(h);
      h.fade(1, 0, 4000);
    });
  };

  useEffect(() => {
    if (scene && scene !== null) {
      var _howls: Howl[] = [];
      scene?.sounds.forEach((s) => {
        // console.log(s.src);
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

  useIonViewDidLeave(() => {
    // Howler.stop();
    // fadeOut();
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
                          // const sound = new Howl({
                          //   src: [audio(m.src)],
                          //   volume: 1,
                          //   // onplayerror: function () {
                          //   //   sound.once("unlock", function () {
                          //   //     sound.play();
                          //   //   });
                          //   // },
                          // });
                          howls[m.id].play();
                          console.log(m);
                        }}
                      >
                        {m.name}
                      </IonButton>
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
