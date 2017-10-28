/* globals Vector getTree */

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
    ntl: new Vector(-40.0, 40.0, 40.0, 1),
    ntr: new Vector(40.0, 40.0, 40.0, 1),
    nbl: new Vector(-40.0, -40.0, 40.0, 1),
    nbr: new Vector(40.0, -40.0, 40.0, 1),
    ftl: new Vector(-40.0, 40.0, -40.0, 1),
    ftr: new Vector(40.0, 40.0, -40.0, 1),
    fbl: new Vector(-40.0, -40.0, -40.0, 1),
    fbr: new Vector(40.0, -40.0, -40.0, 1)
  }

  this.floor = [
    new Vector(-1000.0, -200.0, 1000.0, 1),
    new Vector(-1000.0, -200.0, -1000.0, 1),
    new Vector(1000.0, -200.0, 1000.0, 1),
    new Vector(1000.0, -200.0, -1000.0, 1),
    new Vector(-600.0, -200.0, 600.0, 1),
    new Vector(-600.0, -200.0, -600.0, 1),
    new Vector(600.0, -200.0, 600.0, 1),
    new Vector(600.0, -200.0, -600.0, 1),
    new Vector(-200.0, -200.0, 200.0, 1),
    new Vector(-200.0, -200.0, -200.0, 1),
    new Vector(200.0, -200.0, 200.0, 1),
    new Vector(200.0, -200.0, -200.0, 1)
  ]

  this.trees = []

  for (i = 0; i < 5; i++) {
    this.trees.push(getTree(new Vector(-1000 + (Math.random() * 2000), -200, -600 + (Math.random() * 1200))))
  }

  this.axes = [
    [], [], []
  ]

  for (i = -1000; i < 1000; i += 200) {
    this.axes[0].push(new Vector(i, 0, 0, 1))
    this.axes[1].push(new Vector(0, i, 0, 1))
    this.axes[2].push(new Vector(0, 0, i, 1))
  }

  this.stars = []
  var starRadius = 100000
  var starCount = 5000
  var starSize = 100
  for (i = 0; i < starCount; i++) {
    var l = -starRadius + Math.random() * 2 * starRadius
    var j = -starRadius + Math.random() * 2 * starRadius
    var k = -starRadius + Math.random() * 2 * starRadius
    this.stars.push([new Vector(l, j, k, 1), new Vector(l + Math.random() * starSize, j + Math.random() * starSize, k + Math.random() * starSize, 1)])
  }

  this.axisLabels = [
    // x
    [new Vector(500, 30, 0, 1), new Vector(530, 60, 0, 1)],
    [new Vector(500, 60, 0, 1), new Vector(530, 30, 0, 1)],

    [new Vector(550, 0, 30, 1), new Vector(580, 0, 60, 1)],
    [new Vector(550, 0, 60, 1), new Vector(580, 0, 30, 1)],

    // y
    [new Vector(30, 500, 0, 1), new Vector(60, 530, 0, 1)],
    [new Vector(45, 515, 0, 1), new Vector(30, 530, 0, 1)],

    [new Vector(0, 565, 45, 1), new Vector(0, 580, 60, 1)],
    [new Vector(0, 550, 60, 1), new Vector(0, 580, 30, 1)],

    // z
    [new Vector(60, 0, 500, 1), new Vector(60, 0, 530, 1)],
    [new Vector(30, 0, 500, 1), new Vector(30, 0, 530, 1)],
    [new Vector(30, 0, 500, 1), new Vector(60, 0, 530, 1)],

    [new Vector(0, 30, 550, 1), new Vector(0, 30, 580, 1)],
    [new Vector(0, 60, 550, 1), new Vector(0, 60, 580, 1)],
    [new Vector(0, 60, 550, 1), new Vector(0, 30, 580, 1)]
  ]

  for (i = 0; i < this.axisLabels.length; i++) {
    for (j = 0; j < 2; j++) {
      // this.axisLabels[i][j]['x'] -= 2000
    }
  }

  this.wall = []

  for (i = -10000; i < 10000; i += 100) {
    this.wall.push([new Vector(500, 1000, i - 100, 1), new Vector(500, -1000, i, 1)])
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
  getRandomGrey: function getRandomGrey () {
    var greys = ['white', 'grey', '#fff000']
    return greys[Math.floor(Math.rand * greys.length)]
  },

  alter1: function alter1 (object, angle) {
    var newObj = []
    for (var i = 0; i < object.length; i++) {
      newObj[i] = new Vector(object[i]['x'] - 100, object[i]['y'] - 100, object[i]['z'] - 100)
    }
    return this.rotation.rotateObjectAllAxes(newObj, angle + 5, angle + 5, angle + 5)
  },

  alter2: function alter2 (object, angle) {
    var newObj = []
    for (var i = 0; i < object.length; i++) {
      newObj[i] = new Vector(object[i]['x'] + 200, object[i]['y'] + 200, object[i]['z'] + 200)
    }
    return this.rotation.rotateObjectAllAxes(newObj, angle + 9, angle + 10, angle + 15)
  },

  alter3: function alter3 (object, angle) {
    var centre = [400, 400, 400]
    var newObj = []
    for (var i = 0; i < object.length; i++) {
      newObj[i] = new Vector(object[i]['x'] + 400, object[i]['y'] + 400, object[i]['z'] + 400)
    }
    return this.rotation.translateAllPointsRotateAndTranslateBack(newObj, centre, angle + 9, angle + 10, angle + 15)
  },

  starsFall: function starsFall () {
    for (var i = 0; i < this.stars.length; i++) {
      var drop = (200 * Math.random()) - 250
      var axes = ['x', 'y', 'z']
      var ax = axes[Math.floor(Math.random() * 3)]
      this.stars[i][0][ax] += drop
      this.stars[i][1][ax] += drop
    }
  },

  spin: function spin () {
    var i
    var threeDObjectsThisFrame = []
    var twoDObjectsThisFrame = []
    var angle = this.stillGoing % 360.0
    // threeDObjectsThisFrame.push(this.rotation.rotateObjectAllAxes(this.cubeArray, angle, angle, angle))
    // threeDObjectsThisFrame.push(this.alter1(this.cubeArray, angle))
    // threeDObjectsThisFrame.push(this.alter2(this.cubeArray, angle))
    // threeDObjectsThisFrame.push(this.alter3(this.cubeArray, angle))
    // threeDObjectsThisFrame.push(this.floor)
    for (i = 0; i < this.axes.length; i++) {
      threeDObjectsThisFrame.push(this.axes[i])
    }
    for (i = 0; i < this.stars.length; i++) {
      threeDObjectsThisFrame.push(this.stars[i])
    }
    for (i = 0; i < this.axisLabels.length; i++) {
      threeDObjectsThisFrame.push(this.axisLabels[i])
    }

    for (i = 0; i < this.crosshair.length; i++) {
      twoDObjectsThisFrame.push(this.crosshair[i])
    }

    this.renderer.preRender()
    // for (i = 0; i < this.trees.length; i++) {
    //   this.renderer.setWriteColor(this.getRandomGrey())
    //   for (var j = 0; j < this.trees[i].length; j++) {
    //     // threeDObjectsThisFrame.push(this.trees[i][j])
    //     this.renderer.writeFlattenedArray(this.projector.mapPointsArrToPlane(this.camera.orientPointsArray(this.trees[i][j])))
    //   }
    // }
    this.renderer.resetColor()
    for (i = 0; i < threeDObjectsThisFrame.length; i++) {
      this.renderer.writeFlattenedArray(this.projector.mapPointsArrToPlane(this.camera.orientPointsArray(threeDObjectsThisFrame[i])))
    }
    this.renderer.writeFlattenedArray([[345, 300], [453, 300]])
    for (i = 0; i < twoDObjectsThisFrame.length; i++) {
      this.renderer.writeFlattenedArray(twoDObjectsThisFrame[i], true)
    }
    this.renderer.render()

    this.stillGoing -= 0.02
  },

  doStuff: function doStuff () {
    // this.starsFall()
    this.spin()
  }
}
