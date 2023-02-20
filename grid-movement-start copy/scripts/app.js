function init() {

  // ! Generating a grid
  const grid = document.querySelector('.grid')

  const width = 10
  const cellCount = width * width

  // Variables
  const startingPosition = [0, 1, 2, 3, 4, 5, 6]
  let currentPosition = startingPosition
  const cells = []
  // console.log(currentPosition)
  // variables for swarm movement
  let alienMovesOne
  let alienMovesTwo
  let dropped
  let movingLeft
  let reset


  // ! Create Grid

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
    addCat(startingPosition)
  }


  // ! Executions

  function addCat(position) {
    position.forEach(index => {
      cells[index].classList.add('cat')
    })

    // cells[parseInt(position) + 1].classlist.add('cat')
  }

  function removeCat(position) {
    position.forEach(index => {
      cells[index].classList.remove('cat')
    })

  }







  // function rocketCat() {
  //   let startingPosition = parseInt(currentPosition) + 10
  //   console.log(startingPosition)
  //   let newPosition
  //   cells[startingPosition].classList.add('cat')
  //   setInterval(() => {
  //     newPosition = startingPosition + 10
  //     startingPosition = newPosition
  //   }, 200)
  // }

  // function catShoot(e) {
  //   if (e.keyCode === 39) {
  //     console.log('CLICKED RIGHT ARROW')
  //     rocketCat()
  //   }
  // }

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

  // hitBottom(currentPosition)
  // console.log(hitBottom(currentPosition))

  function moveSwarm(movement) {
    // console.log('moving')
    removeCat(currentPosition)
    const move = currentPosition.map(cat => {
      return cat + movement
    })
    currentPosition = move
    // console.log(currentPosition)
    addCat(currentPosition)
  }

  // Macro function

  function moveCat() {
    const right = 39
    const left = 37
    const up = 38
    const down = 40

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
      // alienMovesTwo = setInterval( () => {
      //   moveSwarm(-1)
      // })


    }


    // if ( checkRight(currentPosition) === false && checkLeft(currentPosition)) {
    //   const = setInterval()
    //   moveSwarm(-1)
    // }
    // // if (dropped === true) {
    // console.log('reached')
    // alienMovesTwo = setInterval(() => {
    //   if (checkLeft(currentPosition) === false) {
    //     (console.log('left move'))
    //     moveSwarm(-1)
    //   } else {
    //     console.log('drop2')
    //     console.log(checkLeft(currentPosition))
    //     moveSwarm(10)
    //     clearInterval(alienMovesTwo)
    //   }
    // }, 1000)

    // } else {
    console.log('hehe')
    // }
  }



  // alienMovesTwo = setInterval( () => {
  //   if ( checkLeft(currentPosition)) {
  //     console.log('left move')
  //     moveSwarm(-1)
  //   } else {
  //     console.log('drop2')
  //     moveSwarm(10)
  //     clearInterval(alienMovesTwo)
  //   }
  // }, 1000)



  //   if (e.keyCode === left ){
  //     console.log('CLICKED LEFT ARROW')
  //     const remove  = currentPosition.filter( safe => {
  //       return safe !== currentPosition[2]
  //     })
  //     currentPosition = remove
  //   }
  // }
  //     } else if (some(modulus === width - 1) {
  //       move down 1
  //       move left
  //     } else if ( some(modulus === 0)) {
  //       move down 1
  //       move right
  //     } if (hitsBottom) {
  //       endGame()
  //     }



  const start = document.getElementById('start')
  // ! Events
  start.addEventListener('click', moveCat)
  // document.addEventListener('keydown', moveCat)


  // ! Page Load
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)
