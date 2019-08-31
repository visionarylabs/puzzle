# Puzzle Project

Starting some public code to share and collaborate on JS and Canvas game development. We'll start with a puzzle code, based on Pentominoes puzzles.

## on Git Hub Pages
https://visionarylabs.github.io/puzzle/

## MakeShpaes

### main vars
N = number tiles in this puzzle (e.g. 5 for pentominoes)
G = the grid we are building on [ {x:1,y:1,occupied:false,checked:false"}, etc... ]
Shapes = the main shape array of all unique shapes. e.g. Shapes[5] is an array of all pentominoes


### Build a multi-array for each N number of tiles
Shapes[1][0] = [ [1,1] ]
Shapes[2][0] = [ [1,1], [2,1] ]
Shapes[3][0] = [ [1,1], [2,1], [3,1] ]
Shapes[3][1] = [ [1,1], [2,1], [1,2] ]
Shapes[4][0] = [ [1,1], [2,1], [3,1], [4,1] ]
...

## todo:
functions for 
* rotate shape L or R
* flip shape V or H
* test symmetry V or H or R
* for a given shape build a grid around it to find shapes with +1 tile

## main loop
1 start with a 1x1 grid (N = 1)
2 build and add to shape array then go to N++
3 take each shape form N - 1 and add it to a grid with one space around it.
4 fill in the grid with occupied tiles
5 add a tile to each unoccupied tile - check that it is adjacent
6 make that to a temp shape, rotate adn flip and test agains each shape in the current N list
7 if it's unique add it to the Shape[N] list.
8 go on to the next unoccupied and unchecked grid space
9 after all are tested go back to step 3 and test the next shape from N - 1.