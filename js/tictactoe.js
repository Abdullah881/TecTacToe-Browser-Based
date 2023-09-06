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
            setTimeout(function(){computersTurn();},1000);
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