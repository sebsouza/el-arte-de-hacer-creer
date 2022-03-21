import { useState, useEffect } from "react";
import { Scene, getScene } from "../data/scenes";
import {
  IonPage,
  useIonViewWillEnter,
  IonGrid,
  createGesture,
  Gesture,
  useIonViewDidEnter,
} from "@ionic/react";
import { Howl } from "howler";
import { useParams } from "react-router";
import "./ViewScene.css";

import { audio, background } from "../util";

import Loading from "../components/Loading";
import BackButton from "../components/ViewScene/BackButton";
import PLayBar from "../components/ViewScene/PLayBar";
import ImageButton from "../components/ViewScene/ImageButton";
import ImageHeader from "../components/ViewScene/ImageHeader";
import SmallImageDragged from "../components/ViewScene/SmallImageDragged";

function ViewScene() {
  const [scene, setScene] = useState<Scene>();
  const params = useParams<{ id: string }>();
  const [howls, setHowls] = useState<Howl[]>([]);
  const [list, setList] = useState<Howl[]>([]);
  const [player, setPlayer] = useState<boolean[]>([]);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [dragging, setDragging] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  const [recorder, setRecorder] = useState<
    {
      id: number;
      player: boolean;
    }[]
  >([
    {
      id: -1,
      player: false,
    },
    {
      id: -1,
      player: false,
    },
    {
      id: -1,
      player: false,
    },
    {
      id: -1,
      player: false,
    },
    {
      id: -1,
      player: false,
    },
  ]);

  useIonViewWillEnter(() => {
    const _scene = getScene(parseInt(params.id, 10));
    setScene(_scene);
    setShowLoading(true);
  });

  useIonViewDidEnter(() => {
    setShowLoading(false);
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

  useEffect(() => {
    let _list: Howl[] = [];
    recorder.forEach((step) => {
      if (step.player) _list.push(howls[step.id]);
    });
    setList(_list);
  }, [recorder]);

  const playList = () => {
    if (list.length) {
      howls.forEach((sound, index) => {
        if (index) sound.stop();
      });
      list[0].play();

      for (let i = 0; i < list.length - 1; i++) {
        list[i].once("end", () => {
          list[i + 1].play();
        });
      }
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
        onStart: () => {
          setDragging(m.id);
        },
        onMove: (ev) => {
          setCurrentX(ev.currentX);
          setCurrentY(ev.currentY);
        },
        onEnd: (ev) => {
          setDragging(0);
          for (let i = 0; i < 5; i++) {
            if (
              ev.currentX > (0.27 + i * 0.1) * windowWidth &&
              ev.currentX <= (0.37 + i * 0.1) * windowWidth &&
              ev.currentY > 0.8 * windowHeight &&
              ev.currentY <= windowHeight
            ) {
              let _recorder = [...recorder];
              _recorder[i] = {
                player: true,
                id: m.id,
              };
              setRecorder(_recorder);
            }
          }
        },
      });
      gesture.enable();
    }
  });

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
                  ev.currentY < 0.89 * windowHeight ||
                  ev.currentY > 0.96 * windowHeight
                ) {
                  let _recorder = [...recorder];
                  _recorder[k] = {
                    player: false,
                    id: m.id,
                  };
                  setRecorder(_recorder);
                }
              },
            });
            gestureRemove.enable();
          }
        }
      });
    }
  }

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
      <Loading showLoading={showLoading} setShowLoading={setShowLoading} />

      <BackButton scene={scene} />

      {scene ? (
        scene.sounds
          .slice(1)
          .map((m) => (
            <SmallImageDragged
              m={m}
              dragging={dragging}
              currentX={currentX}
              currentY={currentY}
              scene={scene}
            />
          ))
      ) : (
        <></>
      )}

      {scene ? (
        <IonGrid className="gridScene">
          <ImageHeader scene={scene} />

          <ImageButton
            scene={scene}
            soundSelected={soundSelected}
            player={player}
            howls={howls}
          />

          <PLayBar
            scene={scene}
            recorder={recorder}
            playList={playList}
            playSelected={playSelected}
          />
        </IonGrid>
      ) : (
        <div>Scene not found</div>
      )}
    </IonPage>
  );
}

export default ViewScene;
