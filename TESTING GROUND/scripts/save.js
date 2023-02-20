    // removeCat()
    if (hitsBottom(currentPosition) === false) {
      dropped = false
      dropLeft = false
      // reset = true
      console.log('running')
      if ( hitsRight(currentPosition) === false && hitsLeft(currentPosition) === false ) {
        alienMovesRight = setInterval(() => {
          console.log('right move')
          console.log(currentPosition)
          // reset = false
          dropLeft = false
          // console.log(hitsRight(currentPosition))
          moveSwarm(1)
        },50)
      } else  {
        alienMovesLeft = setInterval(() => {
          console.log('left move')
          console.log(currentPosition)
          reset = false
          dropRight = false
          // console.log(hitsRight(currentPosition))
          moveSwarm(-1)
        },1000)
      }
      


    } else if (hitsBottom(currentPosition) === true){
      console.log('bottom hit!')
      clearInterval(alienMovesRight)
    }



    console.log('hehe')








        // removeCat()
        if (hitsBottom(currentPosition)) {
          alienMovesRight = setInterval(() => {
            dropped = false
            reset = true
            if (hitsRight(currentPosition) === false) {
              console.log('interval start')
              console.log('right move')
              console.log(currentPosition)
              // console.log(hitsRight(currentPosition))
              moveSwarm(1)
            } else {
              console.log('from drop' + currentPosition)
              dropped = true
              console.log('drop1')
              clearInterval(alienMovesRight)
              moveSwarm(10)
            }
          }, 1000)
          alienMovesLeft = setInterval(() => {
            console.log('testing')
            if (hitsLeft(currentPosition) === false && dropped) {
              console.log('next interval' + currentPosition)
              moveSwarm(-1)
              movingLeft = true
            } else if (hitsLeft(currentPosition) === true && dropped && movingLeft) {
              console.log('found')
              clearInterval(alienMovesLeft)
              moveSwarm(10)
              reset = true
            }
          }, 1000)
    
    
    
        }
      }