export interface Stage {
  fromName: string;
  subject: string;
  id: number;
}

const Stages: Stage[] = [
  {
    fromName: "MISTERIO",
    subject: "New event: Trip to Vegas",
    id: 0,
  },
  {
    fromName: "MAGIA",
    subject: "Long time no chat",
    id: 1,
  },
  {
    fromName: "AVENTURA",
    subject: "Report Results",
    id: 2,
  },
  {
    fromName: "AEROPUERTO",
    subject: "The situation",
    id: 3,
  },
];

export const getStages = () => Stages;

export const getStage = (id: number) => Stages.find((m) => m.id === id);
