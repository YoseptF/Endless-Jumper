const button = (scene, x, y, text, font = 'Arial', onClick) => {

  const canvasButton = scene.add.text(x, y, text, {
    color: '#000',
    fontFamily: font,
    fontStyle: 'bold',
    fontSize: '18px',
    backgroundColor: '#ffffff75',
    fixedWidth: 110,
    fixedHeight: 40,
    align: 'center',
    baselineY: 2.275
  });

  canvasButton.setInteractive({ useHandCursor: true });

  if (typeof onclick !== 'undefined') {
    canvasButton.on('pointerdown', () => {
      onClick()
    }, this);
  }

  canvasButton.on('pointerover', () => {
    canvasButton.setBackgroundColor('#ffffffa6')
  }, this);


  canvasButton.on('pointerout', () => {
    canvasButton.setBackgroundColor('#ffffff75')
  }, this);

  return canvasButton
}

export { button }