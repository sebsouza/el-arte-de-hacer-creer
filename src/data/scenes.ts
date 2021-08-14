export interface Scene {
  fromName: string;
  subject: string;
  id: number;
  avatar: string;
  sounds: { id: number; src: string; name: string }[];
}

const Scenes: Scene[] = [
  {
    fromName: "MISTERIO",
    subject: "New event: Trip to Vegas",
    id: 0,
    avatar: "misterio.jpg",
    sounds: [
      { id: 0, src: "misterio0.mp3", name: "nombre0" },
      { id: 1, src: "misterio1.mp3", name: "nombre1" },
      { id: 2, src: "misterio2.mp3", name: "nombre2" },
      { id: 3, src: "misterio3.mp3", name: "nombre3" },
    ],
  },
  {
    fromName: "MAGIA",
    subject: "Long time no chat",
    id: 1,
    avatar: "misterio.jpg",
    sounds: [{ id: 1, src: "misterio1", name: "nombre0" }],
  },
  {
    fromName: "AVENTURA",
    subject: "Report Results",
    id: 2,
    avatar: "misterio.jpg",
    sounds: [{ id: 2, src: "misterio1", name: "nombre0" }],
  },
  {
    fromName: "AEROPUERTO",
    subject: "The situation",
    id: 3,
    avatar: "misterio.jpg",
    sounds: [{ id: 3, src: "misterio1", name: "nombre0" }],
  },
];

export const getScenes = () => Scenes;

export const getScene = (id: number) => Scenes.find((m) => m.id === id);
