export interface Scene {
  fromName: string;
  subject: string;
  id: number;
  avatar: string;
  sounds: object[];
}

const Scenes: Scene[] = [
  {
    fromName: "MISTERIO",
    subject: "New event: Trip to Vegas",
    id: 0,
    avatar: "misterio.jpg",
    sounds: [{ id: 0, name: "keys.wav" }],
  },
  {
    fromName: "MAGIA",
    subject: "Long time no chat",
    id: 1,
    avatar: "misterio.jpg",
    sounds: [{ id: 1, name: "misterio1" }],
  },
  {
    fromName: "AVENTURA",
    subject: "Report Results",
    id: 2,
    avatar: "misterio.jpg",
    sounds: [{ id: 2, name: "misterio1" }],
  },
  {
    fromName: "AEROPUERTO",
    subject: "The situation",
    id: 3,
    avatar: "misterio.jpg",
    sounds: [{ id: 3, name: "misterio1" }],
  },
];

export const getScenes = () => Scenes;

export const getScene = (id: number) => Scenes.find((m) => m.id === id);
