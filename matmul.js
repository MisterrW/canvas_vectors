// returns the appropriate identity matrix for a square matrix
function identity (mat) {
  var height = mat.length
  var r, c, I
  for (r = 0; r < height; r++) {
    if (mat[r].length !== height) {
      console.log('Matrix is not square. There is no spoon.')
      return
    }
  }
  I = []
  for (r = 0; r < height; r++) {
    I[r] = []
    for (c = 0; c < mat[r].length; c++) {
      c === r ? I[r].push(1) : I[r].push(0)
    }
  }
  return I
}

// multiplies two matrices, or a matrix A by a vector B

function matMul (A, B) {
  var i, j, k
  var R = []
  if (A[0].length !== B.length) {
    console.log("Hell, I can't multiply these things!")
    console.log(A)
    console.log(B)
    return
  }
  // for each row of A
  for (j = 0; j < A.length; j++) {
    R[j] = []
    // for each column in B
    for (i = 0; i < B[0].length; i++) {
      // R[j][i] = [];
      // total = 0
      R[j][i] = 0
      // for each element l in that row of A
      for (k = 0; k < B.length; k++) {
        // add to the total for the position being evaluated the value of the position k in the COLUMN of B multiplied by the value of that same position k in the ROW of A
        R[j][i] += (A[j][k] * B[k][i])
      }
    }
  }
  return R
}

function vectMatMul (M, V) {
  var j, k
  var R = []
  if (M[0].length !== V.length) {
    console.log("Hell, I can't multiply these things!")
    console.log(M)
    console.log(V)
    return
  }

  for (j = 0; j < M.length; j++) {
    R[j] = 0
    for (k = 0; k < V.length; k++) {
      R[j] += (M[j][k] * V[k])
    }
  }
  return R
}

// returns a matrix to a given (>=0) power
function pwrMat (mat, pwr) {
  if (pwr < 0) {
    console.log('be more positive!')
  } else if (pwr === 0) {
    return (identity(mat))
  } else if (pwr === 1) {
    return (mat)
  } else {
    var result = mat
    for (var i = 2; i <= pwr; i++) {
      i % 50000000 === 0 ? console.log(i) : null
      result = matMul(result, mat)
    }
    return result
  }
}

// read the label
function matPrint (mat) {
  for (var i = 0; i < mat.length; i++) {
    console.log(mat[i])
  }
}

var I = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]

var la = [
  [-1, 0, 0],
  [0, 1, 0],
  [0, 0, -3]
]

var neg = [
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1]
]

var m1 = [
  [2, 3, 4],
  [5, 6, 7],
  [8, 9, 10]
]

var empty = [
  [],
  [],
  []
]

var m2 = [
  [7, 9, 4],
  [1, 3, -5],
  [2, -1, -3]
]

var m3 = [
  [5, 1, 4],
  [8, 2, 7],
  [1, 4, 9]
]

// console.log(m3);
// console.log(matMul(matMul(m3, m3), m3));
// console.log(pwrMat(m3, 0));
// console.log(pwrMat(m3, 1));
// console.log(pwrMat(m3, 10));

// matPrint(matMul(m2, m3));
// matPrint(matMul(m3, m2))

// matPrint(matMul(la, [[2], [3], [8]]));

// console.log(matMul(I, m1));
// console.log(matMul(neg, m1));

// for var i in B (rows of B)
// for var j in B[i] (cols of B)
//
//

// B
// i0j0 i0j1 i0j2
// i1j0 i1j1 i1j2
// i2j0 i2j2 i2j2

// A

// disprove ' AB === O implies A === 0 || B === 0 '

var Aa = [
  [1, 1],
  [0, 0]
]

var Bb = [
  [0, 1],
  [0, 1]
]

// matPrint(matMul(Aa, Bb));
// matPrint(matMul(Bb, Aa));
//
// matPrint(identity(Aa));
// matPrint(identity(m3));
// matPrint(identity([[1,2,3],[1,2,4]]));

var T = [
  [0.6, 0.7],
  [0.4, 0.3]
]

// matPrint( matMul(pwrMat(T, 1), [[0.5],[0.5]]) );
// console.log("");
// matPrint( matMul(pwrMat(T, 2), [[0.5],[0.5]]) );
// console.log("");
// matPrint( matMul(pwrMat(T, 10), [[0.5],[0.5]]) );
// console.log("");
// matPrint( matMul(pwrMat(T, 100), [[0.5],[0.5]]) );
// console.log("");
//
// matMul(m3, Aa);
