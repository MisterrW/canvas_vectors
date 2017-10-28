/**
* Mouse camera control
*/
var MouseMovement = function (camera) {
  this.camera = camera
  this.lastLocation = null
}

MouseMovement.prototype = {
  get: function move (location, mouseIsDown) {
    if (!mouseIsDown) {
      this.lastLocation = null
      return
    }
    if (!location || (location && this.lastLocation && this.lastLocation === location)) {
      return
    }
    if (!this.lastLocation) {
      this.lastLocation = location
      return
    }

    var diff = [
      location[0] - this.lastLocation[0],
      location[1] - this.lastLocation[1]
    ]

    return diff
  }
}
