/* globals cameraLocation cameraOrientation */

/**
* Keys
*/

var activeKeys = {}
window.onkeyup = function (e) { activeKeys[e.keyCode] = false }
window.onkeydown = function (e) { activeKeys[e.keyCode] = true }

var keyLoop = function () {
  // keys control camera position

  // this kind of works, but it moves the camera location relative to the 'real' axes, not camera orientation - need another transformation

  // forward (w s)
  if (activeKeys[87]) {
    cameraLocation[2] -= 5
  } else if (activeKeys[83]) {
    cameraLocation[2] += 5
  }
  // sideways (a d)
  if (activeKeys[65]) {
    cameraLocation[0] -= 5
  } else if (activeKeys[68]) {
    cameraLocation[0] += 5
  }
  // up/down (x c)
  if (activeKeys[88]) {
    cameraLocation[1] += 5
  } else if (activeKeys[67]) {
    cameraLocation[1] -= 5
  }
  setTimeout(keyLoop, 20)
}
keyLoop()

/**
* Mouse camera control
*/

var mouseIsDown = false

function mouseDown () {
  mouseIsDown = true
}

function mouseUp () {
  mouseIsDown = false
  lastLocation = null
}

var lastLocation

function mouseMove (event) {
  if (mouseIsDown) {
    // mouse controls camera orientation
    var location = [event.clientX, event.clientY]
    if (!lastLocation) { lastLocation = location }

    var diff = [
      location[0] - lastLocation[0],
      location[1] - lastLocation[1]
    ]

    // remember - x [0] for cameraOrientation looks up/down, because it's a rotation about the x axis. y is left/right.

    if (!isNaN(diff[0])) {
      cameraOrientation[1] += (-diff[0] / 500)
    }
    if (!isNaN(diff[1])) {
      cameraOrientation[0] += (-diff[1] / 500)
    }
    lastLocation = location
  }
}
