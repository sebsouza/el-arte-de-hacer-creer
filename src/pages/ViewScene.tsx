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

import { useHistory } from "react-router";
import { audio, background } from "../util";
import { img } from "../util";
import { GESTURE_CONTROLLER } from "@ionic/core/dist/types/utils/gesture";

function ViewScene() {
  const [scene, setScene] = useState<Scene>();
  const params = useParams<{ id: string }>();
  const [howls, setHowls] = useState<Howl[]>([]);
  const [player, setPlayer] = useState<boolean[]>([]);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [dragging, setDragging] = useState(0);

  const [recorder, setRecorder] = useState<
    {
      id: number;
      player: boolean;
    }[]
  >([]);
  const history = useHistory();

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

  function playSelected() {
    const playButton = document.querySelector("#ButtonPlay");
    playButton?.classList.add("filter");
    setTimeout(() => playButton?.classList.remove("filter"), 200);
  }

  const playList = () => {
    const list: Howl[] = [];
    recorder.forEach((step) => {
      if (step.player) {
        howls[step.id].stop();
        list.push(howls[step.id]);
      }
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

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

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
          setCurrentX(ev.currentX);
          setCurrentY(ev.currentY);
        },
        onEnd: (ev) => {
          setDragging(0);
          if (
            ev.currentX > 0.37 * windowWidth &&
            ev.currentX <= 0.44 * windowWidth &&
            ev.currentY > 0.89 * windowHeight &&
            ev.currentY <= 0.96 * windowHeight
          ) {
            let _recorder = [...recorder];
            _recorder[0] = {
              player: true,
              id: m.id,
            };
            setRecorder(_recorder);
          } else if (
            ev.currentX > 0.44 * windowWidth &&
            ev.currentX <= 0.49 * windowWidth &&
            ev.currentY > 0.89 * windowHeight &&
            ev.currentY <= 0.96 * windowHeight
          ) {
            let _recorder = [...recorder];
            _recorder[1] = {
              player: true,
              id: m.id,
            };
            setRecorder(_recorder);
          } else if (
            ev.currentX > 0.5 * windowWidth &&
            ev.currentX <= 0.56 * windowWidth &&
            ev.currentY > 0.89 * windowHeight &&
            ev.currentY <= 0.96 * windowHeight
          ) {
            let _recorder = [...recorder];
            _recorder[2] = {
              player: true,
              id: m.id,
            };
            setRecorder(_recorder);
          } else if (
            ev.currentX > 0.56 * windowWidth &&
            ev.currentX <= 0.65 * windowWidth &&
            ev.currentY > 0.89 * windowHeight &&
            ev.currentY <= 0.96 * windowHeight
          ) {
            let _recorder = [...recorder];
            _recorder[3] = {
              player: true,
              id: m.id,
            };
            setRecorder(_recorder);
          } else if (
            ev.currentX > 0.65 * windowWidth &&
            ev.currentX <= 0.75 * windowWidth &&
            ev.currentY > 0.89 * windowHeight &&
            ev.currentY <= 0.96 * windowHeight
          ) {
            let _recorder = [...recorder];
            _recorder[4] = {
              player: true,
              id: m.id,
            };
            setRecorder(_recorder);
          }
        },
      });
      gesture.enable();
    }
  });

  useEffect(() => {
    for (let k = 0; k < 5; k++) {
      if (recorder[k] !== undefined) {
        scene?.sounds.slice(1).forEach((m) => {
          if (recorder[k].id === m.id) {
            const smallImageRef = document.getElementById(`${k}-${m.id}-small`);

            if (smallImageRef !== null) {
              const gestureRemove: Gesture = createGesture({
                el: smallImageRef,
                threshold: 15,
                gestureName: "soundsRemoving",
                onStart: (ev) => {
                  setDragging(m.id);
                },
                onMove: (ev) => {
                  setCurrentX(ev.currentX);
                  setCurrentY(ev.currentY);
                },
                onEnd: (ev) => {
                  setDragging(0);

                  if (
                    // 1
                    // ev.currentX > 0.37 * windowWidth &&
                    // ev.currentX <= 0.7 * windowWidth &&
                    ev.currentY < 0.89 * windowHeight ||
                    ev.currentY > 0.96 * windowHeight
                  ) {
                    let _recorder = [...recorder];
                    _recorder[k] = {
                      player: false,
                      id: m.id,
                    };
                    setRecorder(_recorder);
                    // console.log(_recorder)
                  }
                },
              });
              gestureRemove.enable();
            }
          }
        });
      }
    }
  }, [recorder]);

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
    <IonPage
      id="view-scene-page"
      style={{
        backgroundImage: `url(${background(scene?.background)})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height: "auto",
      }}
    >
      <IonButton
        className="backButton"
        fill="default"
        onClick={() => {
          history.push("/");
        }}
        routerDirection="back"
      >
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
        scene.sounds.slice(1).map((m) => (
          <IonImg
            key={m.id}
            className="smallImageDragged"
            id={`${m.name}-small`}
            style={
              dragging === m.id
                ? {
                    // transform: `translate(${deltaX}px, ${deltaY}px)`,
                    left: `${currentX - 30}px`,
                    top: `${currentY - 30}px`,
                    opacity: 1,
                    zIndex: "2",
                  }
                : {}
            }
            src={img(`${scene.fromName}${m.name}Small.png`)}
          ></IonImg>
        ))
      ) : (
        <div></div>
      )}

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
                    player[m.id] ? howls[m.id].stop() : howls[m.id].play();
                    player[m.id] = !player[m.id];
                  }}
                ></IonImg>
              </IonCol>
            ))}
          </IonRow>

          <IonRow
            className="box"
            style={{
              backgroundImage: `url(${img(`${scene.bar}`)})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          >
            {recorder.map((step, k) =>
              scene.sounds.slice(1).map((m, index) => (
                <IonImg
                  key={m.id}
                  className="smallImageSelected"
                  id={`${k}-${m.id}-small`}
                  style={
                    // recorder[0].id === m.id
                    recorder[k]?.id === m.id && recorder[k]?.player === true
                      ? {
                          opacity: 1,
                          // left: `${200 + 66 * k}px`,
                          left: `${18 + 7 * k}vw`,
                        }
                      : {}
                  }
                  src={img(`${scene.fromName}${m.name}Small.png`)}
                ></IonImg>
              ))
            )}

            <IonImg
              id="ButtonPlay"
              className="playButton"
              onClick={() => {
                if (recorder[0]) {
                  playList();
                  playSelected();
                }
              }}
              src={img(`${scene.playButton}`)}
            ></IonImg>
          </IonRow>
        </IonGrid>
      ) : (
        <div>Scene not found</div>
      )}
    </IonPage>
  );
}

export default ViewScene;
