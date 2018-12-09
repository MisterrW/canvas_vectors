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
    result[0] = 650 + (vector[0] * 300)
    result[1] = 325 - (vector[1] * 300)
    return result
  },

  getScaledArray: function getScaledArray(arr) {
    for(let i = 0; i < arr.length; i++) { 
      arr[i] = this.scaleVector(arr[i])
    }
    return arr
  },

  write: function write (endVector, startVector, noScale) {
    startVector = startVector || [0, 0]
    this.ctx.moveTo(startVector[0], startVector[1])
    this.ctx.lineTo(endVector[0], endVector[1])
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

  // todo this is insanely inefficient because it joins every point to every other point
  writeFlattenedArray: function writeFlattenedArray (arr, noScale) {
    if (!noScale) {
      arr = this.getScaledArray(arr)
    }

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (i !== j) {
          this.write(arr[i], arr[j])
        }
      }
    }
  },

  writeFlattenedArrayLite: function writeFlattenedArrayLite (arr, noScale) {
    arr = this.getScaledArray(arr)
    
    for (var i = 0; i < arr.length-1; i++) {
      this.write(arr[i], arr[i+1], noScale)
    }
    if(arr.length > 2){
        this.write(arr[arr.length-1], arr[0], noScale)
    }
  },

  render: function render () {
    this.ctx.closePath()
    this.ctx.stroke()
  }
}
