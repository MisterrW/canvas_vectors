/**
* Projects an array of 3d vectors onto a plane, returning an array of 2d vectors.
* Basically I just read this: https://en.wikipedia.org/wiki/3D_projection
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
    
    // ml === 'my location', after the transform to a coord system with the camera at 0 and not rotated
    var ml = [0, 0, 2]
    var mapped = []
    for (var i = 0; i < arr.length; i++) {
      var point = arr[i]
      if (point.z < 0) { // if it's behind us, we don't want to draw it! (todo: frustrum clipping)
        // Az: distance of the point to be mapped from the viewer
        var Az = ml[2] - point.z
        // Bz: distance of the screen from the viewer (since the camera is a 0, it's just the z coordinate of ml)
        var Bz = ml[2]

        // x
        var Ax = point.x
        var Bx = Ax * (Bz / Az)

        // y
        var Ay = point.y
        var By = Ay * (Bz / Az)

        mapped.push([Bx, By])
      }
    }
    return mapped
  }
}
