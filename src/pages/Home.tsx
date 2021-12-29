import SceneListItem from "../components/SceneListItem";
import { useState } from "react";
import { Scene, getScenes } from "../data/scenes";
import {
  IonCol,
  IonContent,
  IonPage,
  useIonViewWillEnter,
  IonRow,
  IonGrid,
  useIonViewWillLeave,
  IonImg,
} from "@ionic/react";
import "./Home.css";

import { Howl } from "howler";
import { audio, img } from "../util";

import { background } from "../util";

const Home: React.FC = () => {
  const [Scenes, setScenes] = useState<Scene[]>([]);

  var _howl: Howl;

  _howl = new Howl({
    src: [audio("portada.mp3")],
    volume: 1,
    loop: true,
  });

  useIonViewWillEnter(() => {
    const msgs = getScenes();
    setScenes(msgs);

    _howl.play();
  });

  useIonViewWillLeave(() => {
    _howl.stop();
  });

  return (
    <IonPage id="home-page">
      <IonContent style={{ alignItems: "center", display: "flex" }}>
        <IonGrid
          style={{
            backgroundImage: `url(${background("home.png")})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="grid"
        >
          <IonRow className="ion-justify-content-center header-home">
            <IonCol>
              <IonImg
                className="image-header"
                src={img(`homeHeader.png`)}
              ></IonImg>
            </IonCol>
          </IonRow>

          <IonRow className="row">
            {Scenes.map((m) => (
              <IonCol className="col" key={m.id}>
                <SceneListItem key={m.id} scene={m} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
