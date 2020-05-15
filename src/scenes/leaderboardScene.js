import Phaser from 'phaser'; // eslint-disable-line import/no-unresolved
import button from '../packages/UI';
import { getTopScores } from '../packages/leaderboard';
import 'regenerator-runtime'; // eslint-disable-line import/no-unresolved
import { setDOMleaderboard, deleteDOMLeaderboard, setDOMLoading } from '../packages/DOMInteractions';

const setLeaderboard = async () => {
  const topScores = await getTopScores();
  setDOMleaderboard(topScores);
};

let alert;

const leaderboardScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function leaderboardScene() {
      Phaser.Scene.call(this, { key: 'leaderboardScene' });
    },

  preload() {
  },

  create() {
    setDOMLoading('.usernameInput');
    setLeaderboard();
    button(
      this,
      5,
      50,
      'Back',
      'Roboto',
      () => {
        deleteDOMLeaderboard();
        this.scene.stop();
        this.scene.start('menuScene');
      },
    );

    alert = this.add.text(200, 300, 'Do to a browser limitation, you need to exit fullsreen to see the leaderboards', {
      fontSize: '20px',
      stroke: '#fff',
      color: '#000',
      wordWrap: {
        width: 140,
      },
    });
  },

  update() {
    if (window.innerHeight === window.screen.height) {
      alert.setVisible(true);
    } else {
      alert.setVisible(false);
    }
  },

});

export default leaderboardScene;