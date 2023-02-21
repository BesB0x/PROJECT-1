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


  // Player starting position
  const playerStart = 94
  let playerPosition = playerStart
  addPlayer(playerStart)


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


  let rocketFlies
  let rocketCurrentPosition
  // let rocketInterval
  let rocketIntervalTwo
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

  function rocketMovementFunction() {

    if (rocketHitsTop(rocketCurrentPosition) === false) {
      removeRocket(rocketCurrentPosition)
      const move = rocketCurrentPosition - width
      rocketCurrentPosition = move
      addRocket(rocketCurrentPosition)
      alienHitByRocket(alienStartingPosition)

    } else if (rocketHitsTop(rocketCurrentPosition)) {
      removeRocket(rocketCurrentPosition)
      clearInterval(rocketInterval)
    }
  }
  let rocketInterval
  function rocketFired(e) {

    if (e.keyCode === 32) {

      console.log(alienStartingPosition)
      const rocketStartPosition = playerPosition - width
      rocketCurrentPosition = rocketStartPosition
      addRocket(rocketCurrentPosition)
      // if (!rocketInterval) {
      //   console.log('interval')
      rocketInterval = setInterval(rocketMovementFunction, 400)

      // } 

    }
  }

  // function rocketFired(e) {
  //   clearInterval(rocketInterval)

  //   if (e.keyCode === 32) {
  //     const rocketStartPosition = playerPosition - width
  //     rocketCurrentPosition = rocketStartPosition
  //     console.log('rocket posish', rocketCurrentPosition)
  //     addRocket(rocketCurrentPosition)
  //     rocketInterval = setInterval(() => {
  //       const y = Math.floor(rocketCurrentPosition / width)
  //       if (y === 0) {
  //         removeRocket(rocketCurrentPosition)
  //       } else {
  //         removeRocket(rocketCurrentPosition)
  //         rocketCurrentPosition -= width
  //         addRocket(rocketCurrentPosition)
  //         alienHitByRocket(alienStartingPosition)
  //       }
  //     }, 500)

  //   } else if (e.keyCode === 39 || e.keyCode === 37){
  //     console.log('not space')
  //   }
  //   console.log(rocketCurrentPosition)
  //   // removeRocket(rocketCurrentPosition)
  // }

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
  let randomIndex

  function addAlienRocket(position) {
    cells[position].classList.add('rocket')
  }

  function removeAlienRocket(position) {
    cells[position].classList.remove('rocket')
  }

  const start = document.querySelector('#start')
  let alienRocketPosition
  let alienRocketStart

  function dropAlienRocket() {
    setInterval(() => {
      randomIndex = Math.floor(Math.random() * (alienStartingPosition.length))
      console.log(randomIndex)
      alienStartingPosition.forEach(alien => {
        if (alienStartingPosition.indexOf(alien) === 1) {
          const alienRocketStart = alien
          addAlienRocket(alienRocketStart)
          alienRocketPosition = alienRocketStart
          console.log(alienRocketPosition, alienRocketStart)
        }
      })
      const alienRocketMovementInterval = setInterval(() => {
        console.log(rocketCurrentPosition + width > cellCount)
        if (rocketCurrentPosition + width > cellCount) {
          removeAlienRocket(alienRocketPosition)
          clearInterval(alienRocketMovementInterval)
        } else {
          removeAlienRocket(alienRocketPosition)
          // const rocketMove = alienRocketPosition + width
          alienRocketPosition += width
          addAlienRocket(alienRocketPosition)
        }
      }, 1000)

    }, 1000)


    //   console.log('rndm index inside interval', randomIndex)
    //   if (alienRocketPosition + width > cellCount) {
    //     removeAlienRocket
    //     clearInterval(alienRocketMovementInterval)
    //   } else {
    //     alienRocketPosition = alienRocketStart
    //     removeAlienRocket(alienRocketPosition)
    //     const rocketMove = alienRocketPosition + width
    //     alienRocketPosition = rocketMove
    //     addAlienRocket(alienRocketPosition)
    //   }


  }

  // Event
  start.addEventListener('click', dropAlienRocket)

  // ! Collisions

  function alienHitByRocket(array) {
    deadAlien = array.filter(dead => {
      return dead === rocketCurrentPosition
    })
    deadAlien = Number(deadAlien)

    alienStartingPosition.forEach(alien => {
      if (alien === deadAlien) {
        killAlien(alien)
        removeRocket(alien)
        clearInterval(rocketInterval)
        alienStartingPosition = alienStartingPosition.filter(alien => {
          if (alien !== deadAlien) {
            return alien
          }
        })
      }
    })
    console.log(alienStartingPosition)
  }

  // console.log(rocketCurrentPosition)
  // alienHitByRocket()


  // alienStartingPosition.forEach( alien => {
  //   if (alien !== rocketCurrentPosition) {

  //   }
  // })

}

window.addEventListener('DOMContentLoaded', init)