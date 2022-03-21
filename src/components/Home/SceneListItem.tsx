import {
  IonItem,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  CreateAnimation,
} from "@ionic/react";
import { useRef } from "react";
import { Scene } from "../../data/scenes";
import "./SceneListItem.css";
import { img } from "../../util";
import { useHistory } from "react-router";

interface SceneListItemProps {
  scene: Scene;
}

/* ANIMATION */

const SceneListItem: React.FC<SceneListItemProps> = ({ scene }) => {
  const animationRef = useRef<CreateAnimation>(null);
  const history = useHistory();

  const handleClick = async () => {
    if (animationRef.current !== null) {
      await animationRef.current.setupAnimation({
        duration: 1000,
        fill: "none",
        fromTo: {
          property: "transform",
          fromValue: "  scale(1)",
          toValue: ` scale(1.5)`,
        },

        easing: "ease-out",
      });
      // Play animation with animation reference
      animationRef.current.animation.play();
    }
  };

  return (
    <CreateAnimation ref={animationRef}>
      <IonItem
        onClick={(e) => {
          e.preventDefault();
          setTimeout(() => history.push(`/scene/${scene.id}`), 800);
          handleClick();
        }}
        detail={false}
      >
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonImg className="avatar" src={img(scene.avatar)}></IonImg>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </CreateAnimation>
  );
};

export default SceneListItem;
