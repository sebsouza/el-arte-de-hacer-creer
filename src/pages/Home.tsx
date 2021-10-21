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
} from "@ionic/react";
import "./Home.css";

import { background } from "../util";

const Home: React.FC = () => {
  const [Scenes, setScenes] = useState<Scene[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getScenes();
    setScenes(msgs);
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
