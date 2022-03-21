import { IonCol, IonImg, IonRow } from "@ionic/react";
import { img } from "../../util";

export default function ImageHeader(props: { scene: any }) {
  const { scene } = props;
  return (
    <IonRow className="ion-justify-content-center header">
      <IonCol>
        <IonImg
          className="image-header"
          src={img(`${scene.fromName}Header.png`)}
        />
      </IonCol>
    </IonRow>
  );
}
