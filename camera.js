/* globals Vector */

var Camera = function (matrixOps, rotation, hud) {
  this.matrixOps = matrixOps
  this.rotation = rotation
  this.hud = hud
  this.location =
    // [x, y, z]
       // new Vector(1500.0, 50.0, 1500.0, 1)
       new Vector(-2463.107221173956, 186.55711295710861, 630.8560004004507)
  // [0, 3000, 0]

  // Tait-Bryan rotation (degrees of rotation around x, y, z)
  // this.orientation = [-0.2, -0.8, 0.3]
  this.orientation = [1.3060779592860872, -1.2391200191426373, -4.413514410876803]

  this.hud.updateOrientation(this.orientation[0], this.orientation[1], this.orientation[2])
  this.hud.updateLocation(this.location.x, this.location.y, this.location.z)
  
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
    var rotatedPoints = this.rotation.rotateObjectAllAxes(pointsToRotate, this.orientation[0], this.orientation[1], this.orientation[2])
    // var returnPoints = []
    // for (var i = 0; i < rotatedPoints.length; i++) {
    //   returnPoints[i] = this.matrixOps.vectAdd(pointsArray[i], this.location)
    // }
    // return returnPoints
    return rotatedPoints
  },

  /**
   * Reorients the camera, given a vector representing the change in its positon
   * (according to a coordinate system defined by the camera itself)
   */
  reorient: function reorient (vector) {
    // do roll, we know this works
    this.orientation[2] += vector['z']

    // then rotate remaining vector by new orientation
    vector['z'] = 0
    var adjustedVector = this.rotation.rotateVectorAllAxes(vector, this.orientation[0], this.orientation[1], this.orientation[2])
    this.orientation[0] += adjustedVector['x']
    this.orientation[1] += adjustedVector['y']
    this.orientation[2] += adjustedVector['z']
    this.hud.updateOrientation(this.orientation[0], this.orientation[1], this.orientation[2])

    //
    // var pointsToRotate = []
    // var i
    // for (i = 0; i < pointsArray.length; i++) {
    //   pointsToRotate[i] = this.matrixOps.vectSubtract(pointsArray[i], displacementVector)
    // }
    // var rotatedArray = this.rotateObjectAllAxes(pointsToRotate, xAng, yAng, zAng)
    // var returnArray = []
    // for (i = 0; i < pointsArray.length; i++) {
    //   returnArray[i] = this.matrixOps.vectAdd(rotatedArray[i], displacementVector)
    // }
    // return returnArray
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
    // this.matrixOps.invert([
    //   [2, 1, -1],
    //   [-3, -1, 2],
    //   [-2, 1, 2]
    // ])

    // this.matrixOps.invert([
    //   [1.333, 5.63, 32.6],
    //   [4.45, 7.25, 6.11],
    //   [8.435, 2.523, 4.2]
    // ])
    // console.log('orientation 1: ' + this.orientation)
    // var transformedVector = this.rotation.rotateVectorAllAxes(vector, this.orientation[0], this.orientation[1], 0)
    // var transformedVector = this.rotation.rotateVectorAllAxes(vector, -this.orientation[0], -this.orientation[1], -this.orientation[2])
    var transformedVector = this.rotation.rotateVectorAllAxes(vector, this.orientation[0], this.orientation[1], this.orientation[2])
    // console.log('vector: ' + vector + ', transformed vector: ' + transformedVector)
    this.location = this.matrixOps.vectAdd(this.location, transformedVector)
    // console.log('orientation 2: ' + this.orientation)
    this.hud.updateLocation(this.location.x, this.location.y, this.location.z)
  }
}
