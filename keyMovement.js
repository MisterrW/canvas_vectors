/* globals Vector */

/**
* Keys movement
*/
var KeyMovement = function (camera) {
  this.camera = camera
}

KeyMovement.prototype = {
  move: function move (activeKeys) {
    // using keys for look for now as well
    var orientVect = [0, 0, 0]
    // look up / down
    if (activeKeys[76]) {
      orientVect[0] = 0.01
    } else if (activeKeys[79]) {
      orientVect[0] = -0.01
    }
    // bank left / right (yaw)
    if (activeKeys[186]) {
      orientVect[2] = 0.03
    } else if (activeKeys[75]) {
      orientVect[2] = -0.03
    }
    if (orientVect[0] !== 0 || orientVect[1] !== 0 || orientVect[2] !== 0) { this.camera.reorient(new Vector(orientVect[0], orientVect[1], orientVect[2])) }

    // keys control camera position
    // this kind of works, but it moves the camera location relative to the 'real' axes, not camera orientation - need another transformation
    var moveVectArr = [0, 0, 0]
    // forward (w s)
    if (activeKeys[87]) {
      moveVectArr[2] = -10
    } else if (activeKeys[83]) {
      moveVectArr[2] = 10
    }
    // sideways (a d)
    if (activeKeys[65]) {
      moveVectArr[0] = -5
    } else if (activeKeys[68]) {
      moveVectArr[0] = 5
    }
    // up/down (x c)
    if (activeKeys[88]) {
      moveVectArr[1] = 5
    } else if (activeKeys[67]) {
      moveVectArr[1] = -5
    }
    if (moveVectArr[0] !== 0 || moveVectArr[1] !== 0 || moveVectArr[2] !== 0) { this.camera.move(new Vector(moveVectArr[0], moveVectArr[1], moveVectArr[2])) }
  }
}
