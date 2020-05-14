import Phaser from 'phaser';
import './sass/style.scss';
import { gameScene, menuScene, instructionsScene } from './scenes/sceneLoader';

window.onload = () => {
    let canvas = document.querySelector('canvas')
    let canvasWidth = canvas.clientWidth
    document.getElementById('fullscreen').style.paddingLeft = `${canvasWidth - 40}px`
    document.querySelector('#fullscreen i').addEventListener('click', event => canvas.requestFullscreen())
}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-canvas',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 421,
        height: 750
    },
    backgroundColor: '#46a6ce',
    scene: [instructionsScene, menuScene, gameScene],
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 1.2,
            },
            plugins: {
                attractors: true,
            },
            debug: true,
        },
    },
};

const game = new Phaser.Game(config);
