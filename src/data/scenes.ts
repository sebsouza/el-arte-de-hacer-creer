export interface Scene {
  fromName: string;
  id: number;
  avatar: string;
  background: string;
  primaryColor: string;
  playButton: string;
  bar: string;
  sounds: { id: number; src: string; name: string; img: string }[];
}

const Scenes: Scene[] = [
  {
    fromName: "misterio",
    id: 0,
    avatar: "misterio.png",
    background: "misterio.png",
    primaryColor: "rgb(199,94,131)",
    playButton: "misterioPlay.png",
    bar: "misterioBarraCartel.png",
    sounds: [
      { id: 0, name: "Misterio", src: "misterio0.mp3", img: "" },
      {
        id: 1,
        name: "Susurro",
        src: "misterioSusurro.mp3",
        img: "misterioSusurro.png",
      },
      {
        id: 2,
        name: "Puerta",
        src: "misterioPuerta.mp3",
        img: "misterioPuerta.png",
      },
      {
        id: 3,
        name: "Pasos",
        src: "misterioPasos.mp3",
        img: "misterioPasos.png",
      },
      {
        id: 4,
        name: "Risa",
        src: "misterioRisa.mp3",
        img: "misterioRisa.png",
      },
      {
        id: 5,
        name: "Sirena",
        src: "misterioSirena.mp3",
        img: "misterioSirena.png",
      },
    ],
  },
  {
    fromName: "magia",
    id: 1,
    avatar: "magia.png",
    background: "magia.png",
    primaryColor: "rgb(0,96,136)",
    playButton: "magiaPlay.png",
    bar: "magiaBarraCartel.png",
    sounds: [
      { id: 0, name: "Magia", src: "magia0.mp3", img: "" },
      {
        id: 1,
        name: "Hechizo",
        src: "magiaHechizo.mp3",
        img: "magiaHechizo.png",
      },
      {
        id: 2,
        name: "Dragon",
        src: "magiaDragon.mp3",
        img: "magiaDragon.png",
      },
      {
        id: 3,
        name: "Risa",
        src: "magiaRisa.mp3",
        img: "magiaRisa.png",
      },
      { id: 4, name: "Polvo", src: "magiaPolvo.mp3", img: "magiaPolvo.png" },
      {
        id: 5,
        name: "Bosque",
        src: "magiaBosque.mp3",
        img: "magiaBosque.png",
      },
    ],
  },
  {
    fromName: "aventura",
    id: 2,
    avatar: "aventura.png",
    background: "aventura.png",
    primaryColor: "rgb(0,97,134)",
    playButton: "aventuraPlay.png",
    bar: "aventuraBarraCartel.png",
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
        name: "Explosion",
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
