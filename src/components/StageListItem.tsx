import { IonItem, IonLabel } from "@ionic/react";
import { Stage } from "../data/stages";
import "./StageListItem.css";

interface StageListItemProps {
  stage: Stage;
}

const StageListItem: React.FC<StageListItemProps> = ({ stage }) => {
  return (
    <IonItem routerLink={`/stage/${stage.id}`} detail={false}>
      <IonLabel className="ion-text-wrap">
        <h2>{stage.fromName}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default StageListItem;
