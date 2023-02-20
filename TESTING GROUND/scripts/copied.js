// function init() {

//   // ! Generating a grid
//   const grid = document.querySelector('.grid')

//   const width = 10
//   const cellCount = width * width

//   // Variables
//   const startingPosition = 0
//   let currentPosition = startingPosition
//   const cells = []

//   // ! Create Grid

//   function createGrid(){
//     // Using the total cell count we've saved to a variable we're going to use a for loop to iterate that many times
//     for (let i = 0; i < cellCount; i++){
//       console.log('CELL CREATED')
//       // Create div cell
//       const cell = document.createElement('div')

//       // Add index as innerText
//       cell.innerText = i

//       // Data attribute representing the index
//       // cell.setAttribute('data-index', i)
//       cell.dataset.index = i

//       // Append to grid
//       grid.appendChild(cell)

//       // Push cell into cells array
//       cells.push(cell)
//     }
//     addCat(startingPosition)
//   }


//   // ! Executions

//   function addCat(position){
//     cells[position].classList.add('cat')
//   }

//   function removeCat(){
//     cells[currentPosition].classList.remove('cat')
//   }

//   function moveCat(e){
//     const right = 39
//     const left = 37
//     const up = 38
//     const down = 40

//     removeCat()

//     // Right
//     if (e.keyCode === right && currentPosition % width !== width - 1){
//       console.log('CLICKED RIGHT ARROW')
//       currentPosition++ // Add one to curentPosition if moving right
//     } else if (e.keyCode === left && currentPosition % width !== 0){
//       console.log('CLICKED LEFT ARROW')
//       currentPosition--
//     } else if (e.keyCode === up && currentPosition >= width){
//       console.log('CLICKED UP ARROW')
//       currentPosition -= width
//     } else if (e.keyCode === down && currentPosition + width < cellCount){
//       console.log('CLICKED DOWN ARROW')
//       currentPosition += width
//     } else {
//       console.log('KEY INVALID')
//     }
//     console.log(currentPosition % width)
//     addCat(currentPosition)
//   }



//   // ! Events
//   document.addEventListener('keydown', moveCat)


//   // ! Page Load
//   createGrid()
  
// }

// window.addEventListener('DOMContentLoaded', init)
