export interface Stage {
  fromName: string;
  subject: string;
  id: number;
  avatar: string;
}

const Stages: Stage[] = [
  {
    fromName: "MISTERIO",
    subject: "New event: Trip to Vegas",
    id: 0,
    avatar: "misterio.jpg",
  },
  {
    fromName: "MAGIA",
    subject: "Long time no chat",
    id: 1,
    avatar: "misterio.jpg",
  },
  {
    fromName: "AVENTURA",
    subject: "Report Results",
    id: 2,
    avatar: "misterio.jpg",
  },
  {
    fromName: "AEROPUERTO",
    subject: "The situation",
    id: 3,
    avatar: "misterio.jpg",
  },
];

export const getStages = () => Stages;

export const getStage = (id: number) => Stages.find((m) => m.id === id);
