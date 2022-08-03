
var boardData = [
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
]

var displayBoard = document.getElementById("board")

window.addEventListener('load' ,function (event){
    for(let i = 0; i < 6; i++){
        var boardRow = document.createElement("div");
        boardRow.className = "boardRow";
        displayBoard.append(boardRow);
        for(let x = 0; x < 7; x++){
            const boardColumn = document.createElement("div");
            boardColumn.className = "boardColumn";
            boardRow.append(boardColumn);
        };
        

    }
    showNewBoard(boardData)
});

function showNewBoard(boardData){
    testBoard = document.getElementById("board")
    for(let z = 0; z < 6; z++){
        for(let x = 0; x < 7; x++){
            testBoard.childNodes[z].childNodes[x].style.backgroundColor = boardData[z][x];

        }
    }
}

function createPlayers(){
    var valid = false;
    while(valid == false){
        var players = 2
        if(players > 0 && players < 3){
            valid = true;
            document.getElementById('player-turn').textContent = "Turn: Red"
            return ["Red","Black"]
        }
    }
    
}

function getSelection(){
    var selection = document.querySelector('input[name="column"]:checked').value;
    return selection;
}

function turn(player, boardData, columnSelection){
    for(i = 5; i >= -1; i--){
        if(boardData[i][columnSelection] == ""){
            boardData[i][columnSelection] = currentPlayer
            displayBoard.childNodes[i].childNodes[columnSelection].style.animation = "slide 1s 1"
            break;
        }
        else if(i == -1){
            i = 5;
            btn.addEventListener('click', function(e){
                columnSelection = getSelection()});
            
        }
    }

}

function changePlayer(players, currentPlayer){
    if(currentPlayer == players[0]){
        currentPlayer = players[1]
    }
    else{currentPlayer = players[0]}
    document.getElementById('player-turn').textContent = `Turn: ${currentPlayer}`
    return currentPlayer

}

function checkWin(boardData){
    var winner = false
    for(let r = 0; r < 6; r++){
        for(let c = 0; c < 7; c++){
            var currentIndex = boardData[r][c];
            if(currentIndex != ""){
                //horizontal win
                if(c < 4 && currentIndex == boardData[r][c+1] && currentIndex == boardData[r][c+2] && currentIndex == boardData[r][c+3]){
                    winner = true;
                    return winner;
                }
                //vertical win
                else if(r < 3 && currentIndex == boardData[r+1][c] && currentIndex == boardData[r+2][c] && currentIndex == boardData[r+3][c]){
                    winner = true;
                    return winner;
                }
                //downward diagonal win
                else if(r < 3 && c < 4 && currentIndex == boardData[r+1][c+1] && currentIndex == boardData[r+2][c+2] && currentIndex == boardData[r+3][c+3]){
                    winner = true;
                    return winner;
                }
                //upward diagonal win
                else if(r > 2 && c < 4 && currentIndex == boardData[r-1][c+1] && currentIndex == boardData[r-2][c+2] && currentIndex == boardData[r-3][c+3]){
                    winner = true;
                    return winner;
                }
                
            }

        }
    }
}

function checkFullBoard(boardData){
    for(let r = 0; r < 6; r++){
        for(let c = 0; c < 7; c++){
            if(boardData[r][c] == ""){
                return false
            }

        }
    }
    return true
}



function newGame(){

    var playing = true;
    const players = createPlayers();
    currentPlayer = players[0];
    btn = document.getElementById("submit-button");
    colButtons = document.getElementsByClassName("col-btn");
    btn.addEventListener('click', function(e){
        columnSelection = getSelection()
        turn(currentPlayer, boardData, columnSelection);
        showNewBoard(boardData);
        winner = checkWin(boardData);
        if(winner == true){
            playing = false;
            showNewBoard(boardData);
            document.getElementById('player-turn').textContent = `Winner: ${currentPlayer}!`;
            btn.style.display = "none";
            for(i = 0; i < 7; i++){
                colButtons[i].style.display = "none";

            }
        }
        else if(checkFullBoard(boardData) == true){
            playing = false
            showNewBoard(boardData);
            document.getElementById('player-turn').textContent = `It's a tie!`
            btn.style.display = "none"

        }
        else{currentPlayer = changePlayer(players, currentPlayer)};

        // computer turn
        columnSelection = computerSelection(boardData)
        turn(currentPlayer, boardData, columnSelection);
        setTimeout(showNewBoard, 1200, boardData);
        winner = checkWin(boardData);
        if(winner == true){
            playing = false;
            showNewBoard(boardData);
            document.getElementById('player-turn').textContent = `Winner: ${currentPlayer}!`;
            btn.style.display = "none";
            for(i = 0; i < 7; i++){
                colButtons[i].style.display = "none";

            }
        }
        else if(checkFullBoard(boardData) == true){
            playing = false
            showNewBoard(boardData);
            document.getElementById('player-turn').textContent = `It's a tie!`
            btn.style.display = "none"

        }
 
        else{currentPlayer = changePlayer(players, currentPlayer)};

    
    })

}

newGame()















function getAvailColumns(boardData){
    var availableColumns = ["","","","","","",""]
    for(r = 0; r < 6; r ++){
        for(c = 0; c < 7; c++){
            if(boardData[r][c] == ""){
                availableColumns[c] = r
            }
        }
    }
    return availableColumns
};


function getSurroundings(boardData, availCol, col){
    var row = availCol[col]
    // horizontal array
    var horizonalSurroundings = boardData[row].slice()
    horizonalSurroundings[col] = "Target"
    // vertical array
    var verticalSurroundings = 
        [boardData[0][col],
        boardData[1][col],
        boardData[2][col],
        boardData[3][col],
        boardData[4][col],
        boardData[5][col]
    ]
    verticalSurroundings[row] = "Target"

    var diagonalSurroundingsD = []
    for(i = -3; i <= 3; i++){
        if(row + i == row && col + i == col){
            diagonalSurroundingsD.push("Target")
        }
        else if(row + i >= 0 && row + i <= 5 && col + i >= 0 && col + i <= 6){
            diagonalSurroundingsD.push(boardData[row+i][col+i])

        }
    }
    var diagonalSurroundingsU = []
    for(i = -3; i <= 3; i++){
        if(row + i == row && col + i == col){
            diagonalSurroundingsU.push("Target")
        }
        else if(row - i >= 0 && row - i <= 5 && col + i >= 0 && col + i <= 6){
            diagonalSurroundingsU.push(boardData[row-i][col+i])

        }
    }

    var surroundings = []
    surroundings.push(horizonalSurroundings)
    surroundings.push(verticalSurroundings)

    if(diagonalSurroundingsD.length > 3){
        surroundings.push(diagonalSurroundingsD)
    }
    if(diagonalSurroundingsU.length > 3){
        surroundings.push(diagonalSurroundingsU)
    }

    return surroundings
}


function checkSurroundings(surroundings, availCol, col){
    var row = availCol[col]
    var longestStreak = []
    for(i=0; i < surroundings.vertical.length; i ++){
        // get streak of surrounding array
        // if streak is longer than longest - change longest
    }


}


function getPotentialStreak(surroundingArray){
    var tIndex = surroundingArray.indexOf("Target")
    var rightString = [...surroundingArray.slice(tIndex)]
    var leftString = [...surroundingArray.slice(0, tIndex + 1)]
    var rightStreak = []
    var leftStreak = []
    for(i=1; i < rightString.length; i++){
        if(rightString[i] !== "" && rightStreak.length == 0){
            rightStreak.push(rightString[i])
        }
        else if(rightString[i] !== "" && rightString[i] == rightStreak[0]){
            rightStreak.push(rightString[i])
        }
        else{
            break;
        }
    }
    for(i=leftString.length - 2; i > 0; i--){
        if(leftString[i] !== "" && leftStreak.length == 0){
            leftStreak.push(leftString[i])
        }
        else if(leftString[i] !== "" && leftString[i] == leftStreak[0]){
            leftStreak.push(leftString[i])
        }
        else{
            break;
        }
    }

    if(leftStreak.length == rightStreak.length && leftStreak[0] == rightStreak[0]){
        return leftStreak.concat(rightStreak)
    }
    else if(leftStreak.length == rightStreak.length && leftStreak[0] !== rightStreak[0]){
        if(leftStreak.includes("Red")){
            return leftStreak
        }
        else {return rightStreak}
    }
    else if(leftStreak.length > rightStreak.length && leftStreak[0] == rightStreak[0]){
        return leftStreak.concat(rightStreak)
        }
    else if(leftStreak.length < rightStreak.length && leftStreak[0] == rightStreak[0]){
        return leftStreak.concat(rightStreak)
    }
    else if(leftStreak.length > rightStreak.length){
        return leftStreak
    }
    else{return rightStreak}
}

function computerSelection(boardData){
    var availCol = getAvailColumns(boardData) 
    var savedStreak = []
    var selectedColumn = []
    for(c = 0; c < availCol.length; c++){
        var surroundings = getSurroundings(boardData, availCol, c)
        for(s = 0; s < surroundings.length; s++){
            var streakToAnalyze = getPotentialStreak(surroundings[s])
            console.log(streakToAnalyze)
            // if(streakToAnalyze.length == 3 && streakToAnalyze[0] == "Black"){}
            if(streakToAnalyze.length > savedStreak.length){
                savedStreak = streakToAnalyze
                selectedColumn = [c]

            }
            else if(streakToAnalyze.length == savedStreak.length && savedStreak[0] == "Black"){
                if(streakToAnalyze == "Red"){
                    savedStreak = streakToAnalyze
                    selectedColumn = [c]
                }
                else{selectedColumn.push(c)}

            }
            else if(streakToAnalyze.length == savedStreak.length && savedStreak[0] == "Red"){
                if(streakToAnalyze == "Red"){
                    selectedColumn.push(c)
                }
                else{}

            }
            else{}
        }

    }
    var odd = selectedColumn.length % 2
    var even = selectedColumn.length / 2

    if(selectedColumn.length > 1){
        if (selectedColumn.length % 2 == 0){
            return selectedColumn[even]
        }
        else{
            return selectedColumn[odd]
        }
    }
    else{ return selectedColumn[0]}

}
