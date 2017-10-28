/* globals */

var Camera = function (matrixOps, rotation, hud) {
  this.matrixOps = matrixOps
  this.rotation = rotation
  this.hud = hud

  // the transformation which defines the camera's location in world space
  this.cameraTransform = this.matrixOps.getIdentity4()
  this.cameraTransform[2][3] = 1000
  this.cameraTransform[1][3] = 500
  this.cameraTransform[0][3] = 500
  // the transformation which gets you from world space to view space (inverse of the above)
  this.viewSpaceTransform = this.matrixOps.invert(this.cameraTransform)

  // this.hud.updateOrientation(this.orientation[0], this.orientation[1], this.orientation[2])
  this.hud.updateLocation(this.matrixOps.matMul(this.cameraTransform, new Vector(0, 0, 0)))
}

Camera.prototype = {
  /**
  * Before projecting scene, we need to account for the camera's orientation.
  * This method translates a collection of points mapped to 'world space' to a collection of (still 3D) points
  * in a coordinate system with the camera at [0, 0, 0] and not rotated.
  */
  orientPointsArray: function orientPointsArray (pointsArray) {
    var transformedPoints = []
    for (var i = 0; i < pointsArray.length; i++) {
      transformedPoints.push(this.matrixOps.vectMatMul(this.viewSpaceTransform, pointsArray[i]))
    }
    return transformedPoints
  },

  /**
   * Reorients and repositions the camera by multiplying the current transform matrix by the new movement one, built from the key commands
   */
  move: function move (moveMatrix) {
    this.cameraTransform = this.matrixOps.matMul(this.cameraTransform, moveMatrix)
    this.viewSpaceTransform = this.matrixOps.invert(this.cameraTransform)
    // console.log(this.cameraTransform)
    // console.log(this.viewSpaceTransform)
    // this.hud.updateLocation(this.cameraTransform )
    var pos = this.matrixOps.vectMatMul(this.cameraTransform, new Vector(0, 0, 0))
    this.hud.updateLocation(pos.x, pos.y, pos.z)
  }
}
