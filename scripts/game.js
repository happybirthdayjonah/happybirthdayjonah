let button = document.getElementById("start-button");
var spriteSheet = document.createElement('img');
spriteSheet.src = "../images/jonah_and_brandon.jpeg";
spriteSheet.style.visibility = "hidden";

var isPieceBeingDragged = false;
var pieceBeingDragged = null;

var spriteSheetWidth = 0;
var spriteSheetHeight = 0;
var pieceWidth = 0;
var pieceHeight = 0;

var mouseX = 0;
var mouseY = 0;

spriteSheet.onload = function() {
    spriteSheetWidth = spriteSheet.width;
    spriteSheetHeight = spriteSheet.height;
}

document.getElementById("back-button").addEventListener('click', function() {
    window.location.href = "../index.html#last-message";
});

button.addEventListener('click', function() {
    button.remove();
    document.getElementById("reset-button").style.setProperty("visibility", "visible");
    document.getElementById("reset-button").addEventListener("click", function() {
        for(var i = 1; i <= 24; i++){
            var piece = document.getElementById("piece" + i.toString());
            piece.style.setProperty("left", (Math.random() * 90).toString() + "vw");
            piece.style.setProperty("top", (Math.random() * 90).toString() + "vh");
        }
        
    });

    pieceWidth = spriteSheetWidth / 4;
    pieceHeight = spriteSheetHeight / 6;
    var count = 0;
    for(var row = 0; row < 6; row ++){
        for(var col = 0; col < 4; col ++){

            count++;
            //creates new element
            var piece = document.createElement('img');

            //sets width, height, and background
            piece.style.setProperty("width", (pieceWidth).toString() + "px");
            piece.style.setProperty("height", (pieceHeight).toString() + "px");
            piece.style.setProperty("background", 
                "url(../images/jonah_and_brandon.jpeg) " + 
                (col * pieceWidth).toString() + "px " +
                (row * pieceHeight).toString() + "px");
            piece.style.setProperty("z-index", "2");
            
            //sets position to random
            piece.style.setProperty("left", (Math.random() * 90).toString() + "vw");
            piece.style.setProperty("top", (Math.random() * 90).toString() + "vh");


            //adds "piece" class to element
            piece.classList += "piece";
            piece.id = "piece" + count.toString();

            //appends element to "pieces" div
            document.getElementById("pieces").appendChild(piece);
        }
    }

    for(var i = 1; i <= count; i++){

         //drags
         document.getElementById("piece" + i.toString()).setAttribute("isBeingDragged", "false");
         document.getElementById("piece" + i.toString()).addEventListener("mousedown", function(){
                 this.setAttribute("isBeingDragged", "true");
                 isPieceBeingDragged = true;
                 this.style.setProperty("z-index", "10");
         });
         
         document.getElementById("piece" + i.toString()).addEventListener("mouseup", function(){
            this.setAttribute("isBeingDragged", "false");
            isPieceBeingDragged = false;
            this.style.setProperty("z-index", "2");
         });

         document.getElementById("piece" + i.toString()).addEventListener("mousemove", function() {
             if(this.getAttribute("isBeingDragged") == "true"){
                 pieceBeingDragged = this;
                // this.style.setProperty("left",(mouseX - (pieceWidth / 2)).toString() + "px");
                // this.style.setProperty("top", (mouseY - (pieceHeight / 2)).toString() + "px");
             }
         });
    }

    spriteSheet.remove();
});

document.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if(isPieceBeingDragged){
        pieceBeingDragged.style.setProperty("left",(mouseX - (pieceWidth / 2)).toString() + "px");
        pieceBeingDragged.style.setProperty("top", (mouseY - (pieceHeight / 2)).toString() + "px");
    }
});