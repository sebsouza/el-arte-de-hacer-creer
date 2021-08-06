import {
  IonItem,
  IonLabel,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { Stage } from "../data/stages";
import "./StageListItem.css";

import { img } from "../util";

interface StageListItemProps {
  stage: Stage;
}

const StageListItem: React.FC<StageListItemProps> = ({ stage }) => {
  return (
    <IonItem routerLink={`/stage/${stage.id}`} detail={false}>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonAvatar>
              <img alt={stage.fromName} src={img(stage.avatar)} />
            </IonAvatar>
            <IonLabel className="ion-text-wrap">
              <h2>{stage.fromName}</h2>
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default StageListItem;
