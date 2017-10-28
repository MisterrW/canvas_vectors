/* globals Camera KeyMovement MouseMovement MatrixOperations GameState Rotation Renderer Projector */

var playing = false

// bunch of globals relating to mouse and keys
var mousePosition
var mouseIsDown = false
// event handler called when mouse over viewport
var setMousePosition = function (event) {
  // mouse controls camera orientation
  mousePosition = [event.clientX, event.clientY]
}
var mouseDown = function () {
  mouseIsDown = true
}
var mouseUp = function () {
  mouseIsDown = false
}
var activeKeys = {}
window.onkeyup = function (e) { this.activeKeys[e.keyCode] = false }
window.onkeydown = function (e) { this.activeKeys[e.keyCode] = true }

var mainLoop = function (gameState, keyMovement, mouseMovement) {
  //mouseMovement.move(mousePosition, mouseIsDown)
  keyMovement.move(activeKeys)
  gameState.doStuff()
  // render (take out of gameState, so it just returns objects to render)
  function nextFrame () {
    mainLoop(gameState, keyMovement, mouseMovement)
  }
  if (playing) {
    setTimeout(nextFrame, 20)
  }
}

var startGame = function () {
  var matrixOps = new MatrixOperations()
  var rotation = new Rotation(matrixOps)
  var renderer = new Renderer()
  var projector = new Projector()

  var camera = new Camera(matrixOps, rotation)
  var mouseMovement = new MouseMovement(camera)
  var keyMovement = new KeyMovement(camera)
  var gameState = new GameState(rotation, renderer, projector, camera)
  playing = true
  mainLoop(gameState, keyMovement, mouseMovement)
}

var endGame = function () {
  playing = false
  // unset window watchers for mouse etc
}
startGame()
