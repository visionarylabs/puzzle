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

    //the main array of all shapes
    var shapes = [];

    var settings = {
        tileCount : 5, //e.g. 4 for tetrominoes
        tileSize : 25,
        startingX : 20,
        startingY : 50,
    }

    //set constants based on settins
    //the rest of the shapes after shape 1 will fit in a n-2 x n-1 grid
    var constants = {
        startingX : 20,
        maxXCount : settings.tileCount - 1,
        maxYCount : settings.tileCount,
    }

    var buildState = {
        //a state to save the tile position as we build each shape
        tilePosY : 0, //the placement of the next tile
        tilePosX : 0,
        curRow : 0, //the current column to build down
        curCol : 0, //the current row to build across
        leftEdgeCount : constants.maxYCount, //the max Left Edge for the current loop
        topEdgeCount : constants.maxXCount, //the max Top Edge for the current loop
    }

    // init
    var init = function () {
        makeShapes();
        console.log('done making shapes');
        console.log(shapes);
        render();
    }

    var makeShapes = function () {
        var shape = [];
        var tile = [];
        var i = 0;
        var tileId = 0;

        if( 12 === shapes.length ) return; //fail safe
        
        console.log( 'BUILDING SHAPE #' + Number(shapes.length + 1) );

        //the main loop to make all the rest of shapes
        //loop for each tile in the shpae tile count

        for(i=0; i < settings.tileCount; i++){

            tileId = i + 1;

            //for now, all shapes start at 0,0
            if(tileId === 1 ){
                //reset x and y for this shape
                buildState.tilePosY = 0;
                buildState.tilePosX = 0;
            }else{
                //build down the column
                buildState.tilePosY++;
            }

            //MAIN
            if( tileId > buildState.leftEdgeCount ){
                buildState.tilePosY = buildState.curRow;
                buildState.tilePosX = buildState.curCol;
            }
            
            //move the row count down the next col
            if( tileId > buildState.leftEdgeCount ){
                buildState.curRow++;
            }

            //do not allow tiles to go off the preset area
            if(
                buildState.tilePosX >= constants.maxXCount ||
                buildState.tilePosY >= constants.maxYCount
            ){
                console.log( 'we have gone to far!!' );
                return;
            }

            console.log( '...building tile ' + tileId + ':    ' + buildState.tilePosX + ', ' + buildState.tilePosY );
            tile = [ buildState.tilePosX, buildState.tilePosY ];
            shape.push(tile);

        }

        shapes.push(shape);//add the last shape to the list

        //look at the last shape position and move on to the next max edge
        if(buildState.tilePosY === buildState.leftEdgeCount - 1){
            buildState.leftEdgeCount--;
            buildState.curCol++;
        }

        makeShapes(); //call again or the next shape

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
        var i = 0;
        var count = shapes.length;
        for(i=0; i < count; i++){
            //console.log('drawing shape #' + i);
            //console.log(shapes[i]);
            drawShape( shapes[i] );

            //position the next shape draw in next spot on canvas
            settings.startingX += (settings.tileSize * (constants.maxXCount + 1) );
            if( settings.startingX + (settings.tileSize * (constants.maxXCount + 1) ) > canvas.width ){
                settings.startingX = constants.startingX;
                settings.startingY += (settings.tileSize * (constants.maxYCount + 1) );
            }

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
            x = settings.startingX + (shape[i][0]) * settings.tileSize;
            y = settings.startingY + (shape[i][1]) * settings.tileSize;
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
        ctx.fillRect( x, y, (settings.tileSize * constants.maxXCount), (settings.tileSize * constants.maxYCount) );
    }

    return {
        init : init
    }

}

var game = new VPuzzle();
game.init();
