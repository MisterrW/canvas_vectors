/**
* Keys movement
*/
var KeyMovement = function (camera) {
  this.camera = camera
}

KeyMovement.prototype = {
  move: function move (activeKeys) {
    // keys control camera position

    // this kind of works, but it moves the camera location relative to the 'real' axes, not camera orientation - need another transformation

    // forward (w s)
    if (activeKeys[87]) {
      this.camera.location[2] -= 5
    } else if (activeKeys[83]) {
      this.camera.location[2] += 5
    }
    // sideways (a d)
    if (activeKeys[65]) {
      this.camera.location[0] -= 5
    } else if (activeKeys[68]) {
      this.camera.location[0] += 5
    }
    // up/down (x c)
    if (activeKeys[88]) {
      this.camera.location[1] += 5
    } else if (activeKeys[67]) {
      this.camera.location[1] -= 5
    }
  }
}
