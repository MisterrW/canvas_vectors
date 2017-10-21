var Camera = function (matrixOps, rotation) {
  this.matrixOps = matrixOps
  this.rotation = rotation
  this.location =
    // [x, y, z]
      [0.0, 0.0, 100.0]

  // Tait-Bryan rotation (degrees of rotation around x, y, z)
  this.orientation = [19.5, -0.9, 0]
}

Camera.prototype = {
  orientPointsArray: function orientPointsArray (pointsArray) {
    var pointsToRotate = []
    for (var i = 0; i < pointsArray.length; i++) {
      pointsToRotate[i] = this.matrixOps.vectSubtract(pointsArray[i], this.location)
    }
    return this.rotation.rotateObjectAllAxes(pointsToRotate, this.orientation[0], this.orientation[1], this.orientation[2])
  }
}
