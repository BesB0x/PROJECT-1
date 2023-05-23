# SEI Project 1: Space-Invaders

## Overview
This was my first project on General Assembly’s Software Engineering Immersive course. The purpose of this task was to combine everything we’d learned about in the 3 weeks prior, which was HTML, CSS, and JavaScript. We were given a choice of a selection of arcade-style games ranging from snake to Pacman to Minesweeper, each presenting interesting problems to solve. I chose Space Invaders. It felt like a good balance of complexity and achievability, for me .

## Brief
“Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.
 
The player can only move left or right. The aliens also move from left to right, and also down each time they reach the side of the screen. The aliens also periodically drop bombs towards the player.
 
Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.”
 
Requiremnents: 

* The player should be able to clear at least one wave of aliens.
* The players score should be displayed at the end of the game.

## Deployment
<a href='https://besb0x.github.io/PROJECT-1/' > Fight The Space-Invaders</a>

## Timeframe

Timeframe : One Week
 
Working Team: Solo project


## Technologies used:

CSS
HTML
JavaScript
Java
Excalidraw
Processing 4.0
Ableton Live


## Installation

git Clone and you're good to go!

## Planning

Before starting, I broke the project down into three parts: rocket movement, alien movement, and collisions. The first two pretty much encompassed the whole project, but I had been warned in the brief that collisions were difficult and so thought it was worth paying extra attention to it. I also separately listed all variables and functions that I thought I would need. This process wasn’t intended to create a concrete structure of how I was going to build the game - I wanted to remain open to changing any parts of the logic as was necessary – the intention was more focussed on simply dividing this large concept so that I could grapple with it better in my head. As such I got four pieces of paper – one for each part and one for both variables and functions – and wrote down in pseudocode everything I thought was necessary to solve the problems.

## Build Process
### Timeline
The project was spread over 5 days, where the fifth day ended at the project deadline of 2pm :
 
 
#### Day 1
*   Implemented basic HTML and CSS.
*   Completed player movement.
*   Began player rocket movement.
*   Did a small amount of swarm movement, but moved away from it.
#### Day 2
*   Completed collisions.
*   Continued with rocket fire, moving into alien rockets.
#### Day 3
*   UI – advanced CSS and HTML work.
*   Swarm movement.
#### Day 4
*   Start and end game procedures.
*   Building the player, alien, and rockets in Processing 4.
*   Sound.
*   Bug fixing.
#### Day 5
*   Attempted to do barriers.
*   Created alien setups.

### Basic setup
 
 
*  	To make the grid on which the game would be constructed, I used a for loop to iterate as many times as my given width squared. In the loop, a div was created each iteration, given its index (the value of i) and then pushed into an array that began empty.
*  	For the Swarm, I simply used the index positions of the cells to map out three patterns of aliens, and then wrote a function that randomly decided which pattern would be used for that game.
*  	I attached the intervals for alien movement, alien rocket fire, and some audio to the start button, and this function for the end games (where stopMain and playIntro refer to audio), which clears the game-grid, all intervals, and stops the music for the game, as well as playing the sound for between games.

IMAGE

#### Swarm movement
 
My initial plan was to split this into two intervals: the first would send the swarm right until an alien hit the far right of the grid, at which point the interval would end and the aliens would be moved down the grid one cell. Then, a second interval would begin which moved the swarm left until an alien hit the far left. The interval would then stop, and the swarm would be moved down the grid one cell. This process would then repeat until an alien hit the bottom of the grid if there were no aliens left.
 
#### Adding/Removing Aliens
I used a forEach loop for both these, iterating through the array of cells, if I wanted to add an alien to the cell, a class of ‘alien’ – which contained CSS with a background-image of an alien – would be given to the cell, if I wanted to remove an alien, the class would be removed.
 
Checking if the swarm was at the far left or far right
I went about this with two different methods, but which ultimately mirrored each other. To check for hitting the far right I wrote a function that implemented the every() method and an if statement, saying ‘for every cell that has an alien, if the modulus of the width of the grid is not equal to the width minus one, then return true, else return false’. This meant that when an alien cell entered the last column of the grid, the function would return false.
For the left side I used the some() method with a bang operator attached to it in order to return the opposite Boolean that it would produce, and an if statement. The function said ‘if the modulus of the width of the grid for at least one cell that has an alien in it is equal to 0, return true, else return false’. I used the bang operator because I wanted the function to return true if the swarm had hit the far left.
 
#### Swarm Movement
The function that sat within the interval was as follows:

IMAGE

The final stage was to put all of this functionality within a larger if statement that checks for the swarm hitting the bottom. When I began doing this I realised that I hadn’t thought hard enough about how I would make this process loop back to the start when the swarm had hit the far left and dropped down a cell. At this point I think I should’ve taken a step back and assessed whether I had over complicated the process (which I had). I had a feeling that I had, and that I could encompass the process into a single interval and if statement, however, I wanted to see if I could figure it out this way. The main thing I tried to do was to link the statements using Booleans, making a step not run until the step before had been completed as the prior step would switch a globally set Boolean from false to true. This did work right up to the most important transition - getting from the end of the process back to the start! I struggled with this for a while to no avail, so eventually went to my instructor for help, who suggested to me that yes you can make this work by using a single if statement and interval. As soon as Joe said that it clicked in my brain how it would work and I very quickly was able to adjust my code. My impression of this process was that I wasn’t confident enough in my ability at combining if statements and intervals, and so overcomplicated things and therefore missed what the actual problems were in my code. I assumed that using Booleans the way I had was not the right idea, where actually it was a matter of unnecessarily splitting the function up. As soon as I was assured that it can be done more simply, I was given the confidence to consider it and figure it out! I was then also able to see how my use of Booleans was correct. Below is the final code:


IMAGE

#### Player Rockets
 
I managed to get a singular rocket firing from the player with relative ease, and the functionality didn’t change an awful lot from this point to making it work for multiple rockets being fired at the same time:
 
When spacebar is hit:
1.  Add a rocket to the cell above the player
2. 	Set Interval
3. 	If the game is over:

  * Clear interval
4. 	If the rocket hasn’t hit the top of the grid (if its current position is greater than or equal to width of the grid):
  * Move
5. 	Else :
  * Remove rocket
  * Clear interval
 
 
 
 However, I struggled with ensuring that multiple rockets fired wouldn’t interfere with their respective intervals. I realised early on that the problem to solve was how to allow the variable for the interval and the variable for the starting position to change its value each time they were called, so that when the spacebar is hit, a new interval is created, and it is created according to the new current position of the player. I simply couldn’t figure out how to make this happen! For the interval I tried putting in an if statement that checked for if the interval variable had already been created, and if not to define the variable. This didn’t work. I tried and tried and tried but this brick wall wasn’t budging. So I went to the instructor for guidance and he explained to me the vital importance of scope, and that was that! I have to say I expected to feel a little bit frustrated by how simple the fix was, but instead it was just massive satisfaction at fully understanding where I had gone wrong and how to change. This was a really big learning curve for me, and I now feel so much more confident with scope and also can appreciate how elegantly it can be used!
With this implemented I was able to move smoothly through player rocket movement, and added on conditions for hitting aliens and adding points:

IMAGE

#### Alien Rockets
 
With scope under my belt, coding the alien rockets went smoothly. The logic was pretty much identical apart from the fact that I had to set an interval for the execution of the function, and have it coming from a random place. Initially, I overcomplicated this process by using a forEach loop that looked like this:

IMAGE

This was another time when I felt as though this could be done differently, but I wanted to see this way through to the end. When I looked back later though, I did decide to refactor, to this:

IMAGE

The major problem that occurred with the rocket movement was peculiar. I seemingly had all intervals working nicely and all rockets moving as they should, until I fired lots of rockets from the player, at which point the alien rocket intervals would start doubling each time a rock hit the top. This was very confusing and I struggled with it for a long time, eventually putting the problem down and working on other parts of the project. I returned to it with my instructor who realised that because I was using a start button to start the interval for the alien rockets, that button was focused and so clicked every time I hit the spacebar from that point. Checking the default behaviour of keys and other things like that will now be something I do every time from now on!
 
#### Collisions
 
There were two collisions that I accounted for: a player rocket hitting an alien, and an alien rocket hitting the player. I wanted to include detecting when a player rocket and alien rocket collide, and collisions connected to barriers, but I ran out of time.
 
##### Player rocket hitting alien
 
To detect this, within the interval moving the player rocket, I used a forEach loop to cycle through all the cells in the grid. If a cell has both player rocket class and alien class, both classes are removed and the player rocket interval is cleared. Then I called a variable that used the filter method to remove the hit alien from the array of aliens in the swarm, and then added added 100 to the player score:

IMAGE

##### Alien rocket hitting player

IMAGE

If player and alien rocket are in the same cell, take a life off, clear alien rocket interval, remove both alien and player from the cell and then 100ms later add the player back (to show that the player was hit).
 
 
### Front-End
 
In terms of the visual element and user experience of the game there were a few key points:
*   The design of the page – background, grid.
*   Start/end-game visuals.
*   The player, alien, and rocket icons.
*   Sound.
 
I decided to personalise each part.
 
#### Page Design
 
I wanted the design to be simple but reflect complexity, as arcade games are based on that dynamic. I started by simply having the webpage background and the grid background and liked the way that the white border looked against the stars, and also the aesthetic of overlaying stars on stars, so I thought why not accentuate that! For the start tile, lives and scoreboard, then, I used display:grid  on a div which contained six identical photos of stars, and made both column and row-start 1, so that any items would be on top of each other. I then simply decreased the height of the images , starting at 100% and going down to 30%. And then the button was added to play the first audio before you play the game.
 
In terms of positioning everything, I used display:flex on the body, as well as on a div that wrapped around the lives, scoreboard, and audio button, and for the end-game tiles. I used dev-tools’ ability to toggle the parameters of flex a lot to experiment with potential combinations, but ultimately pretty much everything was arranged in columns and centred.
 
Start/end-game visuals
 
The start tile was slightly different as I had to put more text in the middle, so I used 5 images instead, and inside the div for the 5th image inserted everything I wanted in the middle of the screen.
I then gave my h1 a  starry background image and the div it sat in a red background , which created this really interesting red shape, which I could mould using padding on the h1. I also gave a starry background to the button to add more interesting shapes through contrast.
 
For the end-game tiles I wanted it to be simple and fun, so using background-repeat and putting my strange aliens in the background seemed like a good fit, and then simply using block colour background for the text to fill in the spaces between the rows of the aliens.
 
The player, alien, and rocket icons
 
I had a lot of fun with this. I’ve previously experimented with Processing 4 using Java to make very harsh , basic patterns and shapes with triangles, rectangles, and squares, so I did the same here! The vast majority of the work was creating a large amounts of triangles or whatever shape and decreasing or increasing one x or y value by 5 or 10 to create a sort of cascading effect. I then used this strange quirk whereby if you assign a negative value to the stroke it gives you a colour instead of a shade of grey. You can sort of predict what colour you’ll get, but not really, so there was a lot of trial and error, but it throws up really unpredictable and interesting colour combinations! Below is a snippet for the spaceship’s code:

IMAGE

### Sound
 
I’m a musician so I was keen to make my own sound for this project, which was a really satisfying process. I already had some snippets that I had been working on and just mixed them up a bit differently in Ableton (music software). I really liked the idea of giving the aliens a voice, and wanted it to be an unexpected, but slightly familiar sound. So, I decided to use the feedback of an echo unit to create strange, ethereal ,bird-song-like sounds. I liked making it that the game began with just the aliens making sounds, and then when the rest of the music comes in it feels like it’s the humans fighting back, but then at the same time having the two complement each other was nice. Using jazzy chords and jungle drums and bass made it very human for me, compared to the strange noises from outer space!



## Challenges

### Scope
 
*   I struggled with ensuring that multiple rockets fired wouldn’t interfere with their respective intervals.
  *    I realised early on that the problem to solve was how to allow the variable for the interval and the variable for the starting position to change its value each time they were called, so that when the spacebar is hit, a new interval is created, and it is created according to the new current position of the player
 
*   It was a really good lesson in understanding scope. Once I had this, It was so satisfying fully understanding where I had gone wrong and how to change. This was a really big learning curve for me, and I now feel so much more confident with scope and also can appreciate how elegantly it can be used!
 
 
### Focussing problem
 
*   When coding the rocket movement, I had a problem where if I fired lots of  rockets from the player,  the alien rocket intervals would start doubling. This was very confusing and I struggled with it for a long time, eventually putting the problem down and working on other parts of the project. I returned to it with my instructor who eventually realised that because I was using a start button to start the interval for the alien rockets, that button was focused and so clicked every time I hit the spacebar from that point. Checking the default behaviour of keys and other things like that will now be something I do every time from now on!
 
 
### Looping the Swarm Movement
 
*  	When creating the interval for the swarm movement, I struggled to figure out how to make the process start again. I had a solid plan at the start, but hadn’t considered how my model made looping complex. Generally speaking, it was an overly complicated way of making the loop.
*  	The main thing I tried to do was to link the statements using Booleans, making a step not run until the step before had been completed as the prior step would switch a globally set Boolean from false to true. This did work right up to the most important transition - getting from the end of the process back to the start!
*  	My instructor said immediately that my process was just too complex, and once I’d simplified it, this problem quickly dissipated.
 
Project Timing
*  	I think I spent too much time on the visual side, creating the individual icons and experimenting with the layout. Though I am really happy with how it came out, it meant that I had less time to bug fix.

## Wins

*  	I was really happy with my UI implementation. Most of what I did was simple , but I think very effective. Like stacking photos with a white border on top of each other to surround text and scores. Or creating 3 different patterns of aliens and randomly selecting them when the game begins.
 
* 	Learning from my mistakes and being able to create something out of a mistake learned was an incredibly good feeling.


## Key Learnings

* 	Scope scope scope.
* 	I’m now very comfortable with intervals, forEach loops, and array methods.
* 	I learnt how much you can do with very simple CSS.
* 	Pay more attention to timing projects logically.
* 	If you think it can be simpler, it probably can be!

## Bugs

 
*  	The player’s rockets get stuck fairly frequently.
*  	You don’t lose a life as soon as an alien rocket hits you, you have a little bit of time to escape.
*  	If you win, end game procedure occasionally isn’t enacted.

## Future Improvements

*  I’d add barriers.
*   I’d make it so that if player and alien rockets collide the two are destroyed.
*   Animations for alien or player death.
*   Have it so that occasionally fruits would appear for the player eat, which would change the game mode, changing visual style, rocket power, and alien movement, and the music. Maybe one that slows the aliens down and makes player rockets less powerful, and one where it does the opposite.

## Final Project












