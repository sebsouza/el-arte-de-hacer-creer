import SceneListItem from "../components/SceneListItem";
import { useState } from "react";
import { Scene, getScenes } from "../data/scenes";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
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
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>EL ARTE DE HACER CREER</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className="items">
          {Scenes.map((m) => (
            <SceneListItem key={m.id} scene={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
