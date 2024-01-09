let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let pointForO = document.querySelector("#point-for-O");
let pointForX = document.querySelector("#point-for-X");
let resetLeaderboard = document.querySelector("#reset-leaderboard");
let headerLeaderboard = document.querySelector("#header-leaderboard");


let turnO = true;   //playerX,playerO
let count = 0;      //To track Draw
let pointForOVal = 0;   //for leaderboard
let pointForXVal = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    headerLeaderboard.classList.remove("hide");
    resetBtn.classList.remove("hide");
}
const resetGameByResetLeaderbaord = () => {
    resetGame();
    pointForO.innerHTML = 0;
    pointForOVal = 0;
    pointForXVal = 0;
    pointForX.innerHTML = 0;
    resetLeaderboard.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){ //playerO
            box.innerText = "O";
            box.style.color = "#b0314e";
            turnO = false;
        }else{
            box.innerText = "X";
            box.style.color = "rgb(3, 151, 102)";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a draw!!";
    msg.style.color = "#ffc508";
    msgContainer.classList.remove("hide");
    headerLeaderboard.classList.add("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.removeAttribute("style", "background-color");
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    headerLeaderboard.classList.add("hide");
    resetBtn.classList.add("hide");
    resetLeaderboard.classList.remove("hide");
    
    disableBoxes();
    if(winner === "O"){
        pointForOVal++;
        pointForO.innerHTML = pointForOVal;
    }else{
        pointForXVal++;
        pointForX.innerHTML = pointForXVal;
    }
}
let q;

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
    
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                boxes[pattern[0]].setAttribute("style", "background-color:#ffffc7");
                boxes[pattern[1]].setAttribute("style", "background-color:#ffffc7");
                boxes[pattern[2]].setAttribute("style", "background-color:#ffffc7");
                return true;
            }
        }
    }
}
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
resetLeaderboard.addEventListener("click", resetGameByResetLeaderbaord);