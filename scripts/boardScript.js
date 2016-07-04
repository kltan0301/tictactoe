//Global variable declaration
//Player's turn
var turn = "x";
//Empty Board
var board = [" "," "," "," "," "," "," "," "," "];
//get all board squares
var squareElements = document.getElementsByClassName('square');
//player indication text
var playerText = document.querySelector('h1');
//piece images
var cross = "https://raw.githubusercontent.com/christkv/tic-tac-toe/master/public/img/cross.png";
var circle = "https://raw.githubusercontent.com/christkv/tic-tac-toe/master/public/img/circle.png";

//Function for adding event listeners
function prepareBoard(){
  turn = "x";
  playerText.innerText = "Player " + turn.toUpperCase() + "'s turn!";
  //get resetButton
  var resetButton = document.getElementById('resetButton');
  //add event listener to reset button
  resetButton.addEventListener('click', resetBoard);
  //add event listeners to all the squares
  for(var i = 0; i < squareElements.length; i++){
      //Add mouseover effect
      squareElements[i].addEventListener('mouseover',pieceHint);
      //Remove mouseover effect
      squareElements[i].addEventListener('mouseout',removePieceHint);
      //Place tile on click
      squareElements[i].addEventListener('click',placeOnBoard);
  }
}
//Indicate the player's piece, for mouseover effect
function pieceHint(){
  //add mouseOverEffect
  if(turn == "x"){
      this.style.backgroundImage="url("+cross+")";
    }else{
      this.style.backgroundImage="url("+circle+")";
    }
}
//Remove the piece on mouseout
function removePieceHint(e){
  e.target.style.backgroundImage = "none";
  e.target.style.backgroundColor = "transparent";
}
//Gets what player piece to place
function getPiece(player){
  player = player.toLowerCase();
  if(player === "x"){
    //updates the current turn
    turn = "o";
    return cross;
  }else{
    //updates the current turn
    turn = "x";
    return circle;
  }
}
//Places player piece on board
function placeOnBoard(e){
    //create new piece
    var piece = document.createElement("img");
    var currTurn = turn;
    piece.className = turn;
    piece.src = getPiece(turn);
    //add the piece to the board
    e.target.appendChild(piece);
    //update the board array
    var sqIndex = parseInt(this.id.charAt(6))-1;
    board[sqIndex] = currTurn;
    //remove Event Listeners
    e.target.removeEventListener('click', placeOnBoard);
    e.target.removeEventListener('mouseover',pieceHint);
    e.target.removeEventListener('mouseout',removePieceHint);
    //check if anyone has won
    if(checkWin()){
      alert("Game Over! " + currTurn.toUpperCase() + " has won!");
      resetBoard();
      prepareBoard();
      return;
    }
    //check if board is full
    if(board.indexOf(" ") == -1){
      alert("It's a draw");
      resetBoard();
      prepareBoard();
      return;
    }


    playerText.innerText = "Player " + turn.toUpperCase() + "'s turn!";
}
// clear all elements in board
function resetBoard(){

  for(var j = 0; j < squareElements.length; j++){

    if(squareElements[j].hasChildNodes()){
      squareElements[j].innerHTML = '';
      squareElements[j].style.backgroundImage="none";
    }
  }
  board = [" "," "," "," "," "," "," "," "," "];
  prepareBoard();
}
//checks for winner
function checkWin(){
  var leftStart = 0, rightStart = 2;

  //check horizontal winner
  for(var i = 0; i <= 6; i+=3){
    if(board[i] == board[i+1] && board[i+1] == board[i+2] && board[i] != " "){
      return true;
    }
  }

  // check vertical winner
  for(var j = 0; j <= 2; j++ ){
    if(board[j] == board[j+3] && board[j] == board[j+6] && board[j] != " "){
      return true;
    }
  }

  // //check diagonal winner
  if(board[0] === board[4] && board[0] === board[8] && board[0]!= " "|| board[2] === board[4] && board[4] === board[6] && board[2] != " "){
    return true;
  }
  return false;
}

//Call function to create the board
prepareBoard();
