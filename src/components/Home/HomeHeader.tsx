import { IonRow, IonCol, IonImg } from "@ionic/react";
import { img } from "../../util";

export default function HomeHeader() {
  return (
    <IonRow className="ion-justify-content-center header-home">
      <IonCol>
        <IonImg className="image-header" src={img(`homeHeader.png`)}></IonImg>
      </IonCol>
    </IonRow>
  );
}
