/**
* Mouse camera control
*/
var MouseMovement = function (camera) {
  this.camera = camera
  this.lastLocation = null
}

MouseMovement.prototype = {
  move: function move (location, mouseIsDown) {
    if (!mouseIsDown) {
      this.lastLocation = null
      return
    }
    if (!location) { return }
    if (!this.lastLocation) { this.lastLocation = location }

    var diff = [
      location[0] - this.lastLocation[0],
      location[1] - this.lastLocation[1]
    ]

    // remember - x [0] for Camera.orientation looks up/down, because it's a rotation about the x axis. y is left/right.

    if (!isNaN(diff[0])) {
      this.camera.orientation[1] += (-diff[0] / 500)
    }
    if (!isNaN(diff[1])) {
      this.camera.orientation[0] += (-diff[1] / 500)
    }
    this.lastLocation = location
  }
}
