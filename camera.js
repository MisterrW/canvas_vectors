var Camera = function (matrixOps, rotation) {
  this.matrixOps = matrixOps
  this.rotation = rotation
  this.location =
    // [x, y, z]
      [0.0, 20.0, 1000.0]

  // Tait-Bryan rotation (degrees of rotation around x, y, z)
  this.orientation = [0, 0, 0]
}

Camera.prototype = {
  /**
  * Before projecting scene, we need to account for the camera's orientation.
  * This method translates a collection of points mapped to 'world space' to a collection of (still 3D) points
  * in a coordinate system with the camera at [0, 0, 0] and not rotated.
  */
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
    // this.matrixOps.invert([
    //   [4, 5, 2],
    //   [4, 7, 6],
    //   [8, 2, 4]
    // ])
    this.matrixOps.invert([
      [2, 1, -1],
      [-3, -1, 2],
      [-2, 1, 2]
    ])

    // this.matrixOps.invert([
    //   [1.333, 5.63, 32.6],
    //   [4.45, 7.25, 6.11],
    //   [8.435, 2.523, 4.2]
    // ])
    console.log('orientation 1: ' + this.orientation)
    // var transformedVector = this.rotation.rotateVectorAllAxes(vector, this.orientation[0], this.orientation[1], 0)
    var transformedVector = this.rotation.rotateVectorAllAxes(vector, -this.orientation[0], -this.orientation[1], -this.orientation[2])
    // console.log('vector: ' + vector + ', transformed vector: ' + transformedVector)
    this.location = this.matrixOps.vectAdd(this.location, transformedVector)
    // console.log('orientation 2: ' + this.orientation)
  }
}
