import { IonLoading } from "@ionic/react";

export default function Loading(props: {
  showLoading: any;
  setShowLoading: any;
}) {
  const { showLoading, setShowLoading } = props;
  return (
    <IonLoading
      cssClass="loading"
      isOpen={showLoading}
      onDidDismiss={() => setShowLoading(false)}
      spinner={"circles"}
    />
  );
}
