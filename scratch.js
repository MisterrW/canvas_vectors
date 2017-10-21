/*

function writeFlatCube (flatCube) {
  // console.log(flatCube)

  var pairs = [
    [flatCube.ntl, flatCube.ntr],
    [flatCube.nbl, flatCube.nbr],
    [flatCube.ntl, flatCube.nbl],
    [flatCube.ntr, flatCube.nbr],

    [flatCube.ftl, flatCube.ftr],
    [flatCube.fbl, flatCube.fbr],
    [flatCube.ftl, flatCube.fbl],
    [flatCube.ftr, flatCube.fbr],

    [flatCube.ntl, flatCube.ftl],
    [flatCube.ntr, flatCube.ftr],
    [flatCube.nbl, flatCube.fbl],
    [flatCube.nbr, flatCube.fbr]
  ]

  for (var i = 0; i < pairs.length; i++) {
    if (pairs[i][0] && pairs[i][1]) {
      write(pairs[i][0], pairs[i][1])
    }
  }
}

function mapPointsToPlane (pointsObject) {
  var objKeys = Object.keys(pointsObject)
  var mappedObj = {}
  var ml = myLocation
  for (var i = 0; i < objKeys.length; i++) {
    var point = pointsObject[objKeys[i]]
    if (point[2] < myLocation[2]) {
    // x
      var Ax = point[0]
      var Az = ml[2] - point[2]
      // console.log("My distance from object: " + Az)
      var Bz = ml[2] - cameraLocation[2]
      // console.log("My distance from camera: " + Bz)
      var Bx = Ax * (Bz / Az)

      // y
      var Ay = point[1]
      // var Az = ml[2] - point[2];
      // var Bz = ml[2] - cameraLocation[2];
      var By = Ay * (Bz / Az)

      mappedObj[objKeys[i]] = [Bx, By]
    } else {
      mappedObj[objKeys[i]] = [0, 0]
    }
  }
  return mappedObj
}

var squareish = {
  tl: [-4.0, 4.0, -80.0],
  tr: [4.0, 4.0, -40.0],
  bl: [-4.0, -4.0, -4.0],
  br: [4.0, -4.0, 4.0]
}

console.log(cube)
// writeFlatCube(mapPointsToPlane(transformPoints(mess, cube)))

var stillGoing = 2000
function zoomOut () {
  if (stillGoing > -1000) {
    ctx2.clearRect(0, 0, 600, 600)
    camera.location[2] = stillGoing
    stillGoing -= 10
    preRender()
    writeFlatCube(mapPointsToPlane(rotatedCube))
    render()
    setTimeout(zoomOut, 10)
  }
}

*/
