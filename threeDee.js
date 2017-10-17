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
  ftr: [40, 40, -40.0],
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
    [0.0, 0.0, 270.0]

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
    if (point[2] < myLocation[2]) {
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
    } else {
      mappedObj[objKeys[i]] = [0, 0]
    }
  }
  return mappedObj
}

function mapPointsArrToPlane (arr) {
  var ml = myLocation
  var mapped = []
  for (var i = 0; i < arr.length; i++) {
    var point = arr[i]
    if (point[2] < myLocation[2]) {
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

      mapped[i] = [Bx, By]
    } else {
      mapped[i] = [0, 0]
    }
  }
  return mapped
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

function write (endVector, startVector) {
  // console.log('hello')
  // console.log(startVector + '. ' + endVector)
  startVector = startVector || [0, 0]
  var scaledStart = scaleVector2(startVector)
  var scaledEnd = scaleVector2(endVector)
  ctx2.lineTo(scaledStart[0], scaledStart[1])
  ctx2.lineTo(scaledEnd[0], scaledEnd[1])

  ctx2.stroke()
}
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
// writeFlatCube(flatCube)

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
    // writeFlatCube(mapPointsToPlane(cube))
    writeFlatCube(mapPointsToPlane(rotatedCube))
    // writeFlatCube(mapPointsToPlane(transformPoints(mess, cube)))
    ctx2.closePath()
    setTimeout(zoomOut, 10)
  }
}

// zoomOut()
function writeFlattenedArray (arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      write(arr[i], arr[j])
    }
  }
}

function render (array) {
  ctx2.clearRect(0, 0, 600, 600)
  ctx2.beginPath()
  writeFlattenedArray(mapPointsArrToPlane(array))
  ctx2.strokeStyle = '#ff0099'
  ctx2.stroke()
  ctx2.closePath()
}

var cubeArray = []
var cubeKeys = Object.keys(cube)
for (var i = 0; i < cubeKeys.length; i++) {
  cubeArray.push(cube[cubeKeys[i]])
}
console.log(cubeArray)

var stillGoing = 2000.0
var viewPos = 5000.0
function spin () {
  if (stillGoing > 0) {
    var angle = stillGoing % 360.0
    windowLocation[2] = viewPos
    myLocation[2] = viewPos + 2

    // we can make this better. instead of doing these in sequence, if we did it in one go we could multiply the matrices once (1 op) and then do the vector mult just once for each point (8 ops) instead of the 24 needed here

    // var xRotatedCube = rotateObject(cubeArray, 'x', angle)
    // var xyRotatedCube = rotateObject(xRotatedCube, 'y', angle)
    // var xyzRotatedCube = rotateObject(xyRotatedCube, 'z', angle)
    //
    var xyzRotatedCube = rotateObjectAllAxes(cubeArray, angle, angle, angle)
    render(xyzRotatedCube)

    if (viewPos >= 50) {
      if (viewPos < 150) {
        viewPos -= 0.2
        stillGoing -= 0.005
      } else if (viewPos < 500) {
        viewPos -= 2
        stillGoing -= 0.03
      } else if (viewPos < 2000) {
        viewPos -= 1
        stillGoing -= 0.01
      } else {
        viewPos -= 12
        stillGoing -= 0.02
      }
    }
  }
  setTimeout(spin, 1)
}

spin()
// render(cubeArray)

// let's start by finding how far each point is from me
// var cubeKeys = Object.keys(cube);

// for (var i = 0; i < cubeKeys.length; i++) {
//    //two right angled triangles per point: one to get the
// }
