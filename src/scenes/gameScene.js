import Phaser from 'phaser';
import { gameController } from '../packages/gameController';

let gmController;

const gameScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function gameScene() {
      Phaser.Scene.call(this, { key: 'gameScene' });
      window.GAME = this;
      gmController = gameController(this);
    },

  preload() {
    gmController.preload(15);
  },

  create() {
    gmController.create(
      {
        style: 'random',
      },
    );
  },

  update() {
    gmController.update();
  },


});

export default gameScene;