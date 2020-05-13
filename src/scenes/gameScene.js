import Phaser from 'phaser';
import { background } from '../packages/enviroment';
import { basicPlatform } from '../packages/platforms';
import { player } from '../packages/player';

let bckg;
let plyr
let cursors
let plats = []
let jump = false
let scroll = 0

const gameScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function gameScene() {
      Phaser.Scene.call(this, { key: 'gameScene' });
    },

  preload() {
    bckg = background(this)
    plyr = player(this)
    for (let i = 0; i < 12; i++) {
      plats.push(basicPlatform(this))
    }
  },

  create() {
    bckg.create()
    plyr.create()
    plats.forEach(plat => {
      plat.create()
    })
    cursors = this.input.keyboard.createCursorKeys();
    plats[0].setTint(0xff0000)
    // bckg.tilePositionY = plyr.y;
  },

  update() {

    plats.forEach(plat => {
      if(plyr.y + 30 < plat.y){
        plat.collisionCategory = 'jumpable'
      }
      else if(plyr.y < plat.y + 30){
        plat.collisionCategory = 'notJumpable'
      }
      if (!this.cameras.main.worldView.contains(plat.x, plat.y)) {
        plat.addAgain(this.cameras.main)
        plat.collisionCategory = 'notJumpable'
      }
    })

    let gameObjectCanvasY = plyr.y - this.cameras.main.scrollY * plyr.scrollFactorY

    if (gameObjectCanvasY < 350) {
      bckg.tilePositionY += 4;
      scroll -= 6
      this.cameras.main.setScroll(0, scroll)
    }
    if (jump) {
      plyr.thrustLeft(1.5);
      jump = false
    }
    if (cursors.right.isDown) {
      plyr.thrust(0.05);
    }
    else if (cursors.left.isDown) {
      plyr.thrustBack(0.05);
    }
    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      jump = true
      bodyA.gameObject.setTint(0xff0000)

    });
  },

});

export default gameScene;