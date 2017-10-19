/* globals */

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

var floor = [
  [-400.0, -200.0, 400.0],
  [-400.0, -200.0, -400.0],
  [400.0, -200.0, 400.0],
  [400.0, -200.0, -400.0],
  [-200.0, -200.0, 200.0],
  [-200.0, -200.0, -200.0],
  [200.0, -200.0, 200.0],
  [200.0, -200.0, -200.0]
]

// Bx = Ax(Bz/Az)
// where
// Bx = desired screen coord
// Ax = point x location
// Bz = distance of screen from viewer (in the z axis)
// Az = distance of point A from viewer (in the z axis)

function mapPointsArrToPlane (arr) {
  // var ml = myLocation

  // these are the locations after the transform to a coord system with the camera at 0 and not rotated
  var camLocation = [0, 0, 0]
  var ml = [0, 0, 2]
  var mapped = []
  for (var i = 0; i < arr.length; i++) {
    var point = arr[i]
    if (point[2] > 0) {
      // console.log("My distance from object: " + Az)
      var Az = ml[2] - point[2]
      // console.log("My distance from camera: " + Bz)
      // var Bz = ml[2] - camLocation[2]
      var Bz = ml[2]

      // x
      var Ax = point[0]
      var Bx = Ax * (Bz / Az)

      // y
      var Ay = point[1]
      var By = Ay * (Bz / Az)

      mapped[i] = [Bx, By]
    } else {
      mapped[i] = 'NORENDER'
    }
  }
  return mapped
}

console.log(cube)
// writeFlatCube(mapPointsToPlane(transformPoints(mess, cube)))

var stillGoing = 2000
function zoomOut () {
  if (stillGoing > -1000) {
    ctx2.clearRect(0, 0, 600, 600)
    cameraLocation[2] = stillGoing
    myLocation[2] = stillGoing + 2
    stillGoing -= 10
    preRender()
    writeFlatCube(mapPointsToPlane(rotatedCube))
    render()
    setTimeout(zoomOut, 10)
  }
}

// zoomOut()

function project (array) {
  writeFlattenedArray(mapPointsArrToPlane(array))
}

var cubeArray = []
var cubeKeys = Object.keys(cube)
for (var i = 0; i < cubeKeys.length; i++) {
  cubeArray.push(cube[cubeKeys[i]])
}
console.log(cubeArray)

var alter1 = function (object, angle) {
  var newObj = []
  for (var i = 0; i < object.length; i++) {
    newObj[i] = []
    for (var j = 0; j < 3; j++) {
      newObj[i][j] = object[i][j] - 100
    }
  }
  return rotateObjectAllAxes(newObj, angle + 5, angle + 5, angle + 5)
}

var alter2 = function (object, angle) {
  var newObj = []
  for (var i = 0; i < object.length; i++) {
    newObj[i] = []
    for (var j = 0; j < 3; j++) {
      newObj[i][j] = object[i][j] + 200
    }
  }
  return rotateObjectAllAxes(newObj, angle + 9, angle + 10, angle + 15)
}

var stillGoing = 2000.0
var viewPos = 5000.0
function spin () {
  if (stillGoing > 0) {
    var objectsThisFrame = []
    var angle = stillGoing % 360.0
    objectsThisFrame.push(rotateObjectAllAxes(cubeArray, angle, angle, angle))
    objectsThisFrame.push(alter1(cubeArray, angle))
    objectsThisFrame.push(alter2(cubeArray, angle))
    objectsThisFrame.push(floor)

    preRender()
    for (var i = 0; i < objectsThisFrame.length; i++) {
      project(cameraOrientPointsArray(objectsThisFrame[i]))
    }
    render()

    // zoom and spin and stuff
    if (viewPos >= -200) {
      // cameraOrientation[0] = 0.3 // - down
      // cameraOrientation[1] += 0.003 //- right
      // cameraOrientation[2] += 0.008
      if (viewPos < 30) {
        viewPos -= 0.02
        stillGoing -= 0.002
      } else if (viewPos < 500) {
        viewPos -= 0.05
        stillGoing -= 0.004
      } else if (viewPos < 2000) {
        viewPos -= 1
        stillGoing -= 0.01
      } else {
        viewPos -= 12
        stillGoing -= 0.02
      }
      setTimeout(spin, 25)
    }
  }
}

spin()
// preRender()
// project(cameraOrientPointsArray(cubeArray))
// render()

// let's start by finding how far each point is from me
// var cubeKeys = Object.keys(cube);

// for (var i = 0; i < cubeKeys.length; i++) {
//    //two right angled triangles per point: one to get the
// }
