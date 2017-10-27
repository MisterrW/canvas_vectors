/**
 * Generates a tree.
 */

function getBranch (tree, rootCoordinates, radius, maxLength, branchingFactor, spread, maxBranchingFactor) {
  var branchEnd = [
    rootCoordinates[0][0] + (-spread + (Math.random() * 2 * spread)),
    rootCoordinates[0][1] + ((0.5 * maxLength) + (Math.random() * 0.5 * maxLength)),
    rootCoordinates[0][2] + (-spread + (Math.random() * 2 * spread))
  ]
  var tipRadius = radius * 0.02
  var tipCoordinates = [branchEnd, [branchEnd[0] + tipRadius, branchEnd[1], branchEnd[2]], [branchEnd[0], branchEnd[1], branchEnd[2] + tipRadius]]
  tree.push(rootCoordinates.concat(tipCoordinates))
  if (branchingFactor < maxBranchingFactor) {
    for (var i = 0; i < branchingFactor; i++) {
      tree = getBranch(tree, tipCoordinates, tipRadius, maxLength * 0.7, branchingFactor + 2, spread * 2, maxBranchingFactor)
    }
  }
  return tree
}
function getTree (root) {
  var radius = 30
  var rootCoordinates = [root, [root[0] + radius, root[1], root[2]], [root[0], root[1], root[2] + radius]]
  // var radius = maxHeight / 100
  var tree = []
  var trunkLength = 50 + (Math.random() * 1200)
  var spread = Math.random() * (trunkLength / 40)
  var branchingFactor = Math.floor(Math.random() * 7)
  var maxBranchingFactor = 10
  return getBranch(tree, rootCoordinates, radius, trunkLength, branchingFactor, spread, maxBranchingFactor)
}
