/* globals vectSubtract rotateObjectAllAxes */

// somewhere to look from
var cameraLocation =
  // [x, y, z]
    [0.0, 0.0, 100.0]

// Tait-Bryan rotation (degrees of rotation around x, y, z)
var cameraOrientation = [19.5, -0.9, 0]

// rework this once camera orientation used
// var myLocation = cameraLocation
// myLocation[2] += 5

function cameraOrientPointsArray (pointsArray) {
  var pointsToRotate = []
  for (var i = 0; i < pointsArray.length; i++) {
    pointsToRotate[i] = vectSubtract(pointsArray[i], cameraLocation)
  }
  return rotateObjectAllAxes(pointsToRotate, cameraOrientation[0], cameraOrientation[1], cameraOrientation[2])
}
