import { IonButton } from "@ionic/react";

import { useHistory } from "react-router";

export default function BackButton(props: { scene: any }) {
  const history = useHistory();
  const { scene } = props;
  return (
    <IonButton
      className="backButton"
      fill="default"
      onClick={() => {
        history.push("/");
      }}
      routerDirection="back"
      style={{
        zIndex: 100,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon"
        viewBox="0 0 512 512"
        width="100"
      >
        <title>Arrow Back Circle</title>
        <path
          fill="none"
          stroke={scene?.primaryColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="36"
          d="M249.38 336L170 256l79.38-80M181.03 256H342"
        />
        <path
          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
          fill="none"
          stroke={scene?.primaryColor}
          strokeMiterlimit="10"
          strokeWidth="36"
        />
      </svg>
    </IonButton>
  );
}
