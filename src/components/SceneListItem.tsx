import { IonItem, IonImg, IonGrid, IonRow, IonCol } from "@ionic/react";
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
            <IonImg src={img(scene.avatar)}></IonImg>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default SceneListItem;
