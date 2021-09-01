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
      { id: 0, name: "Misterio", src: "misterio0.mp3" },
      { id: 1, name: "Cuerdas", src: "misterio1.mp3" },
      { id: 2, name: "Pasos", src: "misterio2.mp3" },
      { id: 3, name: "Telefono sonando", src: "misterio3.mp3" },
      { id: 4, name: "Telefono ocupado", src: "misterio4.mp3" },
    ],
  },
  {
    fromName: "MAGIA",
    id: 1,
    avatar: "magia.png",
    sounds: [
      { id: 0, name: "Magia", src: "magia0.mp3" },
      { id: 1, name: "Risa de bruja", src: "magia1.mp3" },
      { id: 2, name: "Polvo de hadas", src: "magia2.mp3" },
      /* { id: 3, name: "Bosque encantado", src: "magia3.mp3" }, */
      { id: 4, name: "Dragon", src: "magia4.mp3" },
    ],
  },
  {
    fromName: "AVENTURA",
    id: 2,
    avatar: "aventura.png",
    sounds: [
      { id: 0, name: "Aventura", src: "aventura0.mp3" },
      { id: 1, name: "Explosión", src: "aventura1.mp3" },
      { id: 2, name: "Espadas", src: "aventura2.mp3" },
      /* { id: 3, name: "Espadas", src: "aventura3.mp3" },
      { id: 4, name: "Gritos", src: "aventura4.mp3" }, */
    ],
  },
];

export const getScenes = () => Scenes;

export const getScene = (id: number) => Scenes.find((m) => m.id === id);
