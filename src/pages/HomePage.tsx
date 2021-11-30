import { IonContent, IonPage, IonGrid } from "@ionic/react";

import { background } from "../util";
import { useHistory } from "react-router";

const HomePage: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <IonGrid
          style={{
            backgroundImage: `url(${background("portada.png")})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100%",
          }}
          onClick={() => {
            history.push("/home");
          }}
        ></IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
