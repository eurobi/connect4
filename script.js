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
    console.log("making new board")
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
                else if(r > 3 && c < 4 && currentIndex == boardData[r-1][c+1] && currentIndex == boardData[r-2][c+2] && currentIndex == boardData[r-3][c+3]){
                    winner = true;
                    return winner;
                }
                
            }

        }
    }
}

function newGame(){
    var boardData = [
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
    ]
    var playing = true;
    const players = createPlayers();
    currentPlayer = players[0]
    btn = document.getElementById("submit-button")
    btn.addEventListener('click', function(e){
        columnSelection = getSelection()
        turn(currentPlayer, boardData, columnSelection);
        showNewBoard(boardData);
        winner = checkWin(boardData);
        if(winner == true){
            playing = false
            showNewBoard(boardData);
            document.getElementById('player-turn').textContent = `Winner: ${currentPlayer}!`
            btn.style.display = "none"
            
        }
        //checkFullBoard()
        else{currentPlayer = changePlayer(players, currentPlayer)};
    
    })

}

newGame()