/**
    Puzzle
    v0.1 | 2019.07.19
    Ben Borkowski - Lead Developer
**/

var VPuzzle = function () {
    console.log('hello world, new puzzle game created.')
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'game';

    var settings = {
        tileSize : 30,
        tileCount : 4, //e.g. 4 for tetrominoes
        startingX : 20,
        startingY : 50,
    }

    var constants = {
        //the rest of the shapes will fit in a n-2 x n-1 grid
        maxXCount : settings.tileCount - 2,
        maxYCount : settings.tileCount - 1,
    }

    var buildState = {
        //a state to save the tile position as we build each shape
        tilePosY : 0,
        tilePosX : 0,
        lastPosY : 0,
        lastPosX : 0,
        leftEdgeCount : constants.maxYCount,
        topEdgeCount : constants.maxXCount
    }

    var shapes = [] //an array of shapes

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

        if( 12 === shapes.length ) return; //fail safe

        //the main loop to make all the rest of shapes
        //loop for each tile in the shpae tile count

        for(i=0; i < settings.tileCount; i++){

            if(i === 0 ){
                //reset x and y for this shape
                buildState.tilePosY = 0;
                buildState.tilePosX = 0;
            }else{
                buildState.tilePosY++;
            }
            
            if( buildState.tilePosY >= buildState.leftEdgeCount ){
                buildState.tilePosY = buildState.lastPosY;
            }
            
            if( shapes.length > 0 ){
                if( (i+1) > buildState.leftEdgeCount ){
                    buildState.tilePosX++;
                    buildState.lastPosY++;
                    if(buildState.lastPosY >= constants.maxYCount){
                        buildState.lastPosY = 0;
                        buildState.leftEdgeCount--;
                    }
                }
            }
            
            //do not allow tiles to go off the preset area
            if( 
                buildState.tilePosX >= constants.maxXCount || 
                buildState.tilePosY >= constants.maxYCount
            ) return;
            
            console.log( '...building tile ' + (i+1) + ':    ' + buildState.tilePosX + ', ' + buildState.tilePosY );
            tile = [ buildState.tilePosX, buildState.tilePosY ];
            shape.push(tile);

        }
        
        console.log( 'BUILDING SHAPE #' + Number(shapes.length + 1) );
        shapes.push(shape);//add the last shape to the list
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
                settings.startingX = 20;
                settings.startingY += (settings.tileSize * (constants.maxYCount + 2) );
            }

        }
    }

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

    //draw one tile
    var drawTile = function ( x, y ) {
        //test shape
        ctx.fillStyle = "rgb(20,20,20)";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(120,120,120)";
        ctx.fillRect( x, y, settings.tileSize, settings.tileSize );
        ctx.strokeRect( x, y, settings.tileSize, settings.tileSize );
    }

    //draw background
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
