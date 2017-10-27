/**
 * Generates a tree.
 */

 var branchCount;
function getBranch (tree, rootCoordinates, radius, maxLength, branchingFactor, spread, maxBranchingFactor) {
  
  if(branchCount < 100) {
  //   branchCount++
  // console.log(branchCount)
  var branchEnd = [
    rootCoordinates[0][0] + (-spread + (Math.random() * 2 * spread)),
    rootCoordinates[0][1] + ((0.5 * maxLength) + (Math.random() * 0.5 * maxLength)),
    rootCoordinates[0][2] + (-spread + (Math.random() * 2 * spread))
  ]
  var tipRadius = radius * 0.5
  var tipCoordinates = [branchEnd, [branchEnd[0] + tipRadius, branchEnd[1], branchEnd[2]], [branchEnd[0], branchEnd[1], branchEnd[2] + tipRadius]]
  tree.push(rootCoordinates.concat(tipCoordinates))
  if (branchingFactor < maxBranchingFactor) {
    for (var i = 0; i < branchingFactor; i++) {
      tree = getBranch(tree, tipCoordinates, tipRadius, maxLength * 0.7, branchingFactor + 2, spread * 1.2, maxBranchingFactor)
    }
  }
}
  return tree
}
function getTree (root) {
  branchCount = 0
  var radius = 30
  var rootCoordinates = [root, [root[0] + radius, root[1], root[2]], [root[0], root[1], root[2] + radius]]
  // var radius = maxHeight / 100
  var tree = []
  var trunkLength = 300 + (Math.random() * 30)
  var spread = (trunkLength / 5) + Math.random() * (trunkLength / 40)
  var branchingFactor = 1 + Math.floor(Math.random() * 7)
  var maxBranchingFactor = 10
  return getBranch(tree, rootCoordinates, radius, trunkLength, branchingFactor, spread, maxBranchingFactor)
}
