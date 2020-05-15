import Phaser from 'phaser'; // eslint-disable-line import/no-unresolved
import button from '../packages/UI';

const creditsScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function creditsScene() {
      Phaser.Scene.call(this, { key: 'creditsScene' });
    },

  preload() {
  },

  create() {
    button(
      this,
      5,
      50,
      'Back',
      'Roboto',
      () => {
        this.scene.pause();
        this.scene.stop();
        this.scene.start('menuScene');
      },
    );

    this.add.text(120, 200, 'Code: Joseph Flores', {
      align: 'center',
    });
    this.add.text(100, 250, 'Original Idea: Lima Sky', {
      align: 'center',
    });
    this.add.text(120, 300, 'Music: Patric Catani', {
      align: 'center',
    });
    this.add.text(135, 350, 'Engine: Phaser 3', {
      align: 'center',
    });
  },

  update() {
  },

});

export default creditsScene;