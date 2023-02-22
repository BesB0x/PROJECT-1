// * Swarm Movement

// Micro functions
function checkRight(swarm) {
  return swarm.every(alien => {
    if (alien % width !== width - 1) {
      return true
    } else {
      return false
    }
  })
}

function checkLeft(swarm) {
  return swarm.some(alien => {
    if (alien % width === 0) {
      return true
    } else {
      return false
    }
  })
}

function hitBottom(alienPosition) {
  return alienPosition.some(alien => {
    if (alien + width < cellCount) {
      console.log('not')
      return true
    } else {
      console.log('bottom')
      return false
    }
  })
}


function moveSwarm(movement) {
  // console.log('moving')
  removeCat(currentPosition)
  const move = currentPosition.map(alien => {
    return alien + movement
  })
  currentPosition = move
  // console.log(currentPosition)
  addCat(currentPosition)
}

// Macro function

function moveSwarm() {


  // removeCat()
  if (hitBottom(currentPosition)) {
    alienMovesOne = setInterval(() => {
      dropped = false
      reset = true
      if (checkRight(currentPosition)) {
        console.log('interval start')
        console.log('right move')
        console.log(currentPosition)
        // console.log(checkRight(currentPosition))
        moveSwarm(1)
      } else {
        console.log('from drop' + currentPosition)
        dropped = true
        console.log('drop1')
        clearInterval(alienMovesOne)
        moveSwarm(10)
      }
    }, 1000)
    alienMovesTwo = setInterval(() => {
      console.log('testing')
      if (checkLeft(currentPosition) === false && dropped) {
        console.log('next interval' + currentPosition)
        moveSwarm(-1)
        movingLeft = true
      } else if (checkLeft(currentPosition) === true && dropped && movingLeft) {
        console.log('found')
        clearInterval(alienMovesTwo)
        moveSwarm(10)
        reset = true
      }
    }, 1000)



  }
}
