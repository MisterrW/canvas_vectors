/* globals vectMatMul */
/**
* Provides rotation matrices for euclidean axes. Call with rotMatrixGen[axis](angle)
*/
var rotMatrixGen = {
  x: function getXRotMatrix (a) {
    var m = Math
    return [
      [1, 0, 0],
      [0, m.cos(a), -m.sin(a)],
      [0, m.sin(a), m.cos(a)]
    ]
  },

  y: function getYRotMatrix (a) {
    var m = Math
    return [
      [m.cos(a), 0, m.sin(a)],
      [0, 1, 0],
      [-m.sin(a), 0, m.cos(a)]
    ]
  },

  z: function getZRotMatrix (a) {
    var m = Math
    return [
      [m.cos(a), -m.sin(a), 0],
      [m.sin(a), m.cos(a), 0],
      [0, 0, 1]
    ]
  }
}

/**
* Rotates a vector around a given axis by a given angle.
*/
var rotateVector = function rotateVector (vector, axis, angle) {
  return vectMatMul(rotMatrixGen[axis](angle), vector)
}

/**
* Transforms an array of points by a rotation, ie rotates an object
*/
var rotateObject = function rotateObject (object, axis, angle) {
  var rotMatrix = rotMatrixGen[axis](angle)
  // console.log(object)
  // console.log(rotMatrix)
  var rotated = []
  for (var i = 0; i < object.length; i++) {
    // console.log(object[i])
    rotated.push(vectMatMul(rotMatrix, object[i]))
  }
  return rotated
}
