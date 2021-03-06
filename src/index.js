import Phaser from 'phaser'; // eslint-disable-line import/no-unresolved
import './sass/style.scss';
import {
  gameScene, menuScene, instructionsScene, creditsScene, leaderboardScene,
} from './scenes/sceneLoader';

window.onload = () => {
  const canvas = document.querySelector('canvas');
  const canvasWidth = canvas.clientWidth;
  document.getElementById('fullscreen').style.paddingLeft = `${canvasWidth - 40}px`;
  document.querySelector('#fullscreen i').addEventListener('click', () => canvas.requestFullscreen());
};

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-canvas',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 421,
    height: 750,
  },
  backgroundColor: '#46a6ce',
  scene: [menuScene, gameScene, instructionsScene, creditsScene, leaderboardScene],
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        x: 0,
        y: 1.2,
      },
      plugins: {
        attractors: true,
      },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
