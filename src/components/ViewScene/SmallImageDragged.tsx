import { IonImg } from "@ionic/react";
import { img } from "../../util";

export default function SmallImageDragged(props: {
  m: any;
  dragging: number;
  currentX: number;
  currentY: number;
  scene: any;
}) {
  const { m, dragging, currentX, currentY, scene } = props;
  return (
    <IonImg
      key={m.id}
      className="smallImageDragged"
      id={`${m.name}-small`}
      style={
        dragging === m.id
          ? {
              left: `${currentX - 30}px`,
              top: `${currentY - 30}px`,
              opacity: 1,
              zIndex: "2",
            }
          : {}
      }
      src={img(`${scene.fromName}${m.name}Small.png`)}
    />
  );
}
