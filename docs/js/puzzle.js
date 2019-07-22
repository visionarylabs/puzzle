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
        tileSize : 50,
        tileCount : 4, //e.g. 4 for tetrominoes
        startingX : 20,
        startingY : 50,
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
        var x = 0;
        var y = 0;

        if( 0 === shapes.length ){
            //make the first shape
            console.log('make the first shape, a straight line');
            for(i=0; i < settings.tileCount; i++){
                tile = [0,i];
                shape.push(tile);
            }
        }else{
            //find the next shape to make
            //move the bottom tile to the next column
            console.log('make the 2nd shape, an L');
            for(i=0; i < settings.tileCount; i++){
                if(i < settings.tileCount - 1){
                    x = 0;
                    y = i;
                }else{
                    x = 1;
                    y = 0;
                }
                tile = [x,y];
                shape.push(tile);
            }
        }
        
        shapes.push(shape);
        if(shapes.length < 2){
            makeShapes();
        }
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
            console.log('drawing shape #' + i);
            console.log(shapes[i]);
            drawShape( shapes[i] );
            settings.startingX += (settings.tileSize * 2);
        }
    }
    
    var drawShape = function (shape) {
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
        ctx.rect( x, y, settings.tileSize, settings.tileSize ); //x,y,w,h
        ctx.fillStyle = "rgb(25,25,25)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(200,200,200)";
        ctx.stroke();
    }
    
    return {
        init : init
    }
    
}

var game = new VPuzzle();
game.init();
