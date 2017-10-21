var MatrixOperations = function MatrixOperations () {

}

MatrixOperations.prototype = {
  // returns the appropriate identity matrix for a square matrix
  identity: function identity (mat) {
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
  },

  // subracts vector vb frm vector va, if they are of the same dimensions
  vectSubtract: function vectSubtract (va, vb) {
    if (va.length !== vb.length) {
      console.log("vector length mismatch, can't subtract")
    }
    var R = []
    for (var i = 0; i < va.length; i++) {
      R[i] = vb[i] - va[i]
    }
    return R
  },

  // multiplies two matrices, or a matrix A by a vector B
  matMul: function matMul (A, B) {
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
  },
  // multiplies a vector by a matrix (could use matMul, but that would require wrapping vector values in arrays and then unwrapping again)
  vectMatMul: function vectMatMul (M, V) {
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
  },

  // returns a matrix to a given (>=0) power
  pwrMat: function pwrMat (mat, pwr) {
    if (pwr < 0) {
      console.log('be more positive!')
    } else if (pwr === 0) {
      return (this.identity(mat))
    } else if (pwr === 1) {
      return (mat)
    } else {
      var result = mat
      for (var i = 2; i <= pwr; i++) {
        if (i % 50000000 === 0) {
          console.log(i)
        }
        result = this.matMul(result, mat)
      }
      return result
    }
  },

  // read the label
  matPrint: function matPrint (mat) {
    for (var i = 0; i < mat.length; i++) {
      console.log(mat[i])
    }
  }
}
