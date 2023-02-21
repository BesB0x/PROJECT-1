function init() {


  // Create Grid
  const grid = document.querySelector('.grid')
  const width = 10
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



  // ! Scoring
  let score = 0

  const scoreBoard = document.getElementById('score')

  scoreBoard.innerHTML = score

  // ! Player's Lives
  let lives = 3

  const livesCounter = document.getElementById('lives')

  livesCounter.innerHTML = lives

  // ! Player Movement


  // Player starting position
  const playerStart = Math.floor(cellCount - width / 2)
  let playerPosition = playerStart
  addPlayer(playerStart)


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
    console.log('keydown')
    const right = 39
    const left = 37

    removePlayer(playerPosition)

    if (e.keyCode === 39 && playerRight(playerPosition) === false) {
      console.log('right')
      playerPosition++

    } else if (e.keyCode === 37 && playerLeft(playerPosition) === false) {
      console.log('left')
      playerPosition--

    } else {
      console.log('nope')
    }
    addPlayer(playerPosition)
  }


  // Events
  document.addEventListener('keydown', movePlayer)


  // ! Player Rocket Fire


  // Element

  let deadAlien

  // Execution
  function addRocket(position) {
    cells[position].classList.add('rocket')
  }
  function removeRocket(position) {
    cells[position].classList.remove('rocket')
  }
  function rocketHitsTop(position) {
    if (position <= width) {
      console.log('top')
      return true
    } else {
      console.log('bottom')
      return false
    }
  }

  function rocketFired(e) {

    if (e.keyCode === 32) {
      console.log(alienStartingPosition)
      let rocketCurrentPosition = playerPosition - width
      addRocket(rocketCurrentPosition)
      const rocketInterval = setInterval(() => {
        if (rocketHitsTop(rocketCurrentPosition) === false) {
          removeRocket(rocketCurrentPosition)
          rocketCurrentPosition -= width
          addRocket(rocketCurrentPosition)
          // alienHitByRocket(alienStartingPosition)
    
        } else if (rocketHitsTop(rocketCurrentPosition) ) {
          removeRocket(rocketCurrentPosition)
          clearInterval(rocketInterval)
        }
      }, 400)


    }
  }



  // Event
  document.addEventListener('keydown', rocketFired)

  // ! Alien Movement

  // * Variables
  let alienStartingPosition = [30, 35, 36]
  // let AliencurrentPosition = alienstartingPosition


  // Add/remove functions

  function addAlien(position) {
    position.forEach(index => {
      cells[index].classList.add('alien')
    })
  }


  function killAlien(position) {
    cells[position].classList.remove('alien')

  }

  addAlien(alienStartingPosition)

  // ! Alien Rockets

  // random number between 0 and Swarm length -1
  // setInterval, 5000:
  // random number generated
  // forEach, if random number === index of alien, add rocket class beneath that alien
  // if (collision)
  // collision function
  // else if (rocket hits bottom)
  // remove class, clear interval
  // else {
  // move down screen

  // Elements
  // let randomIndex

  function addAlienRocket(position) {
    cells[position].classList.add('alienRocket')
  }

  function removeAlienRocket(position) {
    cells[position].classList.remove('alienRocket')
  }

  const start = document.querySelector('#start')
  


  function dropAlienRocket() {
    start.blur()
    console.log('dropalienrocket')
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * (alienStartingPosition.length))
      let alienRocketPosition = alienStartingPosition[randomIndex]
      addAlienRocket(alienRocketPosition)
      const alienRocketMovementInterval = setInterval(() => {
        // console.log(alienRocketPosition + width > cellCount)
        if (playerPosition === alienRocketPosition) {
          // console.log('hit')
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
      }, 500)

    }, 3600)


  }

  // Event
  start.addEventListener('click', dropAlienRocket)

  // ! Collisions

  // function playerHitByRocket() {
  //   if (playerPosition === alienRocketPosition) {
  //     console.log('hit')
  //   }

  // }

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