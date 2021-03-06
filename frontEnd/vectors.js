/* globals MatrixOperations */
var matrixOps = new MatrixOperations()

var twoDimIdentity = [
  [1, 0],
  [0, 1]
]

var test1 = [
  [0, 1],
  [1, 0]
]

var test2 = [
  [-2, 0],
  [0, -2]
]

var shrinker = [
  [-0.5, 0],
  [0, -0.5]
]

var slanter = [
  [-1, -0.5],
  [0.5, 1]
]

console.log('in vectors')
var transform = test1

var vector1 = [2, 1]

var c = document.getElementById('myCanvas')
var ctx = c.getContext('2d')

function axes () {
  ctx.moveTo(300, 0)
  ctx.lineTo(300, 600)
  ctx.moveTo(0, 300)
  ctx.lineTo(600, 300)
  ctx.stroke()
}

function scaleVector (vector) {
  var result = []
  result[0] = 300 + (vector[0] * 60)
  result[1] = 300 - (vector[1] * 60)
  return result
}

function flatWrite (endVector, startVector) {
  startVector = startVector || [0, 0]
  var scaledStart = scaleVector(startVector)
  var scaledEnd = scaleVector(endVector)
  ctx.moveTo(scaledStart[0], scaledStart[1])
  ctx.lineTo(scaledEnd[0], scaledEnd[1])
  ctx.stroke()
}
axes()
flatWrite(vector1)

// flatWrite(arrVectMatMul(twoDimIdentity, vector1));
// flatWrite(arrVectMatMul(test1, vector1));
// flatWrite(arrVectMatMul(test2, vector1));

var sqr = {
  tl: [1, 3],
  tr: [3, 3],
  bl: [1, 1],
  br: [3, 1]
}

function printSquare (tl, bl, tr, br) {
  flatWrite(tl, tr)
  flatWrite(bl, br)
  flatWrite(tl, bl)
  flatWrite(tr, br)
}

printSquare(sqr.tl, sqr.bl, sqr.tr, sqr.br)

var smlSqr = {
  tl: matrixOps.arrVectMatMul(shrinker, sqr.tl),
  tr: matrixOps.arrVectMatMul(shrinker, sqr.tr),
  bl: matrixOps.arrVectMatMul(shrinker, sqr.bl),
  br: matrixOps.arrVectMatMul(shrinker, sqr.br)
}

var slntSqr = {
  tl: matrixOps.arrVectMatMul(slanter, sqr.tl),
  tr: matrixOps.arrVectMatMul(slanter, sqr.tr),
  bl: matrixOps.arrVectMatMul(slanter, sqr.bl),
  br: matrixOps.arrVectMatMul(slanter, sqr.br)
}

printSquare(sqr.tl, sqr.bl, sqr.tr, sqr.br)
printSquare(smlSqr.tl, smlSqr.bl, smlSqr.tr, smlSqr.br)
printSquare(slntSqr.tl, slntSqr.bl, slntSqr.tr, slntSqr.br)
