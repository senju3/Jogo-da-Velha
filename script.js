const celulas = document.querySelectorAll(".square");
const jogadorX = "X";
const jogadorO = "O";
let checkTurn = true;
const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
/******************************função de captar o click certo***********************/
document.addEventListener("click", (event) => {
    //preciso que ele leia apenas click dentro dos squares
    if(event.target.matches(".square")) {
        play(event.target.id);
    }
    
})

/*************************************função para jogar e turno*****************/
function play (id) {
    const celula = document.getElementById(id)
    //lógica para o turno
    turn = checkTurn ? jogadorX : jogadorO;
    celula.textContent = turn;
    //criar uma class para cada jogada pra poder verificar a combinação de jogadados e saber se a sequencia pertence ao msm jogador e como parâmetro eu passo o jogador do turno
    celula.classList.add(turn)
    checkIfHaveWinner(turn)
};

/***********************************função para verificar se tem vencendor ou empate ou continuar partida**********/
function checkIfHaveWinner (turn) {
    const winner = combinations.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turn)
        })
    });
    if(winner){
        finishGame(turn)
    } else if (checkIThereIsTie ()){
        finishGame();
    } else {
        //lógica para altera os turnos/passar
        checkTurn = !checkTurn
    }
}
/****************************************função que vai encerrar o jogo**********************/
//em casos que os parâmetros podem vir com o valor ou sem, então eu jogo na função dessa forma parâmetro = null, ou seja, se tiver parâmetro ele vai receber e se vier sem parâmetro ela vai ser null
function finishGame (winner = null) {
    const darkScreen = document.getElementById("dark-screen")
    const h2 = document.createElement("h2")
    const h3 = document.createElement("h3")
    let message = null;

    darkScreen.style.display = "block";
    darkScreen.appendChild(h2)
    darkScreen.appendChild(h3)

    if(winner) {
        h2.innerHTML = `The player ${winner} won`
    } else {
        h2.innerHTML = "Tie";
    }

    let counter = 3
    setInterval(() => {
        h3.innerHTML = `Restarting in ${counter--}`
    }, 1000);

    setTimeout(() => location.reload(), 4000);

}
/*************************************função de empate**************************************/
function checkIThereIsTie () {
    let x = 0;
    let o = 0;

    for (index in celulas) {
        //usei esse if(!isNaN...) pois tava dando problema na leitura dos dados, possivelmente por conta do id 
        if(!isNaN(index)) {
            if(celulas[index].classList.contains(jogadorX)) {
                x++;
            }
    
            if(celulas[index].classList.contains(jogadorO)) {
                o++;
            }
        }
        
    }

    return x + o === 9 ? true : false;
}