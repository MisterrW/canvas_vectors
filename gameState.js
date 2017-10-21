/* globals */

var GameState = function GameState (rotation, renderer, projector, camera) {
  this.rotation = rotation
  this.renderer = renderer
  this.projector = projector
  this.camera = camera
  this.cube = {
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

  this.floor = [
    [-400.0, -200.0, 400.0],
    [-400.0, -200.0, -400.0],
    [400.0, -200.0, 400.0],
    [400.0, -200.0, -400.0],
    [-200.0, -200.0, 200.0],
    [-200.0, -200.0, -200.0],
    [200.0, -200.0, 200.0],
    [200.0, -200.0, -200.0]
  ]

  this.cubeArray = []
  this.cubeKeys = Object.keys(this.cube)
  for (var i = 0; i < this.cubeKeys.length; i++) {
    this.cubeArray.push(this.cube[this.cubeKeys[i]])
  }
  console.log(this.cubeArray)

  this.stillGoing = 0
}

GameState.prototype = {
  alter1: function alter1 (object, angle) {
    var newObj = []
    for (var i = 0; i < object.length; i++) {
      newObj[i] = []
      for (var j = 0; j < 3; j++) {
        newObj[i][j] = object[i][j] - 100
      }
    }
    return this.rotation.rotateObjectAllAxes(newObj, angle + 5, angle + 5, angle + 5)
  },

  alter2: function alter2 (object, angle) {
    var newObj = []
    for (var i = 0; i < object.length; i++) {
      newObj[i] = []
      for (var j = 0; j < 3; j++) {
        newObj[i][j] = object[i][j] + 200
      }
    }
    return this.rotation.rotateObjectAllAxes(newObj, angle + 9, angle + 10, angle + 15)
  },

  spin: function spin () {
    var objectsThisFrame = []
    var angle = this.stillGoing % 360.0
    objectsThisFrame.push(this.rotation.rotateObjectAllAxes(this.cubeArray, angle, angle, angle))
    objectsThisFrame.push(this.alter1(this.cubeArray, angle))
    objectsThisFrame.push(this.alter2(this.cubeArray, angle))
    objectsThisFrame.push(this.floor)

    this.renderer.preRender()
    for (var i = 0; i < objectsThisFrame.length; i++) {
      this.renderer.writeFlattenedArray(this.projector.mapPointsArrToPlane(this.camera.orientPointsArray(objectsThisFrame[i])))
    }
    this.renderer.render()

    this.stillGoing -= 0.02
  }
}
