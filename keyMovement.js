/**
* Keys movement
*/
var KeyMovement = function (camera) {
  this.camera = camera
}

KeyMovement.prototype = {
  move: function move (activeKeys) {
    //using keys for look for now as well
    var orientVect = [0, 0, 0]
    //look up / down
    if (activeKeys[76]) {
      orientVect[0] = 0.02
    } else if (activeKeys[79]) {
      orientVect[0] = -0.02
    }
    //bank left / right (yaw)
    if (activeKeys[186]) {
      orientVect[2] = 0.02
    } else if (activeKeys[75]) {
      orientVect[2] = -0.02
    }
    if (orientVect[0] !== 0 || orientVect[1] !== 0 || orientVect[2] !== 0) { this.camera.reorient(orientVect) }


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
      moveVect[1] = 5
    } else if (activeKeys[67]) {
      moveVect[1] = -5
    }
    if (moveVect[0] !== 0 || moveVect[1] !== 0 || moveVect[2] !== 0) { this.camera.move(moveVect) }
  }
}

leftarr: 37
rightarr: 39
uparr: 38
downarr: 40
