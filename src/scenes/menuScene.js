import Phaser from 'phaser'; // eslint-disable-line import/no-unresolved
import player from '../packages/player';
import background from '../packages/enviroment';
import basicPlatform from '../packages/platforms';
import { chooseJumplablePlatforms, PlayerMovement } from '../packages/gameController';
import button from '../packages/UI';
import WebFontFile from '../packages/webFontFile';
import { gyroscopePlayerMovement, setDOMUsername, getDOMUsername } from '../packages/DOMInteractions';
import titleImage from '../images/title.png';

let plyr;
let bckg;
let plat;
let jump;
let cursors;
let bckPos = 0;

const menuScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function menuScene() {
      Phaser.Scene.call(this, { key: 'menuScene' });
      window.MENU = this;
    },

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Roboto'));
    this.load.image('title', titleImage);

    bckg = background(this);
    plyr = player(this);
    plat = basicPlatform(this);
  },

  create() {
    bckg.create();
    plyr.create(75, 500);
    plat.create(75, 600);

    this.add.image(210, 120, 'title');

    button(
      this,
      100,
      200,
      'Play!!',
      'Roboto',
      () => {
        getDOMUsername();
        this.scene.start('gameScene');
      },
    );

    button(
      this,
      150,
      250,
      'Instructions',
      'Roboto',
      () => this.scene.start('instructionsScene'),
    );

    button(
      this,
      200,
      300,
      'Leaderboards',
      'Roboto',
      () => this.scene.start('leaderboardScene'),
    );

    button(
      this,
      250,
      350,
      'Credits',
      'Roboto',
      () => this.scene.start('creditsScene'),
    );

    setDOMUsername(53, 60, 'Your current username');

    cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.on('collisionstart', () => {
      jump = true;
    });

    gyroscopePlayerMovement(plyr);
  },

  update() {
    chooseJumplablePlatforms(this, [plat], plyr);
    jump = PlayerMovement(jump, plyr, cursors);
    if (plyr.y > 750) {
      plyr.x = 80;
      plyr.y = 500;
      plyr.setVelocityY(0);
      plyr.setVelocityX(0);
    }
    bckg.tilePositionX = Math.sin(bckPos) * 700;
    bckg.tilePositionY = Math.cos(bckPos) * 400;
    bckPos += 0.01;
  },

});

export default menuScene;