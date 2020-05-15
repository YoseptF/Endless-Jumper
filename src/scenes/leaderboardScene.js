import Phaser from 'phaser';
import { button } from '../packages/UI';
import { getTopScores } from '../packages/leaderboard';
import 'regenerator-runtime'
import { setDOMleaderboard, deleteDOMLeaderboard } from '../packages/DOMInteractions'

const setLeaderboard = async () => {
  const topScores = await getTopScores()
  setDOMleaderboard(topScores)
}

const leaderboardScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function leaderboardScene() {
      Phaser.Scene.call(this, { key: 'leaderboardScene' });
    },

  preload() {
  },

  create() {
    setLeaderboard()
    button(
      this,
      5,
      50,
      'Back',
      'Roboto',
      () => {
        deleteDOMLeaderboard()
        this.scene.stop()
        this.scene.start('menuScene')
      }
    )


  },

  update() {
  },

});

export default leaderboardScene;