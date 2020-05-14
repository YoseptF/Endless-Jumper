const gyroscopePlayerMovement = (plyr) => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', event => {
      if (event.gamma < -3) {
        plyr.setVelocityX(event.gamma * 0.4)
      }
      if (event.gamma > 3) {
        plyr.setVelocityX(event.gamma * 0.4)
      }
    }, true)
  }
}

export { gyroscopePlayerMovement }