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
  let rocketInterval

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
      const rocketStartPosition = playerPosition - width
      rocketCurrentPosition = rocketStartPosition
      addRocket(rocketCurrentPosition)
      if (!rocketInterval) {
        console.log('interval')
        rocketInterval = setInterval(rocketMovementFunction,500)
      } 

    }
  }

  function rocketMovementFunction () {
    if (rocketHitsTop(rocketCurrentPosition) === false) {
      removeRocket(rocketCurrentPosition)
      const move = rocketCurrentPosition - width
      rocketCurrentPosition = move
      addRocket(rocketCurrentPosition)
    } else if (rocketHitsTop(rocketCurrentPosition)) {
      removeRocket(rocketCurrentPosition)
      clearInterval(rocketInterval)
    }
  }




  // Event
  document.addEventListener('keydown', rocketFired)
}

window.addEventListener('DOMContentLoaded', init)