import { IonItem, IonLabel, IonNote } from "@ionic/react";
import { Stage } from "../data/stages";
import "./StageListItem.css";

interface StageListItemProps {
  stage: Stage;
}

const StageListItem: React.FC<StageListItemProps> = ({ stage }) => {
  return (
    <IonItem routerLink={`/stage/${stage.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {stage.fromName}
          <span className="date">
            <IonNote>{stage.date}</IonNote>
          </span>
        </h2>
        <h3>{stage.subject}</h3>
        <p>
          Hola, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default StageListItem;
