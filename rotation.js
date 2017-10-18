/* globals matMul vectMatMul */
/**
* Provides rotation matrices for euclidean axes. Call with rotMatrixGen[axis](angle)
*/
var rotMatrixGen = {
  x: function getXRotMatrix (a) {
    var cosA = Math.cos(a)
    var sinA = Math.sin(a)
    return [
      [1, 0, 0],
      [0, cosA, -sinA],
      [0, sinA, cosA]
    ]
  },

  y: function getYRotMatrix (a) {
    var cosA = Math.cos(a)
    var sinA = Math.sin(a)
    return [
      [cosA, 0, sinA],
      [0, 1, 0],
      [-sinA, 0, cosA]
    ]
  },

  z: function getZRotMatrix (a) {
    var cosA = Math.cos(a)
    var sinA = Math.sin(a)
    return [
      [cosA, -sinA, 0],
      [sinA, cosA, 0],
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

// var pointRotateCount2 = 0
var pointRotateCount = 0
/**
* Transforms an array of points by a rotation, ie rotates an object, in a single axis
*/
var rotateObject = function rotateObject (object, axis, angle) {
  var rotMatrix = rotMatrixGen[axis](angle)
  // console.log(object)
  // console.log(rotMatrix)
  var rotated = []
  for (var i = 0; i < object.length; i++) {
    // console.log(object[i])
    // pointRotateCount2 += 1
    // if (pointRotateCount2 % 1000 === 0) {
    //   console.log(pointRotateCount2)
    // }
    rotated.push(vectMatMul(rotMatrix, object[i]))
  }
  return rotated
}

/**
* If we're rotating all 3 axes, multiply the three rotation axes to save repeating for each axis
*/
var rotateObjectAllAxes = function rotateObjectAllAxes (object, xAng, yAng, zAng) {
  var xRotMat = rotMatrixGen['x'](xAng)
  var yRotMat = rotMatrixGen['y'](yAng)
  var zRotMat = rotMatrixGen['z'](zAng)

  var rotMatrix = matMul(zRotMat, matMul(yRotMat, xRotMat))

  var rotated = []
  for (var i = 0; i < object.length; i++) {
    pointRotateCount += 1
    if (pointRotateCount % 1000 === 0) {
      console.log(pointRotateCount)
    }
    rotated.push(vectMatMul(rotMatrix, object[i]))
  }
  return rotated
}
