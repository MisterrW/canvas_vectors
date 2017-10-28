/**
* Projects an array of 3d vectors onto a plane, returning an array of 2d vectors.
*/
var Projector = function Projector () {
}

Projector.prototype = {
// Bx = Ax(Bz/Az)
// where
// Bx = desired screen coord
// Ax = point x location
// Bz = distance of screen from viewer (in the z axis)
// Az = distance of point A from viewer (in the z axis)

  mapPointsArrToPlane: function mapPointsArrToPlane (arr) {
  // 'my location ' after the transform to a coord system with the camera at 0 and not rotated
    var ml = [0, 0, 2]
    var mapped = []
    for (var i = 0; i < arr.length; i++) {
      var point = arr[i]
      if (point.z < 0) {
      // console.log("My distance from object: " + Az)
        var Az = ml[2] - point.z
        // console.log("My distance from camera: " + Bz)
        // var Bz = ml[2] - camLocation[2]
        var Bz = ml[2]

        // x
        var Ax = point.x
        var Bx = Ax * (Bz / Az)

        // y
        var Ay = point.y
        var By = Ay * (Bz / Az)

        mapped[i] = [Bx, By]
      } else {
        mapped[i] = 'NORENDER'
      }
    }
    return mapped
  }
}
