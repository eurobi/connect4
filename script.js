var boardData = [
    ["1","2","3","4","5","6","7"],
    ["8","9","10","11","12","13","14"],
    ["15","16","17","18","19","20","21"],
    ["22","23","24","25","26","27","28"],
    ["29","30","31","32","33","34","35"],
    ["36","37","38","39","40","41","42"],
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
            testBoard.childNodes[z].childNodes[x].textContent = boardData[z][x];

        }
    }
}

function createPlayers(){
    var valid = false;
    while(valid == false){
        var players = 2
        if(players > 0 && players < 3){
            valid = true;
            return ["Player 1","Player 2"]
        }
    }
    
}

function getSelection(){
    var selection = document.querySelector('input[name="column"]:checked').value;
    return selection;
}

function turn(players, boardData, columnSelection){
    console.log(columnSelection)
    for(i = 5; i >= 0; i--){
        if(boardData[i][columnSelection] > 0){
            boardData[i][columnSelection] = "king";
            break;
        }
    }

}

function newGame(){
    var playing = true;
    const players = createPlayers();
    currentPlayer = players[1]
    btn = document.getElementById("submit-button")
    btn.addEventListener('click', function(e){
        columnSelection = getSelection()
        turn(players, boardData, columnSelection);
        showNewBoard(boardData);
    })
    //checkWin()
    //checkFullBoard()
}

newGame()