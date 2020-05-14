import Phaser from 'phaser';
import { background } from '../packages/enviroment';
import { basicPlatform } from '../packages/platforms';
import { player } from '../packages/player';

let bckg;
let newGame = true
let plyr
let cursors
let plats = []
let jump = false
let scroll = 0
let gammaMultiplier = 0.015
let created = false
let maxSpeed = 15

const gameScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function gameScene() {
      Phaser.Scene.call(this, { key: 'gameScene' });
      window.GAME = this;
    },

  preload() {
    bckg = background(this)
    plyr = player(this)
    for (let i = 0; i < 15; i++) {
      plats.push(basicPlatform(this))
    }

  },

  create() {


    bckg.create()
    plyr.create()
    let a = this.add.text(player.x, player.y, 'sop boi', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

    plats.forEach(plat => {
      plat.create(
        Phaser.Math.Between(0, 421),
        Phaser.Math.Between(0, 750)
      )
    })
    // plats[0].create(0, 500)
    // plats[1].create(60, 500)
    // plats[2].create(120, 500)
    // plats[3].create(180, 500)
    // plats[4].create(240, 500)
    // plats[5].create(300, 500)
    // plats[6].create(360, 500)

    plats[0].setTint(0xff0000)

    cursors = this.input.keyboard.createCursorKeys();
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', event => {

        document.querySelector('.gamma').innerHTML = event.gamma
        if (event.gamma < -3) {
          plyr.setVelocityX(event.gamma * 0.4)
        }
        if (event.gamma > 3) {
          plyr.setVelocityX(event.gamma * 0.4)
        }
      }, true)
    }
  },

  update() {
    if (plyr.velocity.x > maxSpeed) {
      plyr.setVelocityX(maxSpeed)
    }
    if (plyr.velocity.x < -maxSpeed) {
      plyr.setVelocityX(-maxSpeed)
    }

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
    });


    if (this.cameras.main.worldView.width > 0) {

      plats.forEach(plat => {
        if (plyr.y + 22 < plat.y) {
          plat.collisionCategory = 'jumpable'
        }
        else if (plyr.y < plat.y + 22) {
          plat.collisionCategory = 'notJumpable'
        }
        if (!this.cameras.main.worldView.contains(plat.x, plat.y)) {
          plat.addAgain(this.cameras.main)
          plat.collisionCategory = 'notJumpable'
        }
      })

      if (plyr.x < 0) {
        plyr.x = 421
      }
      if (plyr.x > 421) {
        plyr.x = 0
      }

      if (plyr.y > this.cameras.main.worldView.y + 770) {
        this.scene.pause()

        plats = []
        plyr = null
        scroll = 0
        this.scene.stop()
        this.scene.start('menuScene');
      }
    }
  },



});

export default gameScene;