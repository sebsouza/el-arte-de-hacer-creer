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
} from "@ionic/react";
import "./Home.css";
import { Howl } from "howler";
import { audio } from "../util";

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
      <IonContent>
        <IonGrid
          style={{
            backgroundImage: `url(${background("home.jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="grid"
        >
          <IonRow>
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
