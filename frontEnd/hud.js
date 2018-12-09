/* globals document */

var Hud = function () {
  this.axes = ['x', 'y', 'z']
}

Hud.prototype = {
  updateOrientation: function updateOrientation (x, y, z) {
    var toUpdate = {
      'x': Math.round(x),
      'y': Math.round(y),
      'z': Math.round(z)
    }
    for (var i = 0; i < this.axes.length; i++) {
      var textBox = document.getElementById('cam-or-' + this.axes[i])
      textBox.innerHTML = toUpdate[this.axes[i]]
    }
  },

  updateLocation: function updateLocation (x, y, z) {
    var toUpdate = {
      'x': Math.round(x),
      'y': Math.round(y),
      'z': Math.round(z)
    }
    for (var i = 0; i < this.axes.length; i++) {
      var textBox = document.getElementById('cam-loc-' + this.axes[i])
      textBox.innerHTML = toUpdate[this.axes[i]]
    }
  }
}
