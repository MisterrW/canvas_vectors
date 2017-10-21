/**
* Maps a collection of 2d points to the HTML canvas.
* Completely implementation-dependent.
*/
var Renderer = function Renderer () {
  this.canvas = document.querySelector('#my3dCanvas')
  this.ctx = this.canvas.getContext('2d')
  this.strokeStyle = 'black'
}

Renderer.prototype = {
  scaleVector: function scaleVector (vector) {
    var result = []
    result[0] = 300 + (vector[0] * 300)
    result[1] = 300 - (vector[1] * 300)
    return result
  },

  write: function write (endVector, startVector) {
    startVector = startVector || [0, 0]
    var scaledStart = this.scaleVector(startVector)
    var scaledEnd = this.scaleVector(endVector)
    this.ctx.moveTo(scaledStart[0], scaledStart[1])
    this.ctx.lineTo(scaledEnd[0], scaledEnd[1])
  },

  preRender: function preRender () {
    this.ctx.beginPath()
    this.ctx.clearRect(0, 0, 600, 600)
  },

  writeFlattenedArray: function writeFlattenedArray (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (arr[i] !== 'NORENDER' && arr[j] !== 'NORENDER') {
          this.write(arr[i], arr[j])
        }
      }
    }
  },

  render: function render () {
    this.ctx.closePath()
    this.ctx.stroke()
  }
}
