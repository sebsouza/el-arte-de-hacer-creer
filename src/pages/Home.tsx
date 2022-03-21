import { useState } from "react";
import {
  IonContent,
  IonPage,
  useIonViewWillEnter,
  IonGrid,
  useIonViewWillLeave,
  useIonViewDidEnter,
} from "@ionic/react";
import "./Home.css";

import { Howl } from "howler";
import { audio } from "../util";

import { background } from "../util";
import HomeHeader from "../components/Home/HomeHeader";
import HomeScenes from "../components/Home/HomeScenes";
import Loading from "../components/Loading";

const Home: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);

  var _howl: Howl;

  _howl = new Howl({
    src: [audio("portada.mp3")],
    volume: 1,
    loop: true,
  });

  useIonViewWillEnter(() => {
    _howl.play();
    setShowLoading(true);
  });

  useIonViewDidEnter(() => {
    setShowLoading(false);
  });

  useIonViewWillLeave(() => {
    _howl.stop();
  });

  return (
    <IonPage id="home-page">
      <IonContent style={{ alignItems: "center", display: "flex" }}>
        <IonGrid
          style={{
            backgroundImage: `url(${background("home.png")})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="grid"
        >
          <Loading showLoading={showLoading} setShowLoading={setShowLoading} />

          <HomeHeader />

          <HomeScenes />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
