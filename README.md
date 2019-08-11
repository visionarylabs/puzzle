# Puzzle Project

Starting some public code to share and collaborate on JS and Canvas game development. We'll start with a puzzle code, based on Pentominoes puzzles.

## on Git Hub Pages
https://visionarylabs.github.io/puzzle/

## MakeShpaes

    Ignore rotation and symmetry for now, just focus and getting every possible shape
    
    1.
    start with the straight vertical shape, build tiles down column #1 to make that shape
    x
    x
    x
    x
    x
    
    1 new piece
    
    2.
    then, shorten the left edge to n-1 (e.g. 4 for pentominoes)
    then build down that edge, and the last tile will go to column #2, Row #1
    then move that down column #2 until it reaches the end of the new edge (e.g. 4 for pentominoes)
    xx  x   x   x
    x   xx  x   x
    x   x   xx  x
    x   x   x   xx
    
    2 new pieces
    
    3.
    shorten the edge again, now we have 2 remaining tiles for pentominoes.
    place the first in spot 2,1 - then start moving the second one down to the end of the edge.
    then place the first in spot 2,2 - then move the second down the edge
    keep moving the first down all the way to the end, and continue to add the 2nd one even past the edge.
    xx  xx  x   x
    xx  x   xx  x
    x   xx  xx  xx
                 x
                 
    3 new pieces
    
    3.1
    start moving to the 3rd column
    xxx x   x
    x   xxx x
    x   x   xxx
    
    2 new pieces
    
    4.
    left edge of 2 with max height of 3, and no 3 edgers
    x   x   x
    xxx xx  xxx
     x   xx   x
    
    3 new pieces
     
    5.
    the no corner piece
    build a no corner L then try every combo with no 2 edgers
     x
    xxx
     x
    
    1 new piece