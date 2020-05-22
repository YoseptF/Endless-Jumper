import Phaser from 'phaser'; // eslint-disable-line import/no-unresolved
import player from './player';
import background from './enviroment';
import basicPlatform from './platforms';
import {
  gyroscopePlayerMovement, setDOMUsername, getDOMUsername, setDOMAlert,
} from './DOMInteractions';
import button from './UI';
import { getTopScores, setNewScore } from './leaderboard';
import 'regenerator-runtime'; // eslint-disable-line import/no-unresolved


let bckg;
let plyr;
const maxSpeed = 15;
let scroll = 0;
let plats = [];
let jump = false;
let cursors;
let points;
let alive = true;
let alert = null;

const setMarkers = async (scene) => {
  try {
    const top = await getTopScores();

    top.forEach(val => {
      scene.add.text(0, -val.score / 0.03, `--- ${val.user} - ${val.score}`, {});
    });
  } catch (e) {
    setDOMAlert(e);
  }
};

const createPlatforms = (num, scene, container) => {
  for (let i = 0; i < num; i += 1) {
    container.push(basicPlatform(scene));
  }
};

const positionPlatforms = (platformOptions, container) => {
  switch (platformOptions.style) {
    case 'random':
      container.forEach(plat => {
        plat.create(
          Phaser.Math.Between(0, 421),
          Phaser.Math.Between(0, 750),
        );
      });
      break;

    case 'linear': {
      const { height } = platformOptions;
      const { gap } = platformOptions;
      let iter = 0;
      container.forEach(plat => {
        plat.create(
          (65 + gap) * iter,
          height,
        );
        iter += 1;
      });
      break;
    }

    case 'custom': {
      container.forEach(plat => {
        plat.create(
          platformOptions.x, platformOptions.y,
        );
      });
      break;
    }

    default: {
      break;
    }
  }

  container[0].setTint(0xff0000);
};

const setMaxSpeed = () => {
  if (plyr.velocity.x > maxSpeed) {
    plyr.setVelocityX(maxSpeed);
  }
  if (plyr.velocity.x < -maxSpeed) {
    plyr.setVelocityX(-maxSpeed);
  }
};

const updateHeight = (scene) => {
  const gameObjectCanvasY = plyr.y - scene.cameras.main.scrollY * plyr.scrollFactorY;

  if (gameObjectCanvasY < 350) {
    bckg.tilePositionY += 6;
    scroll -= 6;
    scene.cameras.main.setScroll(0, scroll);
  }
};

const chooseJumplablePlatforms = (scene, platstoChoose, playerToCheck) => {
  platstoChoose.forEach(plat => {
    if (playerToCheck.y + 22 < plat.y) {
      plat.collisionCategory = 'jumpable';
    } else if (playerToCheck.y > plat.y + 22) {
      plat.collisionCategory = 'notJumpable';
    }
    if (plat.y > scene.cameras.main.worldView.y + 750) {
      plat.addAgain(scene.cameras.main);
      plat.collisionCategory = 'notJumpable';
    }
  });
};

const warpPlayer = (ply) => {
  if (ply.x < 0) {
    ply.x = 421;
  }
  if (ply.x > 421) {
    ply.x = 0;
  }
};

const startGameOver = (scene) => {
  alive = false;
  scroll = 0;
  setDOMUsername();
  scene.add.text(165, 400 + scene.cameras.main.scrollY, `${points.text}`, {
    align: 'center',
  });
  const finalPoints = plyr.y > 0 ? 0 : Math.trunc(-plyr.y * 0.03);
  button(
    scene,
    150,
    250 + scene.cameras.main.scrollY,
    'Play Again',
    'Roboto',
    () => {
      const user = getDOMUsername();
      setNewScore(user, finalPoints);

      plats = [];
      plyr = null;
      alive = true;

      scene.scene.restart();
    },
  );
  button(
    scene,
    150,
    300 + scene.cameras.main.scrollY,
    'Main Menu',
    'Roboto',
    () => {
      const user = getDOMUsername();
      setNewScore(user, finalPoints);

      plats = [];
      plyr = null;
      alive = true;

      scene.scene.stop();
      scene.scene.start('menuScene');
    },
  );
  alert = scene.add.text(95, 360 + scene.cameras.main.scrollY,
    'Exit fullscreeen to change your username', {
      fontSize: '20px',
      stroke: '#fff',
      color: '#000',
      wordWrap: {
        width: 260,
      },

    });
};

const inspectWorldview = (scene) => {
  if (scene.cameras.main.worldView.width > 0) {
    chooseJumplablePlatforms(scene, plats, plyr);
    warpPlayer(plyr);

    if (plyr.y > scene.cameras.main.worldView.y + 770) {
      startGameOver(scene);
    }
  }
};

const PlayerMovement = (trigger, playerToMove, curs) => {
  if (trigger) {
    playerToMove.thrustLeft(1.5);
    trigger = false;
  }
  if (curs.right.isDown) {
    playerToMove.thrust(0.05);
  } else if (curs.left.isDown) {
    playerToMove.thrustBack(0.05);
  }
  return false;
};

const gameController = (scene) => {
  const preload = (platformsNum) => {
    bckg = background(scene);
    plyr = player(scene);
    createPlatforms(platformsNum, scene, plats);
  };

  const create = (platformOptions) => {
    setMarkers(scene);
    bckg.create(200, 50);
    plyr.create(210, 0);
    positionPlatforms(platformOptions, plats);
    gyroscopePlayerMovement(plyr);

    points = scene.add.text(0, scene.cameras.main.scrollY, '0 points', {
      align: 'center',
    });

    cursors = scene.input.keyboard.createCursorKeys();
    scene.matter.world.on('collisionstart', () => {
      jump = true;
    });
  };

  const update = () => {
    if (alive) {
      points.text = plyr.y > 0 ? '0 points' : `${Math.trunc(-plyr.y * 0.03)} points`;
      points.y = scene.cameras.main.scrollY;
      setMaxSpeed();
      updateHeight(scene);
      jump = PlayerMovement(jump, plyr, cursors);
      inspectWorldview(scene);
    }
    if (alert) {
      if (window.innerHeight === window.screen.height) {
        alert.setVisible(true);
      } else {
        alert.setVisible(false);
      }
    }
  };

  return {
    create,
    preload,
    update,
  };
};

export {
  gameController,
  chooseJumplablePlatforms,
  PlayerMovement,
  createPlatforms,
  positionPlatforms,
  warpPlayer,
};