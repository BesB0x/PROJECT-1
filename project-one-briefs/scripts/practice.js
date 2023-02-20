function init () {

  // generate grid

  const grid = document.querySelector('.grid')

  const width = 10
  const cellCount = width * width
  
  // Variables
  const cells = []


  function createGrid (){
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cell.innerText = i
      cell.setAttribute('data-index', i)
      cells.push(cell)
    }
  }
  createGrid()
}

window.addEventListener('DOMContentLoaded',init) 