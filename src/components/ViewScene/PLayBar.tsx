import { IonCol, IonImg, IonRow } from "@ionic/react";
import { Key } from "react";
import { img } from "../../util";

export default function PLayBar(props: {
  scene: any;
  recorder: any;
  playList: any;
  playSelected: any;
}) {
  const { scene, recorder, playList, playSelected } = props;
  return (
    <IonRow
      className="ion-justify-content-center box"
      style={{
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <IonCol
        style={{
          left: "-16%",
        }}
      >
        <IonImg
          style={{
            height: "8vh",
          }}
          src={img(`${scene.bar}`)}
        />
      </IonCol>
      <IonCol>
        {recorder.map((step: any, k: number) =>
          scene.sounds.slice(1).map((m: { id: Key; name: any }) => (
            <IonImg
              key={m.id}
              className="smallImageSelected"
              id={`${k}-${m.id}-small`}
              style={
                recorder[k]?.id === m.id && recorder[k]?.player === true
                  ? {
                      opacity: 1,
                      left: `${-14 + 10 * k}vw`,
                      zIndex: 100,
                    }
                  : {}
              }
              src={img(`${scene.fromName}${m.name}Small.png`)}
            />
          ))
        )}
      </IonCol>
      <IonCol
        style={{
          right: "-16%",
        }}
      >
        <IonImg
          id="ButtonPlay"
          className="playButton"
          onClick={() => {
            if (recorder[0]) {
              playList();
              playSelected();
            }
          }}
          src={img(`${scene.playButton}`)}
        ></IonImg>
      </IonCol>
    </IonRow>
  );
}
