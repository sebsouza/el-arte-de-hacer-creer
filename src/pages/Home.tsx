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

const Home: React.FC = () => {
  const [Scenes, setScenes] = useState<Scene[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getScenes();
    setScenes(msgs);
  });

  return (
    <IonPage id="home-page">
      <IonContent>
        <IonGrid className="grid">
          <IonRow>
            {Scenes.map((m) => (
              <IonCol className="col">
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
