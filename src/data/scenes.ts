export interface Scene {
  fromName: string;
  id: number;
  avatar: string;
  background: string;
  primaryColor: string;
  sounds: { id: number; src: string; name: string; img: string }[];
}

const Scenes: Scene[] = [
  {
    fromName: "MISTERIO",
    id: 0,
    avatar: "misterio.png",
    background: "misterio.png",
    primaryColor: "rgb(101,64,116)",
    sounds: [
      { id: 0, name: "Misterio", src: "misterio0.mp3", img: "" },
      { id: 1, name: "Pasos", src: "misterio1.mp3", img: "misterioPasos.png" },
      {
        id: 2,
        name: "Puerta",
        src: "misterio2.mp3",
        img: "misterioPuerta.png",
      },
      { id: 3, name: "Risa", src: "misterio3.mp3", img: "misterioRisa.png" },
      {
        id: 4,
        name: "Sirena",
        src: "misterio4.mp3",
        img: "misterioSirena.png",
      },
      {
        id: 2,
        name: "Susurro",
        src: "misterio5.mp3",
        img: "misterioSusurro.png",
      },
    ],
  },
  {
    fromName: "MAGIA",
    id: 1,
    avatar: "magia.png",
    background: "magia.png",
    primaryColor: "rgb(0,96,136)",
    sounds: [
      { id: 0, name: "Magia", src: "magia0.mp3", img: "" },
      { id: 1, name: "Risa de bruja", src: "magia1.mp3", img: "magiaRisa.png" },
      {
        id: 2,
        name: "Polvo de hadas",
        src: "magia2.mp3",
        img: "magiaPolvo.png",
      },
      {
        id: 3,
        name: "Hechizo",
        src: "magia3.mp3",
        img: "magiaHechizo.png",
      },
      { id: 4, name: "Dragon", src: "magia4.mp3", img: "magiaDragon.png" },
      {
        id: 5,
        name: "Bosque encantado",
        src: "magia5.mp3",
        img: "magiaBosque.png",
      },
    ],
  },
  {
    fromName: "AVENTURA",
    id: 2,
    avatar: "aventura.png",
    background: "aventura.jpg",
    primaryColor: "rgb(0,97,134)",
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
