var Camera = function (matrixOps, rotation) {
  this.matrixOps = matrixOps
  this.rotation = rotation
  this.location =
    // [x, y, z]
      [20.0, 20.0, 1000.0]

  // Tait-Bryan rotation (degrees of rotation around x, y, z)
  this.orientation = [0, 0, 0]
}

Camera.prototype = {
  orientPointsArray: function orientPointsArray (pointsArray) {
    var pointsToRotate = []
    for (var i = 0; i < pointsArray.length; i++) {
      pointsToRotate[i] = this.matrixOps.vectSubtract(pointsArray[i], this.location)
    }
    return this.rotation.rotateObjectAllAxes(pointsToRotate, this.orientation[0], this.orientation[1], this.orientation[2])
  },

  /**
  * Moves the camera, transforming the given vector (representing movement in a coordinate system with the camera not rotated)
  * into a vector in the actual coordinate system, and adding that to the current location.
  */
  move: function move (vector) {
    // if camera was at 0,0,0 , moving forward 2 would take us to 0,0,2.
    // but we're probably not at 0,0,0
    // but we can get the result of that as it applies to our current location by rotating our 0,0,2 by the negative of the camera's orientation
    var transformedVector = this.rotation.rotateVectorAllAxes(vector, -this.orientation[0], -this.orientation[1], -this.orientation[2])
    // console.log("vector: " + vector + ", transformed vector: " + transformedVector)
    this.location = this.matrixOps.vectAdd(this.location, transformedVector)
  }
}
