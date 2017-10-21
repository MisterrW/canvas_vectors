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
    var moveVect = [0, 0, 0]
    // forward (w s)
    if (activeKeys[87]) {
      moveVect[2] = -5
    } else if (activeKeys[83]) {
      moveVect[2] = 5
    }
    // sideways (a d)
    if (activeKeys[65]) {
      moveVect[0] = -5
    } else if (activeKeys[68]) {
      moveVect[0] = 5
    }
    // up/down (x c)
    if (activeKeys[88]) {
      moveVect[1] = -5
    } else if (activeKeys[67]) {
      moveVect[1] = 5
    }
    if (moveVect[0] !== 0 || moveVect[1] !== 0 || moveVect[2] !== 0) { this.camera.move(moveVect) }
  }
}
