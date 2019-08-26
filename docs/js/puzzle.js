/**
    Puzzle
    v0.1 | 2019.07.19
    Ben Borkowski - Lead Developer
**/

var VPuzzle = function () {
    console.log('hello world, new puzzle game created.')
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 700;
    canvas.id = 'game';
    
    // init
    var init = function () {
        grid = makeGrid();
        makeShapes();
        console.log('*** done making shapes:');
        console.log(shapes);
        render();
    }

    //the main array of all shapes
    var shapes = [];
    
    var grid = [];

    //set constants based on settins
    var constants = {
        startingX : 20,
        startingY : 50
    }
    
    var settings = {
        tileCount : 4, //e.g. 4 for tetrominoes
        tileSize : 25,
        startingX : constants.startingX,
        startingY : constants.startingY
    }

    //a state to save the tile positions as we build each shape
    var state = {
        
        step : 1, //step 1 is the full horizantal line
        
        //start with a n x 1 grid
        gridMaxX : settings.tileCount,
        gridMaxY : 1,
        
        curTile : 1, //the current tile in the loop
        curSpace : 1, //the current space in the loop
        testTile : 1, //the tile being tested e.g. the last tile
        testSpace : 1, //the space being test, the next available space
        
    }
    
    var grid = null;

    /**
        the main shapebuilder, recursive to build the next shape on the list
         *************************************************************************************
    **/
    var makeShapes = function () {
        var shape = [];
        var tile = [];
        var i = 0;
        
        var fixedRow = settings.tileCount - (state.step - 1);
        var tilesLeft = state.step - 1;

        if( state.gridMaxY > Math.ceil(settings.tileCount / 2) ) return;
        if( 12 === shapes.length ) return; //fail safe
        
        console.log( 'BUILDING SHAPE #' + Number(shapes.length + 1) );
        console.log(grid);

        //the main loop to make all the rest of shapes
        
        //loop for each tile in the shape tile count
        for(i=0; i < fixedRow; i++){

            state.curTile = i + 1;
            state.curSpace = i + 1;
            grid[i].checked = true;
            grid[i].occupied = true;

            //place the tile in this shape
            console.log( '...placing tile ' + state.curTile);
            tile = [ state.curSpace, 1 ];
            shape.push(tile);

        }
        
        var nextCheckSpace = null;
        for(i=0; i < grid.length; i++){
            if(grid[i].checked == false){
                nextCheckSpace = i;
                break;
            }
        }
        if(nextCheckSpace && tilesLeft > 0){
            console.log('MOVING ON!');
            console.log(nextCheckSpace);
            tile = [ grid[nextCheckSpace].x , grid[nextCheckSpace].y ];
            grid[nextCheckSpace].checked = true;
            grid[nextCheckSpace].occupied = true;
            shape.push(tile);
        }

        shapes.push(shape);//add the last shape to the list

        var availableSpace = false;
        for(i=0; i < grid.length; i++){
            if(grid[i].occupied == false){
                availableSpace = true;
                break;
            }
        }
        
        //check to move state to next shape
        if( !availableSpace ){
            state.step++;
            state.gridMaxY = state.step;
            grid = makeGrid();
        }

        makeShapes(); //call again or the next shape 

    }
    /**
        END THE MAIN PUZZLE MAKER
        *************************************************************************************
    **/
    
    //make a grid, this is the grid to check against for the current step
    var makeGrid = function () {
        var g = [];
        for(y = 1; y <= state.gridMaxY; y++){
            for(x = 1; x <= state.gridMaxX; x++){
                space = {x:x,y:y,occupied:false,checked:false};
                g.push(space);
            }
        }
        console.log('made grid:')
        console.log(g);
        return g;
    }

    //Drawings and Rendering Functions

    // draw / render everything
    var render = function () {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //type
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "18px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Puzzle Game" , 10 , 10);
        drawShapes();
    }

    //draw all the shpaes in the list
    var drawShapes = function () {
        console.log('drawing all shapes...');
        var i = 0;
        var count = shapes.length;
        for(i=0; i < count; i++){
            drawShape( shapes[i] );
            resetPosition();
        }
    }
    
    //position the next shape draw in next spot on canvas
    var resetPosition = function () {

        settings.startingX += (settings.tileSize * (settings.tileCount + 1) );

        //if it goes off the edge move down in Y
        if( settings.startingX + (settings.tileSize * (settings.tileCount) ) > canvas.width ){
            settings.startingX = constants.startingX;
            settings.startingY += (settings.tileSize * (settings.tileCount + 1) );
        }

    }

    //draw a shape based on an x,y tile position array
    var drawShape = function (shape) {
        drawBackground(settings.startingX,settings.startingY);
        var x = settings.startingX;
        var y = settings.startingY;
        var i = 0;
        var count = shape.length;
        for(i=0; i < count; i++){
            x = settings.startingX + (shape[i][0]) * settings.tileSize - settings.tileSize;
            y = settings.startingY + (shape[i][1]) * settings.tileSize - settings.tileSize;
            drawTile( x, y );
        }
    }

    //draw one tile on the x,y grid
    var drawTile = function ( x, y ) {
        //test shape
        ctx.fillStyle = "rgb(20,20,20)";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(120,120,120)";
        ctx.fillRect( x, y, settings.tileSize, settings.tileSize );
        ctx.strokeRect( x, y, settings.tileSize, settings.tileSize );
    }

    //draw the background, the max area for this shape builder
    var drawBackground = function ( x, y ) {
        ctx.fillStyle = "rgb(65,65,65)";
        ctx.fillRect( x, y, (settings.tileSize * settings.tileCount), (settings.tileSize * settings.tileCount) );
    }

    return {
        init : init
    }

}

var game = new VPuzzle();
game.init();
