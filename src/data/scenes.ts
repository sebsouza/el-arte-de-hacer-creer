export interface Scene {
  fromName: string;
  id: number;
  avatar: string;
  sounds: { id: number; src: string; name: string }[];
}

const Scenes: Scene[] = [
  {
    fromName: "MISTERIO",
    id: 0,
    avatar: "misterio.jpg",
    sounds: [
      { id: 0, name: "Main", src: "misterio0.mp3" },
      { id: 1, name: "Cuerdas", src: "misterio1.mp3" },
      { id: 2, name: "Pasos", src: "misterio2.mp3" },
      { id: 3, name: "name", src: "misterio3.mp3" },
    ],
  },
  {
    fromName: "MAGIA",
    id: 1,
    avatar: "misterio.jpg",
    sounds: [{ id: 1, name: "name", src: "misterio0.mp3" }],
  },
  {
    fromName: "AVENTURA",
    id: 2,
    avatar: "misterio.jpg",
    sounds: [{ id: 2, name: "name", src: "misterio1" }],
  },
  {
    fromName: "AEROPUERTO",
    id: 3,
    avatar: "misterio.jpg",
    sounds: [{ id: 3, name: "name", src: "misterio1" }],
  },
];

export const getScenes = () => Scenes;

export const getScene = (id: number) => Scenes.find((m) => m.id === id);
