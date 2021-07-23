import StageListItem from "../components/StageListItem";
import { useState } from "react";
import { Stage, getStages } from "../data/stages";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
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

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>EL ARTE DE HACER CREER</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {Stages.map((m) => (
            <StageListItem key={m.id} stage={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
