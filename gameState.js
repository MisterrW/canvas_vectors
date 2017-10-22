/* globals */

var GameState = function GameState (rotation, renderer, projector, camera) {
  var i
  this.rotation = rotation
  this.renderer = renderer
  this.projector = projector
  this.camera = camera

  this.crosshair = [
    [[500, 280], [500, 290]],
    [[480, 300], [490, 300]],
    [[500, 310], [500, 320]],
    [[510, 300], [520, 300]]
  ]

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
  this.axes = [
    [], [], []
  ]

  for (i = -1000; i < 1000; i += 200) {
    this.axes[0].push([i, 0, 0])
    this.axes[1].push([0, i, 0])
    this.axes[2].push([0, 0, i])
  }

  this.references = [

  ]
  for (i = -10000; i < 10000; i += 3000) {
    for (var j = -10000; j < 10000; j += 3000) {
      for (var k = -10000; k < 10000; k += 3000) {
        this.references.push([[i, j, k], [i + 20, j + 20, k + 20]])
      }
    }
  }

  this.axisLabels = [
    // x
    [[500, 30, 0], [530, 60, 0]],
    [[500, 60, 0], [530, 30, 0]],

    [[550, 0, 30], [580, 0, 60]],
    [[550, 0, 60], [580, 0, 30]],

    // y
    [[30, 500, 0], [60, 530, 0]],
    [[45, 515, 0], [30, 530, 0]],

    [[0, 565, 45], [0, 580, 60]],
    [[0, 550, 60], [0, 580, 30]],

    // z
    [[60, 0, 500], [60, 0, 530]],
    [[30, 0, 500], [30, 0, 530]],
    [[30, 0, 500], [60, 0, 530]],

    [[0, 30, 550], [0, 30, 580]],
    [[0, 60, 550], [0, 60, 580]],
    [[0, 60, 550], [0, 30, 580]]
  ]

  this.wall = [

  ]

  for (i = -10000; i < 10000; i += 100) {
    this.wall.push([[500, 1000, i - 100], [500, -1000, i]])
  }

  this.cubeArray = []
  this.cubeKeys = Object.keys(this.cube)
  for (i = 0; i < this.cubeKeys.length; i++) {
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

  alter3: function alter3 (object, angle) {
    var centre = [400, 400, 400]
    var newObj = []
    for (var i = 0; i < object.length; i++) {
      newObj[i] = []
      for (var j = 0; j < 3; j++) {
        newObj[i][j] = object[i][j] + 400
      }
    }
    return this.rotation.translateAllPointsRotateAndTranslateBack(newObj, centre, angle + 9, angle + 10, angle + 15)
  },

  spin: function spin () {
    var i
    var threeDObjectsThisFrame = []
    var twoDObjectsThisFrame = []
    var angle = this.stillGoing % 360.0
    threeDObjectsThisFrame.push(this.rotation.rotateObjectAllAxes(this.cubeArray, angle, angle, angle))
    threeDObjectsThisFrame.push(this.alter1(this.cubeArray, angle))
    threeDObjectsThisFrame.push(this.alter2(this.cubeArray, angle))
    threeDObjectsThisFrame.push(this.alter3(this.cubeArray, angle))
    threeDObjectsThisFrame.push(this.floor)
    for (i = 0; i < this.axes.length; i++) {
      threeDObjectsThisFrame.push(this.axes[i])
    }
    for (i = 0; i < this.references.length; i++) {
      threeDObjectsThisFrame.push(this.references[i])
    }
    for (i = 0; i < this.axisLabels.length; i++) {
      threeDObjectsThisFrame.push(this.axisLabels[i])
    }
    for (i = 0; i < this.crosshair.length; i++) {
      twoDObjectsThisFrame.push(this.crosshair[i])
    }

    this.renderer.preRender()
    for (i = 0; i < threeDObjectsThisFrame.length; i++) {
      this.renderer.writeFlattenedArray(this.projector.mapPointsArrToPlane(this.camera.orientPointsArray(threeDObjectsThisFrame[i])))
    }
    this.renderer.writeFlattenedArray([[345, 300], [453, 300]])
    for (i = 0; i < twoDObjectsThisFrame.length; i++) {
      this.renderer.writeFlattenedArray(twoDObjectsThisFrame[i], true)
    }
    this.renderer.render()

    this.stillGoing -= 0.02
  }
}
