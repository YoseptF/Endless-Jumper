import Phaser from 'phaser';

const menuScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function menuScene() {
      Phaser.Scene.call(this, { key: 'menuScene' });
      window.MENU = this;
    },

  preload() {
  },

  create() {
    const playButton = this.add.text(100, 100, 'Play!', {
      color: '#000',
      backgroundColor: '#fff',
      fixedWidth: 250,
      fixedHeight: 70,
      align: 'center',
      baselineY: 0.525,
    });

    playButton.setInteractive({ useHandCursor: true });

    playButton.on('pointerdown', () => {
      this.scene.start('gameScene');
    }, this);
  },

  update() {
  },

});

export default menuScene;