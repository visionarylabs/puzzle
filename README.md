# Puzzle Project

Starting some public code to share and collaborate on JS and Canvas game development.
We'll start with a puzzle code, based on Pentominoes puzzles.
This code now can find each 'free' polyomino using N tiles with N being 1 - 9.

## on Git Hub Pages
https://visionarylabs.github.io/puzzle/

## more on polyominos
see the nonomino wiki: https://en.wikipedia.org/wiki/Nonomino

## Make Shpaes

### main vars
N = number tiles in this puzzle (e.g. 5 for pentominoes)
g = the grid we are building on [ {x:1,y:1,occupied:false,checked:false"}, etc... ]
shapes = the main shape array of all unique shapes. e.g. shapes[5] is an array of all free pentominoes

## todo:
* add keyboard listeners to change from 1 to 8 for N (if lower just keep state and show lower, if higher recalculate)
* redo render code to use as much screen space as possible and to size tiles to fit screen
* add code to select and view each shape
* add code to rotate and flip selected shapes
* add numbering / names for each shape displayed
* add checks for symmetry / and rotational symmetry
* optimize new tile checks based on symmetry
* update arrays with all flips and rotations (optional)
* add color options for symmetry types and/or random/unique colors
* optimize builder into class and start new class for tile puzzle game and solution maker
* start new class for 'Tetris' style game
* same main array of N 1-9 in JSON file for easy lookup in games

## main loop
1 start with a 1x1 grid (N = 1)
2 build and add to shape array then go to N++
3 take each shape form N - 1 and add it to a grid with one space around it.
4 fill in the grid with occupied tiles
5 add a tile to each unoccupied tile and check that it is adjacent
6 make that to a temp shape, rotate and flip and test against each shape in the current N list
7 if it is unique add it to the Shape[N] list.
8 go on to the next unoccupied and unchecked grid space
9 after all are tested go back to step 3 and start adding tiles to the next shape from N - 1.

### builds a multi-array for each N number of tiles
Shapes[1][0] = [ [1,1] ]
Shapes[2][0] = [ [1,1], [2,1] ]
Shapes[3][0] = [ [1,1], [2,1], [3,1] ]
Shapes[3][1] = [ [1,1], [2,1], [1,2] ]
Shapes[4][0] = [ [1,1], [2,1], [3,1], [4,1] ]
...