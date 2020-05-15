import Phaser from 'phaser'
import { button } from '../packages/UI';
import WebFontFile from '../packages/webFontFile';
import { player } from '../packages/player'
import { background } from '../packages/enviroment'
import { basicPlatform } from '../packages/platforms';
import Doodler from '../images/Doodler.png'

import {
  chooseJumplablePlatforms,
  PlayerMovement,
  createPlatforms,
  positionPlatforms,
  warpPlayer
} from '../packages/gameController';
import { gyroscopePlayerMovement } from '../packages/DOMInteractions';

let plyr
let bckg
let instructionsPlats = []
let plats = []
let jump
let cursors


const instructionsScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function instructionsScene() {
      Phaser.Scene.call(this, { key: 'instructionsScene' });
    },

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Roboto'))
    this.load.image('Doodler', Doodler);

    bckg = background(this)
    plyr = player(this)
    for (let i = 0; i < 6; i += 1) {
      instructionsPlats.push(basicPlatform(this))
    }
    createPlatforms(7, this, plats)
  },

  create() {
    bckg.create()
    plyr.create(140, 500)
    let positions = [
      { a: 320, b: 170 },
      { a: 160, b: 200 },
      { a: 30, b: 250 },
      { a: 230, b: 370 },
      { a: 370, b: 420 },
      { a: 50, b: 490 }
    ]
    this.add.image(50, 490, 'Doodler')
    this.add.text(5, 520, 'You can cross platforms from the bottom', {
      align: 'left',
      wordWrap: {
        width: 160
      }
    })

    this.add.image(192, 300, 'Doodler')
    this.add.image(252, 230, 'Doodler')
    const firstArrow = this.add.text(212, 325, '→', {
      fontFamily: 'Roboto',
      fontSize: '28px',
    })
    firstArrow.setRotation(0.7)
    const secondArrow = this.add.text(222, 325, '→', {
      fontFamily: 'Roboto',
      fontSize: '28px',
    })
    secondArrow.setRotation(4.75)
    console.log(firstArrow);
    this.add.text(52, 360, 'You bounce from platforms', {
      align: 'right',
      wordWrap: {
        width: 160
      }
    })
    this.add.text(285, 425, 'If you barely reach the platform you get a boost', {
      align: 'right',
      wordWrap: {
        width: 160
      }
    })
    const boost1 = this.add.text(335, 410, '→', {
      fontFamily: 'Roboto',
      fontSize: '28px',
    })
    boost1.setRotation(4.72)
    const boost2 = this.add.text(355, 410, '→', {
      fontFamily: 'Roboto',
      fontSize: '28px',
    })
    boost2.setRotation(4.72)
    const boost3 = this.add.text(375, 410, '→', {
      fontFamily: 'Roboto',
      fontSize: '28px',
    })
    boost3.setRotation(4.72)

    this.add.image(0, 220, 'Doodler')
    this.add.image(428, 220, 'Doodler')
    this.add.text(30, 190, 'You wrap on the edges', {
      align: 'left',
      wordWrap: {
        width: 110
      }
    })


    instructionsPlats.forEach((plat, index) => {
      plat.create(
        positions[index].a,
        positions[index].b
      )
    })
    positionPlatforms(
      {
        style: 'linear',
        height: 650,
        gap: 3
      },
      plats
    )


    button(
      this,
      5,
      50,
      'Back',
      'Roboto',
      () => {
        this.scene.pause()
        jump = false
        plyr = null
        instructionsPlats = []
        plats = []
        this.scene.stop()
        this.scene.start('menuScene')
      }
    )

    cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      jump = true
    });
    gyroscopePlayerMovement(plyr)
  },

  update() {
    chooseJumplablePlatforms(this, [...instructionsPlats, ...plats], plyr)
    jump = PlayerMovement(jump, plyr, cursors)
    warpPlayer(plyr)
  },

});

export default instructionsScene;