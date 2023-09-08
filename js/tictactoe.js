// This Variable keeps track of whose turn it is 
let activePlayer = "X";
// This array stores an array of moves. We use this to determine win conditions
let selectedSquares = [];

// this function is used for placing an X or O in the grid
function placeXOrO(squareNumber) {
    // this condition ensures a square hasn't been selected already
    // the .Some() method is used to check each element of the selectSquare array 
    // to see if it contains a square number clicked on 
    if (!selectedSquares.some(element => element.includes(squareNumber))){
        // this variable retrieves the HTML element id that was clicked on
        let select = document.getElementById(squareNumber);
        // this checks whose turn it is
        if (activePlayer == 'X') {
            //if activePlayer is equal to x X-image is placed
            select.style.backgroundImage = 'url("images/X-image.png")';
        }else {
            //if activePlayer is equal to x X image is placed
            select.style.backgroundImage = 'url("images/O-image.png")';
        }
        // squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber  + activePlayer);
        //call function to check if there is a win
        checkWinConditions();
        // Change Active Player From X to O or vice versa
        if (activePlayer == "X") {
            activePlayer = "O" // change active player to O
        } else {
            activePlayer = "X";// change active player to X
        }
        audio('media/place.mp3');
        // Disable Click of it is computers turn
        if (activePlayer == "O") {
            disableClick();
            setTimeout(function(){computersTurn();},300);
        }
        return true;
    }
    //function results in a random square being selected by the computer.
    function computersTurn() {
        let success = false; //used in while loop later
        let pickSquare; // holds random number between 0-8
    // the loop will continue until an empty square in selected
        while(!success){
            pickSquare = String(Math.floor(Math.random() * 9)) // random number between 0-8 chosen 
            //If the random number evaluated returns true, the square hasn't been selected yet.
            if(placeXOrO(pickSquare)) {
                placeXOrO(pickSquare);
                success = true;
            }
        }
    }
}

//This Function parses the selectedSquares array to search for win conditions
// draw line() function is called to draw a line on the screen if the condition is met

function checkWinConditions(){
    // X @ 0,1,2
    if (arrayIncludes('0X','1X','2X')){ drawWinLine(50,100,558,100)}
    // X @ 3,4,5
    else if (arrayIncludes('3X','4X','5X')){ drawWinLine(50,304,558,304)}
    // X @ 6,7,8
    else if (arrayIncludes('6X','7X','8X')){ drawWinLine(50,508,558,508)}
    // X @ 0,3,6
    else if (arrayIncludes('0X','3X','6X')){ drawWinLine(100,50,100,558)}
    // X @ 1,4,7
    else if (arrayIncludes('1X','4X','7X')){ drawWinLine(304,50,304,558)}
    // X @ 2,5,8
    else if (arrayIncludes('2X','5X','8X')){ drawWinLine(508,50,508,558)}
    // X @ 6,4,2
    else if (arrayIncludes('6X','4X','2X')){ drawWinLine(100,508,510,90)}
    // X @ 0,4,8
    else if (arrayIncludes('0X','4X','8X')){ drawWinLine(100,100,520,520)}
    // O @ 0,1,2
    else if (arrayIncludes('0O','1O','2O')){ drawWinLine(50,100,558,100)}
    // O @ 3,4,5
    else if (arrayIncludes('3O','4O','5O')){ drawWinLine(50,304,558,304)}
    // O @ 6,7,8
    else if (arrayIncludes('6O','7O','8O')){ drawWinLine(50,508,558,508)}
    // O @ 0,3,6
    else if (arrayIncludes('0O','3O','6O')){ drawWinLine(100,50,100,558)}
    // O @ 1,4,7
    else if (arrayIncludes('1O','4O','7O')){ drawWinLine(304,50,304,558)}
    // O @ 2,5,8
    else if (arrayIncludes('2O','5O','8O')){ drawWinLine(508,50,508,558)}
    // O @ 6,4,2
    else if (arrayIncludes('6O','4O','2O')){ drawWinLine(100,508,510,90)}
    // O @ 0,4,8
    else if (arrayIncludes('0O','4O','8O')){ drawWinLine(100,100,520,520)}
    // this condition checks for a tie. If none of the above conditions are met and
    //9 out of 9 squares have been filles
    else if (selectedSquares.length >= 9) {
        // play tie sound with audio() function
        audio('./media/tie.mp3')
        // reset game after 1 second
        setTimeout(function() {resetGame();},1000);
    }

    // this function checks if an array includes 3 strings. It is used to check for each win condition
    function arrayIncludes(squareA,squareB,squareC) {
        // these 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);

        // if all three are in included in our array then
        // true is returned and draw line() function is executes

        if (a==true && b == true && c == true) {return true;}

    }

}

// This Function makes our body element temporarily un-clickable
function disableClick () {
    // this makes out HTML body un-clickable 
    body.style.pointerEvents = 'none';
    // this makes our body clickable again in 1 second.
    setTimeout(function () { body.style.pointerEvents = 'auto' ; } , 1000);
}

function audio(audioURL){
    // we create a new object and we pass the path as a parameter 
    let audio = new Audio(audioURL);
    //Play method Plays the audio sound
    audio.play();
}


