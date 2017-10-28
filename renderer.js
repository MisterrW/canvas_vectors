/**
* Maps a collection of 2d points to the HTML canvas.
* Completely implementation-dependent.
*/
var Renderer = function Renderer () {
  this.canvas = document.querySelector('#my3dCanvas')
  this.ctx = this.canvas.getContext('2d')
  this.ctx.strokeStyle = 'white'
}

Renderer.prototype = {
  scaleVector: function scaleVector (vector) {
    var result = []
    result[0] = 960 + (vector[0] * 300)
    result[1] = 600 - (vector[1] * 300)
    return result
  },

  write: function write (endVector, startVector, noScale) {
    startVector = startVector || [0, 0]
    var scaledStart
    var scaledEnd
    if (!noScale) {
      scaledStart = this.scaleVector(startVector)
      scaledEnd = this.scaleVector(endVector)
    } else {
      scaledStart = startVector
      scaledEnd = endVector
    }
    this.ctx.moveTo(scaledStart[0], scaledStart[1])
    this.ctx.lineTo(scaledEnd[0], scaledEnd[1])
  },

  preRender: function preRender () {
    this.ctx.beginPath()
    this.ctx.clearRect(0, 0, 1920, 1200)
  },

  getRandomColor: function getRandomColor () {
    var colors = ['white', 'green', 'grey', 'blue', 'red', 'yellow', 'orange', 'pink']
    var n = Math.floor(Math.random() * colors.length)
    return colors[n]
  },

  setWriteColor: function setWriteColor (color) {
    this.ctx.strokeStyle = color
  },

  resetColor: function resetColor () {
    this.ctx.strokeStyle = 'white'
  },

  writeFlattenedArray: function writeFlattenedArray (arr, noScale) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (arr[i] !== 'NORENDER' && arr[j] !== 'NORENDER' && i !== j) {
          this.write(arr[i], arr[j], noScale)
        }
      }
    }
  },

  render: function render () {
    this.ctx.closePath()
    this.ctx.stroke()
  }
}
