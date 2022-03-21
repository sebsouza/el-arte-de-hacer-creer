import { IonCol, IonImg, IonRow } from "@ionic/react";
import { Key } from "react";
import { img } from "../../util";

export default function ImageButton(props: {
  scene: any;
  soundSelected: any;
  player: any;
  howls: any;
}) {
  const { scene, soundSelected, player, howls } = props;
  return (
    <IonRow className="ion-justify-content-center header">
      {scene.sounds.slice(1).map((m: { id: Key; name: string; img: any }) => (
        <IonCol key={m.id} size="1">
          <IonImg
            id={m.name}
            className="image-button"
            src={img(m.img)}
            onClick={() => {
              soundSelected(m.name);
              player[m.id] ? howls[m.id].stop() : howls[m.id].play();
              player[m.id] = !player[m.id];

              if (player[m.id]) {
                howls[m.id].once("end", () => {
                  player[m.id] = !player[m.id];
                });
              }
            }}
          />
        </IonCol>
      ))}
    </IonRow>
  );
}
