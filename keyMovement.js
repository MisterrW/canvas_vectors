/* globals */

/**
* Keys movement
*/
var KeyMovement = function (camera, matrixOps, rotation) {
  this.camera = camera
  this.matrixOps = matrixOps
  this.rotation = rotation
}

KeyMovement.prototype = {
  move: function move (activeKeys) {
    // using keys for look for now as well
    var orientX = 0
    var orientY = 0
    var orientZ = 0
    // look up / down
    if (activeKeys[76]) {
      orientX = -0.01
    } else if (activeKeys[79]) {
      orientX = +0.01
    }
    // bank left / right (yaw)
    if (activeKeys[186]) {
      orientZ = -0.03
    } else if (activeKeys[75]) {
      orientZ = +0.03
    }

    // var mouseChange = 

    var orientMatrix = this.rotation.getXYZRotMat(orientX, orientY, orientZ)

    // keys control camera position
    var moveMatrix = this.matrixOps.getIdentity4()
    // forward (w s)
    if (activeKeys[87]) {
      moveMatrix[2][3] = -10
    } else if (activeKeys[83]) {
      moveMatrix[2][3] = 10
    }
    // sideways (a d)
    if (activeKeys[65]) {
      moveMatrix[0][3] = -5
    } else if (activeKeys[68]) {
      moveMatrix[0][3] = 5
    }
    // up/down (x c)
    if (activeKeys[88]) {
      moveMatrix[1][3] = 5
    } else if (activeKeys[67]) {
      moveMatrix[1][3] = -5
    }

    var positionMatrix = this.matrixOps.matMul(moveMatrix, orientMatrix)
    this.camera.move(positionMatrix)
  }
}
