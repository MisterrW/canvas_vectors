/* globals vectMatMul */

// var threeDimIdentity = [
//   [1, 0, 0],
//   [0, 1, 0],
//   [0, 0, 2]
// ]

// something to look at
var cube = {
// point: [x, y, z]
  ntl: [-40.0, 40.0, 40.0],
  ntr: [40.0, 40.0, 40.0],
  nbl: [-40.0, -40.0, 40.0],
  nbr: [40.0, -40.0, 40.0],
  ftl: [-40.0, 40.0, -40.0],
  ftr: [40.0, 40.0, -40.0],
  fbl: [-40.0, -40.0, -40.0],
  fbr: [40.0, -40.0, -40.0]
}

var squareish = {
  tl: [-4.0, 4.0, -80.0],
  tr: [4.0, 4.0, -40.0],
  bl: [-4.0, -4.0, -4.0],
  br: [4.0, -4.0, 4.0]
}

// perform a 3d transform on a 3d point (multiply point by a matrix)
function transform (matrix, point) {
  console.log(matrix)
  console.log(point)
  return vectMatMul(matrix, point)
}

// skipping the awkward part of transforming the points to a coordinate system defined by the camera's orientation, for now

// somewhere to look from, the centre of my window
var windowLocation =
  // [x, y, z]
    [0.0, 0.0, 70.0]

// var windowOrientation =
//   // this point and the window location should be enough
//   // not actually needed until we start doing transforms of the camera orientation
//   [0, 0, 0]
//
// // a window (does defining this even do anything?)
// var windowDimensions = {
//   width: 3,
//   height: 3
// }

// with this, we can figure out where the 3d points get projected onto the window
var myLocation = [0.0, 0.0, 0.0]

myLocation[2] = windowLocation[2] + 2

// formula for x coord of projected point:
// b{x} = ( (ml{z}/p{z}) * p{x} ) - ml{x}

// b{x} = the x coordinate on the screen
// p{x} = the x coordinate of the point we're projecting
// ml{x} = the x coordinate of the viewer's location

// repeat for y coord

// no, use:
// Bx = Ax(Bz/Az)
//
// where
// Bx = desired screen coord
// Ax = point x location
//
// Bz = distance of screen from viewer (in the z axis)
//
// Az = distance of point A from viewer (in the z axis)

function mapPointsToPlane (pointsObject) {
  var objKeys = Object.keys(pointsObject)
  var mappedObj = {}
  var ml = myLocation
  for (var i = 0; i < objKeys.length; i++) {
    var point = pointsObject[objKeys[i]]
    // x
    var Ax = point[0]
    var Az = ml[2] - point[2]
    // console.log("My distance from object: " + Az)
    var Bz = ml[2] - windowLocation[2]
    // console.log("My distance from camera: " + Bz)
    var Bx = Ax * (Bz / Az)

    // y
    var Ay = point[1]
    // var Az = ml[2] - point[2];
    // var Bz = ml[2] - windowLocation[2];
    var By = Ay * (Bz / Az)

    mappedObj[objKeys[i]] = [Bx, By]
  }
  return mappedObj
}

var flatCube = mapPointsToPlane(cube)
console.log(flatCube)

var c2 = document.querySelector('#my3dCanvas')
var ctx2 = c2.getContext('2d')

function scaleVector2 (vector) {
  var result = []
  result[0] = 300 + (vector[0] * 300)
  result[1] = 300 - (vector[1] * 300)
  return result
}

function write3d (endVector, startVector) {
  startVector = startVector || [0, 0]
  var scaledStart = scaleVector2(startVector)
  var scaledEnd = scaleVector2(endVector)
  ctx2.moveTo(scaledStart[0], scaledStart[1])
  ctx2.lineTo(scaledEnd[0], scaledEnd[1])
  ctx2.stroke()
}
function writeFlatCube (flatCube) {
  console.log(flatCube)
  var flatCubeKeys = Object.keys(flatCube)
  // for (var i = 0; i < flatCubeKeys.length; i++) {
  //   for (var j = 0; j < flatCubeKeys.length; j++) {
  //     //console.log(flatCube[flatCubeKeys[i]] + ', ' + flatCube[flatCubeKeys[j]])
  //     write3d(flatCube[flatCubeKeys[i]], flatCube[flatCubeKeys[j]])
  //   }
  // }
  write3d(flatCube.ntl, flatCube.ntr)
  write3d(flatCube.nbl, flatCube.nbr)
  write3d(flatCube.ntl, flatCube.nbl)
  write3d(flatCube.ntr, flatCube.nbr)

  write3d(flatCube.ftl, flatCube.ftr)
  write3d(flatCube.fbl, flatCube.fbr)
  write3d(flatCube.ftl, flatCube.fbl)
  write3d(flatCube.ftr, flatCube.fbr)

  write3d(flatCube.ntl, flatCube.ftl)
  write3d(flatCube.ntr, flatCube.ftr)
  write3d(flatCube.nbl, flatCube.fbl)
  write3d(flatCube.nbr, flatCube.fbr)
}

writeFlatCube(flatCube)

var flatSquareish = mapPointsToPlane(squareish)
// writeFlatCube(flatSquareish)

var mess = [
  [1, 0, 1],
  [0, -2, 2],
  [0, 0, 1]
]

function transformPoints (transformM, pointsObj) {
  var oKeys = Object.keys(pointsObj)
  var tObj = {}
  for (var i = 0; i < oKeys.length; i++) {
    tObj[oKeys[i]] = transform(transformM, pointsObj[oKeys[i]])
  }
  return tObj
}

console.log(cube)
// writeFlatCube(mapPointsToPlane(transformPoints(mess, cube)))

var stillGoing = 2000
function zoomOut () {
  if (stillGoing > -1000) {
    ctx2.clearRect(0, 0, 600, 600)
    windowLocation[2] = stillGoing
    myLocation[2] = stillGoing + 2
    stillGoing -= 10
    ctx2.beginPath()
    writeFlatCube(mapPointsToPlane(cube))
    writeFlatCube(mapPointsToPlane(transformPoints(mess, cube)))
    ctx2.closePath()
    setTimeout(zoomOut, 10)
  }
}

zoomOut()
// let's start by finding how far each point is from me
// var cubeKeys = Object.keys(cube);

// for (var i = 0; i < cubeKeys.length; i++) {
//    //two right angled triangles per point: one to get the
// }
