import StageListItem from "../components/StageListItem";
import { useState } from "react";
import { Stage, getStages } from "../data/stages";
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
  const [Stages, setStages] = useState<Stage[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getStages();
    setStages(msgs);
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
          {Stages.map((m) => (
            <StageListItem key={m.id} stage={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
