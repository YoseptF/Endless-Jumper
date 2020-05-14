import Phaser from 'phaser';
import { player } from '../packages/player'
import { background } from '../packages/enviroment'
import { basicPlatform } from '../packages/platforms';
import { chooseJumplablePlatforms, PlayerMovement } from '../packages/gameController';
import { button } from '../packages/UI';
import WebFontFile from '../packages/webFontFile';

let plyr
let bckg
let plat
let jump
let cursors

const menuScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function menuScene() {
      Phaser.Scene.call(this, { key: 'menuScene' });
      window.MENU = this;
    },

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Roboto'))

    bckg = background(this)
    plyr = player(this)
    plat = basicPlatform(this)
  },

  create() {
    bckg.create()
    plyr.create(75, 500)
    plat.create(75, 600)

    button(
      this,
      100,
      200,
      'Play!!',
      'Roboto',
      () => this.scene.start('gameScene')
    )

    button(
      this,
      150,
      250,
      'Instructions',
      'Roboto',
      () => this.scene.start('instructionsScene')
    )

    cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      jump = true
    });
  },

  update() {
    chooseJumplablePlatforms(this, [plat], plyr)
    jump = PlayerMovement(jump, plyr, cursors)
  },

});

export default menuScene;