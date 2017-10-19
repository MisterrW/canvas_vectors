var c2 = document.querySelector('#my3dCanvas')
var ctx2 = c2.getContext('2d')

function scaleVector2 (vector) {
  var result = []
  result[0] = 300 + (vector[0] * 300)
  result[1] = 300 - (vector[1] * 300)
  return result
}

ctx2.strokeStyle = 'black'

function write (endVector, startVector) {
  startVector = startVector || [0, 0]
  var scaledStart = scaleVector2(startVector)
  var scaledEnd = scaleVector2(endVector)
  ctx2.moveTo(scaledStart[0], scaledStart[1])
  ctx2.lineTo(scaledEnd[0], scaledEnd[1])
}

function preRender () {
  ctx2.beginPath()
  ctx2.clearRect(0, 0, 600, 600)
}

function writeFlattenedArray (arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[i] !== 'NORENDER' && arr[j] !== 'NORENDER') {
        write(arr[i], arr[j])
      }
    }
  }
}

function render () {
  ctx2.closePath()
  ctx2.stroke()
}
