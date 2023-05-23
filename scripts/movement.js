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




  function rocketFired(e) {
    e.preventDefault()
    if (e.keyCode === 32) {
      // console.log(alienStartingPosition)
      let rocketCurrentPosition = playerPosition - width
      addRocket(rocketCurrentPosition)
      const rocketInterval = setInterval(() => {
        if (gameEnd) {
          clearInterval(rocketInterval)
        }
        if (rocketHitsTop(rocketCurrentPosition) === false) {
          removeRocket(rocketCurrentPosition)
          rocketCurrentPosition -= width
          addRocket(rocketCurrentPosition)
          // alienHitByRocket(alienStartingPosition)

        } else if (rocketHitsTop(rocketCurrentPosition)) {
          removeRocket(rocketCurrentPosition)
          clearInterval(rocketInterval)
        }

        // cells.forEach(cell => {
        //   if (cell.classList.contains('barrier') && cell.classList.contains('rocket')) {
        //     // console.log('hit')
        //     // removeAlienRocket(alienRocketPosition)
        //     removeBarrier(rocketCurrentPosition)
        //     // clearInterval(alienRocketMovementInterval)
        //     clearInterval(rocketInterval)
        //     removeRocket(rocketCurrentPosition)
        //   }
        // })
        cells.forEach(alienDead => {
          if (alienDead.classList.contains('rocket') && alienDead.classList.contains('alien')) {
            // console.log(alienDead)
            alienDead.classList.remove('rocket')
            alienDead.classList.remove('alien')
            clearInterval(rocketInterval)
            const alienKilled = currentPosition.filter(safe => {
              return safe !== parseInt(alienDead.dataset.index)
            })
            // console.log(currentPosition)
            currentPosition = alienKilled
            // console.log(currentPosition)
            score += 100
            scoreBoard.innerHTML = score
          }
        })
        // Player Win

        if (score === parseInt(alienStartingPosition.length) * 100) {
          // console.log('endgame')
          endGame()
          endGameWrapperWin.style.display = 'flex'
          const endScore = document.getElementById('final-score-win')
          endScore.innerText = score
        }
      }, 300)

    }
  }
