function init() {


  // Create Grid
  const grid = document.querySelector('.grid')
  const width = 20
  const cellCount = width * width
  const cells = []

  function createGrid() {
    // Using the total cell count we've saved to a variable we're going to use a for loop to iterate that many times
    for (let i = 0; i < cellCount; i++) {
      console.log('CELL CREATED')
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
  const mainSound = document.querySelector('#main-sound')
  

  function playMain() {
    mainSound.play
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
    gameEnd = true
    endGameWrapperLoss.style.display = 'flex'
    // gameGrid.style.display = 'none'
    clearInterval(alienMovesOne)
    clearInterval(alienRocketMovementInterval)
    const endScore = document.getElementById('final-score-loss')
    endScore.innerText = score
  }
  let alienRocketPosition

  // Restart

  function restart() {
    console.log('listened to')
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

  const playAgainWin = document.getElementById('restart-win')
  playAgainWin.addEventListener('click', restart)




  // Player starting position
  const playerStart = Math.floor(cellCount - width / 2)
  let playerPosition = playerStart
  addPlayer(playerStart)

  // * Variables
  const alienSetUps = {
    0: [31, 32, 33, 34, 35],
    1: [31, 32, 33, 34, 35],
    2: [31, 32, 33, 34, 35],
    3: [31, 32, 33, 34, 35],
    4: [31, 32, 33, 34, 35],
    5: [31, 32, 33, 34, 35],
  }
  const alienStartingPosition = alienSetUps[Math.floor(Math.random() * 5)]
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

    removePlayer(playerPosition)

    if (e.keyCode === 39 && playerRight(playerPosition) === false) {
      // console.log('right')
      playerPosition++

    } else if (e.keyCode === 37 && playerLeft(playerPosition) === false) {
      // console.log('left')
      playerPosition--

    } else {
      // console.log('nope')
    }
    addPlayer(playerPosition)
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
  let rocketCurrentPosition
  function rocketFired(e) {
    e.preventDefault()
    if (e.keyCode === 32) {
      console.log(alienStartingPosition)
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
        cells.forEach(alienDead => {
          if (alienDead.classList.contains('rocket') && alienDead.classList.contains('alien')) {
            console.log(alienDead)
            alienDead.classList.remove('rocket')
            alienDead.classList.remove('alien')
            clearInterval(rocketInterval)
            const alienKilled = currentPosition.filter(safe => {
              return safe !== parseInt(alienDead.dataset.index)
            })
            console.log(currentPosition)
            currentPosition = alienKilled
            console.log(currentPosition)
            score += 100
            scoreBoard.innerHTML = score
          }
        })
        // Player Win

        if (score === parseInt(alienStartingPosition.length) * 100) {
          console.log('endgame')
          cells.forEach(cell => cell.classList.remove('alienRocket'))
          cells.forEach(cell => cell.classList.remove('alien'))
          cells.forEach(cell => cell.classList.remove('rocket'))
          cells.forEach(cell => cell.classList.remove('spaceShip'))
          clearInterval(alienMovesOne)
          clearInterval(alienRocketMovementInterval)
          clearInterval(alienRocketBegin)
          gameEnd = true
          endGameWrapperWin.style.display = 'flex'
          const endScore = document.getElementById('final-score-win')
          endScore.innerText = score
        }
      }, 500)

    }
  }



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
        console.log('not')
        return false
      } else {
        console.log('bottom')
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
    if (!hitBottom(currentPosition)) {
      alienMovesOne = setInterval(() => {

        if (movingLeft) {
          if (checkLeft(currentPosition)) {
            console.log('can move left')
            moveSwarm(-1)
          } else {
            console.log('cant move left')
            movingLeft = false
            moveSwarm(width)
          }
        } else {
          if (checkRight(currentPosition)) {
            console.log('can move right')
            moveSwarm(1)
          } else {
            console.log('cant move right')
            moveSwarm(width)
            movingLeft = true
          }
        }
      }, 500)
    } else {
      gameEnd()
    }
  }

  // ! Alien Rockets


  function addAlienRocket(position) {
    cells[position].classList.add('alienRocket')
  }

  function removeAlienRocket(position) {
    cells[position].classList.remove('alienRocket')
  }

  const start = document.querySelector('#start')


  // explosion animation

  function explosion() {
    cells[playerPosition].classList.remove('explosion')
    addPlayer(playerPosition)
  }
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
          // cells[playerPosition].classList.add('explosion')
          setTimeout(explosion(),500)
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
        }
      }, 200)

    }, 5000)

  }

  // Event
  start.addEventListener('click', dropAlienRocket)
  start.addEventListener('click', swarmMovementIntervals)
  start.addEventListener('click', playIntro)
}
const introSound = document.querySelector('#intro-sound')
function playIntro() {
  introSound.play
}

window.addEventListener('DOMContentLoaded', init)
