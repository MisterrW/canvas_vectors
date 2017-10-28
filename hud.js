/* globals document */

var Hud = function () {
  this.axes = ['x', 'y', 'z']
}

Hud.prototype = {
  updateOrientation: function updateOrientation (x, y, z) {
    var toUpdate = {
      'x': x,
      'y': y,
      'z': z
    }
    for (var i = 0; i < this.axes.length; i++) {
      var textBox = document.getElementById('cam-or-' + this.axes[i])
      textBox.innerHTML = toUpdate[this.axes[i]]
      console.log(toUpdate[this.axes[i]])
    }
  },

  updateLocation: function updateLocation (x, y, z) {
    var toUpdate = {
      'x': x,
      'y': y,
      'z': z
    }
    for (var i = 0; i < this.axes.length; i++) {
      var textBox = document.getElementById('cam-loc-' + this.axes[i])
      textBox.innerHTML = toUpdate[this.axes[i]]
      console.log(toUpdate[this.axes[i]])      
    }
  }
}
