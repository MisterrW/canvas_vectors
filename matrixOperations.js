var MatrixOperations = function MatrixOperations () {
  this.inverseCount = 0
}

MatrixOperations.prototype = {
  // returns the appropriate identity matrix for a square matrix
  getIdentity: function getIdentity (mat) {
    var height = mat.length
    var r, c, I
    // for (r = 0; r < height; r++) {
    //   if (mat[r].length !== height) {
    //     console.log("Identity doesn't exist - matrix is not square.")
    //     return
    //   }
    // }
    // speed up some common cases
    if (height === 3) {
      return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ]
    } else if (height === 2) {
      return [
        [1, 0],
        [0, 1]
      ]
    } else {
      I = []
      for (r = 0; r < height; r++) {
        I[r] = []
        for (c = 0; c < height; c++) {
          c === r ? I[r].push(1) : I[r].push(0)
        }
      }
      return I
    }
  },

  /**
  * Returns the inverse of a matrix (if it has one) via Gauss-Jordan elimination
  */
  invert: function invert (M) {
    var I = this.getIdentity(M)
    var i
    if (!I) { return }
    // augment M with I
    var aug = []
    for (i = 0; i < M.length; i++) {
      aug[i] = M[i].concat(I[i])
    }

    /* Gauss-Jordan elimination. The idea is, having augmented M with I, so the left half of aug is M and the right side is I, we cary out row operations on the augmented matrix until the left side is I. When this happens, we know the right side is M's inverse, M-1.

    The row operations are:
    - add a multiple of a row to another row
    - swap two rows
    - multiply a row by a non-zero number

    the first step is to get into row echelon form, which looks like this:

    4, 6, 9
    0, 7, 2
    0, 0, 7

    ie, the bottom left is all 0s.

    the computer doesn't know which rows are the best options for this.
    numerical stability is also a problem for very small numbers, so use the largest as pivot

    so, to start with:
    - rearrange the rows so that the row with the largest value at position 0 is at the top (this will be the pivot)
    - for every row below which does not have a leading 0, multiply the pivot row by whatever makes its first value the same as the subject row's first value
    - then, subtract this result from the subject row to give a leading zero.

    this should give us our leading zeros for the first column.

    */

    // console.log('aug before first stage GJ elimination')
    // this.matPrint(aug)

    var j, k, divisor
    // need to iterate over the cols of the original matrix
    for (i = 0; i < M.length; i++) {
    // first, get largest number to pivot position
      var pivotVal = 0
      var pivotRowNo = i
      for (j = i; j < aug.length; j++) {
        if (aug[j][i] > pivotVal) {
          pivotRowNo = j
        }
      }
      if (pivotRowNo > i) {
        var holder = aug[i]
        aug[i] = aug[pivotRowNo]
        aug[pivotRowNo] = holder
      }
      // next, get all non-pivot row entries in this column to 0
      for (j = i + 1; j < aug.length; j++) {
        divisor = (aug[i][i] / aug[j][i])
        for (k = i; k < aug[0].length; k++) {
          aug[j][k] -= (aug[i][k] / divisor)
        }
      }
      // console.log('aug after first stage GJ elimination of column ' + i)
      // this.matPrint(aug)
    }

    console.log('aug after first stage GJ elimination')
    this.matPrint(aug)

    // stage 2: take the row echelon and reduce it further until all non-zero values are on the top-left - bottom-right diagonal
    // use the bottom row as the pivot for getting rid of the right-hand column's zeros above it, then the one above that for the next one in, etc
    for (i = M.length - 1; i >= 0; i--) {
      if (aug[i][i] !== 0) {
        for (j = i - 1; j >= 0; j--) {
          if (aug[j][i] !== 0) {
            divisor = aug[i][i] / aug[j][i]
            console.log('divisor == ' + aug[i][i] + ' / ' + aug[j][i] + ' == ' + aug[i][i] / aug[j][i])
            for (k = 0; k < aug[0].length; k++) {
              console.log('' + (aug[j][k]) + ' - ' + '(' + aug[i][k] + ' / ' + divisor + ') == ' + aug[j][k] + ' - ' + (aug[i][k] / divisor) + ' == ' + (aug[j][k] - (aug[i][k] / divisor)))

              aug[j][k] -= (aug[i][k] / divisor)
            }
          }
        }
      }
      console.log('aug first pass of second stage GJ elimination')
      this.matPrint(aug)
    }
    console.log('aug after second stage GJ elimination')
    this.matPrint(aug)

    // finally, divide the rows to get the identity on the left
    for (i = 0; i < M.length; i++) {
      if (aug[i][i] !== 0) {
        for (j = 0; j < aug[0].length; j++) {
          aug[i][j] = aug[i][j] / aug[i][i]
        }
      } else {
        console.log('error - 0 in main diagonal')
      }
    }
    console.log('aug after complete GJ elimination, left half should be near as dammit an identity matrix')
    this.matPrint(aug)

    console.log('done')
    this.inverseCount++
    if (this.inverseCount % 500 === 0) {
      console.log(this.inverseCount)
    }
  },

  /**
  * Multiplies two matrices. (For vector * matrix, use vectMatMul)
  */
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
  },

  /**
  * Vector operations
  */
  vectAdd: function vectAdd (va, vb) {
    if (va.length !== vb.length) {
      console.log("vector length mismatch, can't add")
    }
    var R = []
    for (var i = 0; i < va.length; i++) {
      R[i] = vb[i] + va[i]
    }
    return R
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
  }
}
