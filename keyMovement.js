/* globals */

/**
* Keys movement
*/
var KeyMovement = function (camera, matrixOps, rotation, mouseMovement) {
  this.camera = camera
  this.matrixOps = matrixOps
  this.rotation = rotation
  this.mouseMovement = mouseMovement
  this.residualOX = 0
  this.residualOZ = 0

  this.residualMX = 0
  this.residualMY = 0
  this.residualMZ = 0
}

KeyMovement.prototype = {
  move: function move (activeKeys) {
    // using keys for look for now as well
    var orientX = 0
    var orientY = 0
    var orientZ = 0
    // look up / down
    if (activeKeys[76]) {
      orientX = -0.015
    } else if (activeKeys[79]) {
      orientX = +0.015
    } else {
      orientX = this.residualOX
    }
    this.residualOX = orientX * 0.9
    // bank left / right (yaw)
    if (activeKeys[186]) {
      orientZ = -0.015
    } else if (activeKeys[75]) {
      orientZ = +0.015
    } else {
      orientZ = this.residualOZ
    }
    this.residualOZ = orientZ * 0.9
    var mouseChange = this.mouseMovement.get()
    if (mouseChange) {
      console.log(mouseChange)
      orientX += mouseChange[1] / 500
      orientZ += mouseChange[0] / 500
    }

    var orientMatrix = this.rotation.getXYZRotMat(orientX, orientY, orientZ)

    // keys control camera position
    var moveMatrix = this.matrixOps.getIdentity4()
    // forward (w s)
    if (activeKeys[87]) {
      moveMatrix[2][3] = -10
    } else if (activeKeys[83]) {
      moveMatrix[2][3] = 10
    } else {
      moveMatrix[2][3] = this.residualMZ
    }
    this.residualMZ = moveMatrix[2][3] * 0.995

    // sideways (a d)
    if (activeKeys[65]) {
      moveMatrix[0][3] = -5
    } else if (activeKeys[68]) {
      moveMatrix[0][3] = 5
    } else {
      moveMatrix[0][3] = this.residualMX
    }
    this.residualMX = moveMatrix[0][3] * 0.995

    // up/down (x c)
    if (activeKeys[88]) {
      moveMatrix[1][3] = 5
    } else if (activeKeys[67]) {
      moveMatrix[1][3] = -5
    } else {
      moveMatrix[1][3] = this.residualMY
    }
    this.residualMY = moveMatrix[1][3] * 0.995

    var positionMatrix = this.matrixOps.matMul(moveMatrix, orientMatrix)
    this.camera.move(positionMatrix)
  }
}
