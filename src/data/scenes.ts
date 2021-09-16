export interface Scene {
  fromName: string;
  id: number;
  avatar: string;
  background: string;
  sounds: { id: number; src: string; name: string; img: string }[];
}

const Scenes: Scene[] = [
  {
    fromName: "MISTERIO",
    id: 0,
    avatar: "misterio.jpg",
    background: "aventura.jpeg",
    sounds: [
      { id: 0, name: "Misterio", src: "misterio0.mp3", img: "" },
      { id: 1, name: "Cuerdas", src: "misterio1.mp3", img: "misterio1.png" },
      { id: 2, name: "Pasos", src: "misterio2.mp3", img: "misterio2.png" },
      {
        id: 3,
        name: "Telefono sonando",
        src: "misterio3.mp3",
        img: "misterio3.png",
      },
      {
        id: 4,
        name: "Telefono ocupado",
        src: "misterio4.mp3",
        img: "misterio4.png",
      },
    ],
  },
  {
    fromName: "MAGIA",
    id: 1,
    avatar: "magia.png",
    background: "aventura.jpeg",
    sounds: [
      { id: 0, name: "Magia", src: "magia0.mp3", img: "" },
      { id: 1, name: "Risa de bruja", src: "magia1.mp3", img: "magia1.png" },
      { id: 2, name: "Polvo de hadas", src: "magia2.mp3", img: "magia2.png" },
      /* { id: 3, name: "Bosque encantado", src: "magia3.mp3" , img: "magia3.png" }, */
      { id: 4, name: "Dragon", src: "magia4.mp3", img: "magia4.png" },
    ],
  },
  {
    fromName: "AVENTURA",
    id: 2,
    avatar: "aventura.png",
    background: "aventura.jpeg",
    sounds: [
      { id: 0, name: "Aventura", src: "aventura0.mp3", img: "" },
      {
        id: 1,
        name: "Barco",
        src: "aventuraBarco.mp3",
        img: "aventuraBarco.png",
      },
      { id: 2, name: "Agua", src: "aventuraAgua.mp3", img: "aventuraAgua.png" },
      {
        id: 3,
        name: "Explosión",
        src: "aventuraExplosion.mp3",
        img: "aventuraExplosion.png",
      },
      {
        id: 4,
        name: "Espadas",
        src: "aventuraEspadas.mp3",
        img: "aventuraEspadas.png",
      },
      {
        id: 5,
        name: "Grito",
        src: "aventuraGrito.mp3",
        img: "aventuraGrito.png",
      },
    ],
  },
];

export const getScenes = () => Scenes;

export const getScene = (id: number) => Scenes.find((m) => m.id === id);
