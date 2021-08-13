import {
  IonItem,
  IonLabel,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { Scene } from "../data/scenes";
import "./SceneListItem.css";

import { img } from "../util";

interface SceneListItemProps {
  scene: Scene;
}

const SceneListItem: React.FC<SceneListItemProps> = ({ scene }) => {
  return (
    <IonItem routerLink={`/scene/${scene.id}`} detail={false}>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonAvatar>
              <img alt={scene.fromName} src={img(scene.avatar)} />
            </IonAvatar>
            <IonLabel className="ion-text-wrap">
              <h2>{scene.fromName}</h2>
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default SceneListItem;
