function init() {


  // Create Grid
  const grid = document.querySelector('.grid')
  const width = 20
  const cellCount = width * width
  const cells = []

  function createGrid() {
    // Using the total cell count we've saved to a variable we're going to use a for loop to iterate that many times
    for (let i = 0; i < cellCount; i++) {
      // console.log('CELL CREATED')
      // Create div cell
      const cell = document.createElement('div')

      // Add index as innerText
      // cell.innerText = i

      // Data attribute representing the index
      // cell.setAttribute('data-index', i)
      cell.dataset.index = i

      // Append to grid
      grid.appendChild(cell)

      // Push cell into cells array
      cells.push(cell)
    }
  }


  // audio 
  // Intro
  const introSound = document.querySelector('#intro')
  const introButton = document.querySelector('#play-button')

  function playIntro() {
    introSound.play()
    // console.log('click')
  }


  introButton.addEventListener('click', playIntro)



  // Main
  const mainSound = document.querySelector('#main')
  function playMain() {
    mainSound.play()
  }

  function stopMain() {
    mainSound.pause()
  }
  createGrid()

  // End Game

  let gameEnd = false
  const gameGrid = document.querySelector('.grid')
  const endGameWrapperLoss = document.querySelector('#endGame-wrapper-loss')
  let alienRocketMovementInterval
  const endGameWrapperWin = document.querySelector('#endGame-wrapper-win')

  function endGame() {
    cells.forEach(cell => cell.classList.remove('alienRocket'))
    cells.forEach(cell => cell.classList.remove('alien'))
    cells.forEach(cell => cell.classList.remove('rocket'))
    cells.forEach(cell => cell.classList.remove('spaceShip'))
    clearInterval(alienMovesOne)
    clearInterval(alienRocketMovementInterval)
    clearInterval(alienRocketBegin)
    gameEnd = true
    stopMain()
    playIntro()

  }

  // Restart

  function restart() {
    // console.log('listened to')
    gameEnd = false
    gameGrid.style.display = 'flex'
    endGameWrapperLoss.style.display = 'none'
    endGameWrapperWin.style.display = 'none'
    dropAlienRocket()
    lives = 3
    livesCounter.innerHTML = lives
    score = 0
    scoreBoard.innerHTML = score
    currentPosition = alienStartingPosition
    swarmMovementIntervals()
    playerPosition = playerStart
    removePlayer(playerPosition)
    addPlayer(playerStart)
  }

  const playAgainLoss = document.getElementById('restart-loss')
  playAgainLoss.addEventListener('click', restart)
  playAgainLoss.addEventListener('click', playMain)

  const playAgainWin = document.getElementById('restart-win')
  playAgainWin.addEventListener('click', restart)
  playAgainWin.addEventListener('click', playMain)




  // Player starting position
  const playerStart = Math.floor(cellCount - width / 2)
  let playerPosition = playerStart
  addPlayer(playerStart)

  // * Variables
  const alienSetUps = {
    0: [30, 50, 51, 52, 53, 70, 71, 72, 90, 91, 31, 32, 33, 95, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 124, 125, 126, 127, 128, 129, 130, 133, 134, 135, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175],
    1: [146, 147, 148, 154, 155, 156, 134, 135, 136, 116, 96, 97, 76, 77, 56, 57, 36, 37, 35, 55, 75, 34, 54, 33, 66, 67, 46, 47, 26, 27, 28, 29, 30, 49, 48, 67, 95, 94, 93, 92, 112, 132, 152, 172, 173, 174, 175, 176, 125, 126, 127, 107, 87, 86, 85, 84, 83, 103, 123, 143, 163, 164, 165, 166, 167, 69, 70, 71, 91, 111, 110, 109, 108, 107, 127, 128, 129, 130, 131],
    2: [49, 29, 9, 10, 11, 12, 13, 30, 31, 32, 33, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 143, 144, 145, 146, 147, 148, 149, 140, 142, 163, 164, 165, 166, 183, 184, 185, 150, 151, 152, 153, 170, 171, 172, 190, 191, 210, 203],
  }
  const alienStartingPosition = alienSetUps[Math.floor(Math.random() * 2)]
  // const alienStartingPosition = alienSetUps[2]
  let currentPosition = alienStartingPosition



  // ! Scoring
  let score = 0

  const scoreBoard = document.getElementById('score')

  scoreBoard.innerHTML = score



  // ! Player's Lives
  let lives = 3

  const livesCounter = document.getElementById('lives')

  livesCounter.innerHTML = lives

  // ! Player Movement





  // Executions

  function playerLeft(position) {
    if (position % width === 0) {
      return true
    } else {
      return false
    }

  }

  function playerRight(position) {
    if (position % width === width - 1) {
      return true
    } else {
      return false
    }
  }
  function addPlayer(position) {
    cells[position].classList.add('spaceShip')
  }

  function removePlayer(position) {
    cells[position].classList.remove('spaceShip')

  }
  function movePlayer(e) {
    // console.log('keydown')
    const right = 39
    const left = 37

    function moveRight() {
      removePlayer(playerPosition)
      playerPosition++
      addPlayer(playerPosition)
    }

    function moveLeft(){
      removePlayer(playerPosition)
      playerPosition--
      addPlayer(playerPosition)
    }

    if (e.keyCode === 39 && playerRight(playerPosition) === false) {
      // console.log('right')
      // setTimeout(moveRight,200)
      moveRight()

    } else if (e.keyCode === 37 && playerLeft(playerPosition) === false) {
      // console.log('left')
      // setTimeout(moveLeft,200)
      moveLeft()
    } else {
      // console.log('nope')
    }
  
  }


  // Events
  document.addEventListener('keyup', movePlayer)


  // ! Player Rocket Fire


  // Element



  // Execution
  function addRocket(position) {
    cells[position].classList.add('rocket')
  }
  function removeRocket(position) {
    cells[position].classList.remove('rocket')
  }
  function rocketHitsTop(position) {
    if (position <= width) {
      // console.log('top')
      return true
    } else {
      // console.log('bottom')
      return false
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


  // barriers

  // function createBarrier(position) {
  //   cells[position].classList.add('barrier')
  // }

  // function removeBarrier(position) {
  //   cells[position].classList.remove('barrier')
  // }

  // const barrierStart = [304,305,306,311,312,316]

  // function barrierSet () {
  //   barrierStart.forEach( start => {
  //     createBarrier(start)
  //   })
  // }

  // interval for rocket collisions





  // Event
  document.addEventListener('keydown', rocketFired)

  // ! Alien Movement

  // Add/remove function

  function addAlien(position) {
    position.forEach(index => {
      cells[index].classList.add('alien')
    })
  }
  function removeAlien(position) {
    position.forEach(index => {
      cells[index].classList.remove('alien')
    })
  }

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
    return !swarm.some(alien => {
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
        // console.log('not')
        return false
      } else {
        // console.log('bottom')
        return true
      }
    })
  }


  function moveSwarm(movement) {
    removeAlien(currentPosition)
    const move = currentPosition.map(alien => {
      return alien + movement
    })
    currentPosition = move
    addAlien(currentPosition)
  }

  let alienMovesOne

  function swarmMovementIntervals() {
    let movingLeft
    alienMovesOne = setInterval(() => {
      if (!hitBottom(currentPosition)) {
        if (movingLeft) {
          if (checkLeft(currentPosition)) {
            // console.log('can move left')
            moveSwarm(-1)
          } else {
            // console.log('cant move left')
            movingLeft = false
            moveSwarm(width)
          }
        } else {
          if (checkRight(currentPosition)) {
            // console.log('can move right')
            moveSwarm(1)
          } else {
            // console.log('cant move right')
            moveSwarm(width)
            movingLeft = true
          }
        }
      } else {
        // console.log('bottom hit')
        endGame()
        endGameWrapperLoss.style.display = 'flex'
        const endScoreLoss = document.querySelector('#final-score-loss')
        endScoreLoss.innerText = score
      }
    }, 500)
  }

  // ! Alien Rockets


  function addAlienRocket(position) {
    cells[position].classList.add('alienRocket')
  }

  function removeAlienRocket(position) {
    cells[position].classList.remove('alienRocket')
  }

  const start = document.querySelector('#start')
  let alienRocketPosition

  let alienRocketBegin
  function dropAlienRocket() {
    addAlien(alienStartingPosition)
    // remove default behaviour and start box
    start.blur()
    const startbox = document.querySelector('#start-spiral')
    startbox.style.display = 'none'
    const alienRocketBegin = setInterval(() => {

      const randomIndex = Math.floor(Math.random() * (alienStartingPosition.length))
      let alienRocketPosition = currentPosition[randomIndex]
      addAlienRocket(alienRocketPosition)
      if (gameEnd) {
        clearInterval(alienRocketBegin)
      }
      const alienRocketMovementInterval = setInterval(() => {
        if (gameEnd) {
          clearInterval(alienRocketMovementInterval)
        } else if (playerPosition === alienRocketPosition) {
          lives--
          livesCounter.innerHTML = lives
          clearInterval(alienRocketMovementInterval)
          removeAlienRocket(alienRocketPosition)
          removePlayer(playerPosition)
          setTimeout(addPlayer(playerPosition),100)
        } else if (alienRocketPosition + width >= cellCount) {
          clearInterval(alienRocketMovementInterval)
          removeAlienRocket(alienRocketPosition)
        } else {
          removeAlienRocket(alienRocketPosition)
          alienRocketPosition += width
          addAlienRocket(alienRocketPosition)
        }
        if (lives === 0) {
          endGame()
          endGameWrapperLoss.style.display = 'flex'
          const endScoreLoss = document.querySelector('#final-score-loss')
          endScoreLoss.innerText = score
        }
        // cells.forEach(cell => {
        //   if (cell.classList.contains('barrier') && cell.classList.contains('alienRocket')) {
        //     console.log('hitalien')
        //     removeAlienRocket(alienRocketPosition)
        //     removeBarrier(alienRocketPosition)
        //     clearInterval(alienRocketMovementInterval)
        //   }
        // })
      }, 100)

    }, 500)

  }

  // Event
  start.addEventListener('click', dropAlienRocket)
  start.addEventListener('click', swarmMovementIntervals)
  start.addEventListener('click', playMain)
  // start.addEventListener('click', barrierSet )
}


window.addEventListener('DOMContentLoaded', init)
