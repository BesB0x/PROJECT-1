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
  const playerStart = [94]
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

    if (e.keyCode === 39 && playerRight(playerPosition) === false ) {
      console.log('right')
      playerPosition++
      
    } else if (e.keyCode === 37 && playerLeft(playerPosition) === false) {
      console.log('left')
      playerPosition --
      
    } else {
      console.log('nope')
    }
    addPlayer(playerPosition)
  }


  // Events
  document.addEventListener('keydown', movePlayer)


  // ! Player Rocket Fire


  // Element
  const rocketStartPosition = parseInt(playerPosition) - parseInt(width)
  let rocketCurrentPosition 
  let rocketFlies
  // Execution
  function addRocket (position) {
    cells[position].classList.add('rocket')
  }
  function removeRocket (position) {
    cells[position].classList.remove('rocket')
  }
  
  function rocketFired(e) {
    if (e.keyCode === 32) {
      rocketCurrentPosition = rocketStartPosition 
      console.log('rocket start' ,rocketStartPosition)
      addRocket( rocketCurrentPosition)
      console.log('rocket current' ,rocketCurrentPosition)
      console.log('player position', playerPosition)
      rocketFlies = setInterval(() => {
        removeRocket(rocketCurrentPosition)
        const move = rocketCurrentPosition - width
        rocketCurrentPosition = move
        addRocket(rocketCurrentPosition)
        // rocketPosition = rocketStartPosition - width
        // removeRocket(rocketPosition)
        // rocketPosition = rocketPosition - width
        // addRocket(rocketPosition)
        // console.log(rocketPosition , width)
      },500)
    }
  }

  // Event
  document.addEventListener('keydown', rocketFired)
}

window.addEventListener('DOMContentLoaded', init)