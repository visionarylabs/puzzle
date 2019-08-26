# Puzzle Project

Starting some public code to share and collaborate on JS and Canvas game development. We'll start with a puzzle code, based on Pentominoes puzzles.

## on Git Hub Pages
https://visionarylabs.github.io/puzzle/

## MakeShpaes

Ignore rotation and symmetry for now, just focus and getting every possible shape

n = number of tiles in this puzzle's shapes, e.g. n=5 for pentominoes
s = the step you are on, 1xn, 2 x n-1, 3 x n-2 etc.
z = the tile you are testing, 1 being the last, 2 being 2nd to last etc.
g = the grid space you are testing for tile z, e.g. spot 3,4,5 etc

start with a grid 1 x n, e.g. 1x5
1 2 3 4 5

place n tiles in each grid space until none are left, that was step 1
xxxxx

move to step 2, make a grid that is n - (s-1) x s, e.g. 4 x 2 for step 2
fill in the first row, e.g. 1,2,3,4 with the first 4, then move that last tile to each space in row 2.
1 2 3 4
5 6 7 8

xxxx
x

Check to make sure it's adjacent to a tile.
after each space is checked, move the 2nd to last tile to a free space, then place the last tile in each adjacent space

xxx
xx

xxx
 xx

xxx
  xx
  
when the last spot is checked z--
xx
xxx

x
xxxx

no need to check lower positions again after z is moved down
then move to the next step
e.g. 3x3, this is the last step because s cannot be less than half of n.
1 2 3
4 5 6
7 8 9

xxx
xx