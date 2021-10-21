import { useState, useEffect } from "react";
import { Scene, getScene } from "../data/scenes";
import {
  IonPage,
  useIonViewWillEnter,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  createGesture,
  Gesture,
  IonButton,
} from "@ionic/react";
import { Howl, Howler } from "howler";
import { useParams } from "react-router";
import "./ViewScene.css";

import { audio, background } from "../util";
import { img } from "../util";

function ViewScene() {
  const [scene, setScene] = useState<Scene>();
  const params = useParams<{ id: string }>();
  const [howls, setHowls] = useState<Howl[]>([]);
  const [player, setPlayer] = useState<boolean[]>([]);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [dragging, setDragging] = useState(0);

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

  function soundSelected(id: any) {
    const soundButton = document.querySelector(`#${id}`);
    soundButton?.classList.add("filter");
    setTimeout(() => soundButton?.classList.remove("filter"), 200);
  }

  const playList = () => {
    const list: Howl[] = [];
    recorder.forEach((sound) => {
      howls[sound.id].stop();
      list.push(howls[sound.id]);
    });

    list[0].play();

    for (let i = 0; i < list.length; i++) {
      list[i].on("end", () => {
        if (i !== list.length - 1) {
          list[i + 1].play();
        }
      });
    }
  };

  useEffect(() => {
    scene?.sounds.slice(1).forEach((m) => {
      const imageRef = document.querySelector(`#${m.name}`);
      if (imageRef !== null) {
        const gesture: Gesture = createGesture({
          el: imageRef,
          threshold: 15,
          gestureName: "soundsDrag",
          onStart: (ev) => {
            setDragging(m.id);
          },
          onMove: (ev) => {
            setDeltaX(ev.deltaX);
            setDeltaY(ev.deltaY);
          },
          onEnd: (ev) => {
            // setDragging(0);
          },
        });
        gesture.enable();
      }
    });

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
    <IonPage
      id="view-scene-page"
      style={{
        backgroundImage: `url(${background(scene?.background)})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <IonButton className="backButton" fill="default" href="/home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
          width="70"
        >
          <title>Arrow Back Circle</title>
          <path
            fill="none"
            stroke={scene?.primaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M249.38 336L170 256l79.38-80M181.03 256H342"
          />
          <path
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
            fill="none"
            stroke={scene?.primaryColor}
            strokeMiterlimit="10"
            strokeWidth="32"
          />
        </svg>
      </IonButton>

      {scene ? (
        <IonGrid className="gridScene">
          <IonRow className="ion-justify-content-center ion-align-items-end">
            {scene.sounds.slice(1).map((m) => (
              <IonCol key={m.id} size="1">
                <IonImg
                  id={m.name}
                  className="image-button"
                  src={img(m.img)}
                  onClick={() => {
                    soundSelected(m.name);
                    setRecorder([
                      ...recorder,
                      { step: m.id, id: m.id, player: false },
                    ]);
                    player[m.id] ? howls[m.id].stop() : howls[m.id].play();
                    player[m.id] = !player[m.id];
                  }}
                  style={
                    dragging === m.id
                      ? {
                          transform: `translate(${deltaX}px, ${deltaY}px)`,
                        }
                      : {}
                  }
                ></IonImg>
              </IonCol>
            ))}
          </IonRow>
          <IonImg
            onClick={playList}
            src="/public/assets/images/escenas/aventuraBarco.png"
          ></IonImg>
        </IonGrid>
      ) : (
        <div>Scene not found</div>
      )}
    </IonPage>
  );
}

export default ViewScene;
