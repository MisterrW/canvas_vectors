/**
* Provides rotation matrices for euclidean axes. Call with rotMatrixGen[axis](angle)
*/
var Rotation = function Rotation (matrixOps) {
  this.matrixOps = matrixOps
  this.rotMatrixGen = {
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

  // this.pointRotateCount2 = 0
  this.pointRotateCount = 0
}

/**
* Rotates a vector around a given axis by a given angle.
*/
Rotation.prototype = {
  rotateVector: function rotateVector (vector, axis, angle) {
    return this.matrixOps.vectMatMul(this.rotMatrixGen[axis](angle), vector)
  },

  /**
  * Transforms an array of points by a rotation, ie rotates an object, in a single axis
  */
  rotateObject: function rotateObject (object, axis, angle) {
    var rotMatrix = this.rotMatrixGen[axis](angle)
    // console.log(object)
    // console.log(rotMatrix)
    var rotated = []
    for (var i = 0; i < object.length; i++) {
    // console.log(object[i])
    // this.pointRotateCount2 += 1
    // if (this.pointRotateCount2 % 1000 === 0) {
    //   console.log(this.pointRotateCount2)
    // }
      rotated.push(this.matrixOps.vectMatMul(rotMatrix, object[i]))
    }
    return rotated
  },

  /**
  * If we're rotating all 3 axes, multiply the three rotation axes to save repeating for each axis
  */
  rotateObjectAllAxes: function rotateObjectAllAxes (object, xAng, yAng, zAng) {
    var xRotMat = this.rotMatrixGen['x'](xAng)
    var yRotMat = this.rotMatrixGen['y'](yAng)
    var zRotMat = this.rotMatrixGen['z'](zAng)

    var rotMatrix = this.matrixOps.matMul(zRotMat, this.matrixOps.matMul(yRotMat, xRotMat))

    var rotated = []
    for (var i = 0; i < object.length; i++) {
      this.pointRotateCount += 1
      if (this.pointRotateCount % 1000 === 0) {
        console.log(this.pointRotateCount)
      }
      rotated.push(this.matrixOps.vectMatMul(rotMatrix, object[i]))
    }
    return rotated
  }
}
