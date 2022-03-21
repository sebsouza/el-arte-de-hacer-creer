import { IonRow, IonCol, useIonViewWillEnter } from "@ionic/react";
import SceneListItem from "./SceneListItem";
import { Scene, getScenes } from "../../data/scenes";
import { useState } from "react";

export default function HomeScenes() {
  const [Scenes, setScenes] = useState<Scene[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getScenes();
    setScenes(msgs);
  });

  return (
    <IonRow className="row">
      {Scenes.map((m) => (
        <IonCol className="col" key={m.id}>
          <SceneListItem key={m.id} scene={m} />
        </IonCol>
      ))}
    </IonRow>
  );
}
