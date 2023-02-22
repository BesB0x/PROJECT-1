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
      cell.innerText = i

      // Data attribute representing the index
      // cell.setAttribute('data-index', i)
      cell.dataset.index = i

      // Append to grid
      grid.appendChild(cell)

      // Push cell into cells array
      cells.push(cell)
    }
  }

  createGrid()

  // End Game

  let gameEnd = false
  const gameGrid = document.querySelector('.grid')
  const endGameWrapper = document.querySelector('.endGame-wrapper')

  function endGame() {
    gameEnd = true
    endGameWrapper.style.display = 'flex'
    gameGrid.style.display = 'none'
  }

  // Restart

  function restart() {
    gameEnd = false
    gameGrid.style.display = 'flex'
    endGameWrapper.style.display = 'none'
    dropAlienRocket
  }

  const playAgain = document.getElementById('restart')
  playAgain.addEventListener('click', restart)





  // ! Stars and galaxies assigned
  // function setStars() {
  //   for (let i = 0; i !== alienStartingPosition && i !== playerPosition; i++) {
  //     cells[Math.floor(Math.random() * cellCount)].classList.add('star')
  //   }
  // }


  // Player starting position
  const playerStart = Math.floor(cellCount - width / 2)
  let playerPosition = playerStart
  addPlayer(playerStart)

  // * Variables
  const alienSetUps = {
    0: [30, 40, 50, 60, 70, 80, 90, 100, 110],
    1: [35, 45, 55, 65, 75, 85, 95, 15, 115],
    2: [39, 49, 59, 69, 79, 89, 99, 19, 119],
    3: [50, 60, 50, 60, 70, 80, 90, 100, 110],
    4: [30, 40, 50, 90, 70, 80, 100, 120, 110],
    5: [30, 40, 50, 60, 70, 80, 90, 100, 110],
  }
  let alienStartingPosition = alienSetUps[Math.floor(Math.random() * 5)]


  let currentPosition = alienStartingPosition
  // let alienCurrentPosition = alienStartingPosition
  // start.addEventListener('click', randomIndexSetUp )

  // setStars()




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
  document.addEventListener('keydown', movePlayer)


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
            const alienKilled = alienStartingPosition.filter(safe => {
              return safe !== parseInt(alienDead.dataset.index)
            })
            console.log(alienStartingPosition)
            alienStartingPosition = alienKilled
            console.log(alienStartingPosition)
            score += 100
            scoreBoard.innerHTML = score
          }
        })
      }, 400)

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
    removeAlien(currentPosition)
    const move = currentPosition.map(alien => {
      return alien + movement
    })
    currentPosition = move
    // console.log(currentPosition)
    addAlien(currentPosition)
  }

  // Macro function

  function swarmMovementIntervals() {
    let dropped
    let reset
    let alienMovesOne
    let alienMovesTwo
    let movingLeft


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



  // function killAlien(position) {
  //   cells[position].classList.remove('alien')

  // }

  addAlien(alienStartingPosition)

  // ! Alien Rockets


  function addAlienRocket(position) {
    cells[position].classList.add('alienRocket')
  }

  function removeAlienRocket(position) {
    cells[position].classList.remove('alienRocket')
  }

  const start = document.querySelector('#start')



  function dropAlienRocket() {
    start.blur()
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
          clearInterval(alienRocketMovementInterval)
          lives--
          livesCounter.innerHTML = lives
          removeAlienRocket(alienRocketPosition)
          removePlayer(playerPosition)
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
      }, 300)

    }, 3000)

  }

  // Event
  start.addEventListener('click', dropAlienRocket)
  start.addEventListener('click', swarmMovementIntervals)


  // ! Collisions


  // if cell has class of both player rocket and alien
  //  remove both classes, and take that alien out the alien array.





  // function alienHitByRocket(array) {
  //   deadAlien = array.filter(dead => {
  //     return dead === rocketCurrentPosition
  //   })
  //   deadAlien = Number(deadAlien)

  //   alienStartingPosition.forEach(alien => {
  //     if (alien === deadAlien) {
  //       killAlien(alien)
  //       removeRocket(alien)
  //       score += 100
  //       scoreBoard.innerHTML = score
  //       clearInterval(rocketInterval)
  //       alienStartingPosition = alienStartingPosition.filter(alien => {
  //         if (alien !== deadAlien) {
  //           return alien
  //         }
  //       })
  //     }
  //   })
  //   console.log(alienStartingPosition)
  // }


}

window.addEventListener('DOMContentLoaded', init)