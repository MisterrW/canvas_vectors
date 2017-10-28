/**
* Mouse camera control
*/
var MouseMovement = function (camera) {
  this.camera = camera
  this.location = null
  this.lastLocation = null
  this.mouseDown = false
}

MouseMovement.prototype = {
  get: function move () {
    if (!this.mouseDown) {
      this.lastLocation = null
      return
    }
    if (!this.location || (this.location && this.lastLocation && this.lastLocation === this.location)) {
      return
    }
    if (!this.lastLocation) {
      this.lastLocation = this.location
      return
    }

    var diff = [
      this.location[0] - this.lastLocation[0],
      this.location[1] - this.lastLocation[1]
    ]

    this.lastLocation = this.location

    return diff
  }
}
