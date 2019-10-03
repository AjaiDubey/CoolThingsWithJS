const PlayerArray = [];
const tableWidth = 91;
const tableHeight = 71;
const ColorsPalette = [{"r":7,"g":7,"b":7},{"r":255,"g":7,"b":7},{"r":7,"g":7,"b":255}];
var interval;
var player1 = {};
var player2 = {};
var player1wins = 0;
var player2wins = 0;


const pr = document.getElementById("root");

function start(){
    player1 = {
        position: {
            y: 30,
            x: 10
        },
        dir: 1,
    }
    player2 = {
        position: {
            y: 30,
            x: tableWidth - 10
        },
        dir: 0,
    };
    createStructure();
    createPlayers();

    render();
    interval = setInterval(movePlayers, 50);

    //console.log(PlayerArray)
}
function endGame(player){
    clearInterval(interval);
    if(player==3){
        Swal.fire({
            title: 'Empate',
            text: player1wins + ' Vermelho x Azul ' + player2wins,
            width: 600,
            padding: '3em',
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                center left
                no-repeat
            `,
            showCancelButton: true,
            confirmButtonText: 'Jogar novamente',
            cancelButtonText: 'Fechar',
            preConfirm: () => start()
        })

    }else{
        if(player==1)player1wins++;
        if(player==2)player2wins++;
        Swal.fire({
            title: 'Jogador '+ player + ' venceu',
            text: player1wins + ' Vermelho x Azul ' + player2wins,
            width: 600,
            padding: '3em',
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                center left
                no-repeat
            `,
            showCancelButton: true,
            confirmButtonText: 'Jogar novamente',
            cancelButtonText: 'Fechar',
            preConfirm: () => start()
        })
    }
}

function createStructure(){
    for(let i=0; i< tableHeight; i++){
        PlayerArray[i] = []
        for(let j =0; j< tableWidth; j++){
            PlayerArray[i][j] = 0;
        }
    }
}
function movePlayers(){
    if(player1.dir==1)// 1 = direita
        player1.position.x++;
    if(player2.dir==1)
        player2.position.x++;
    if(player2.dir==0) //0== esquerda
        player2.position.x--;
    if(player1.dir==0)
        player1.position.x--;
    
    if(player1.dir==2) //2 baixo
        player1.position.y++;
    if(player2.dir==2)
        player2.position.y++;
    if(player2.dir==3) //3 cima
        player2.position.y--;
    if(player1.dir==3)
        player1.position.y--;

    var cont = 0;
    if(player1.position.y > tableHeight || player1.position.y < 0 || player1.position.x > tableWidth || player1.position.x < 0 || PlayerArray[player1.position.y][player1.position.x]!=0){
        cont=2;
    }else{
        PlayerArray[player1.position.y][player1.position.x] = 1;
    }
    if(player2.position.y > tableHeight || player2.position.y < 0 || player2.position.x > tableWidth || player2.position.x < 0 || PlayerArray[player2.position.y][player2.position.x]!=0){
        if(cont == 2)
            cont = 3;
        else
            cont = 1;
    }else{
        PlayerArray[player2.position.y][player2.position.x] = 2;
    }
    if(cont>0){
        endGame(cont);
    }
    render();
}

function render(){
    let html = '<table cellpadding=0 cellspacing=0>';
    for(let i = 0; i < tableHeight; i++){
        html += '<tr>';
        for(let j = 0; j < tableWidth; j++){
            html += '<td style="background-color:rgb('+ ColorsPalette[PlayerArray[i][j]].r+','+ ColorsPalette[PlayerArray[i][j]].g + ','+ColorsPalette[PlayerArray[i][j]].b+')">';
            html += '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';

    pr.innerHTML = html;
}
function createPlayers(){
    PlayerArray[player1.position.y][player1.position.x] = 1;
    PlayerArray[player2.position.y][player2.position.x] = 2;
}
function controles(e, event){
    switch(e.keyCode){//pega o movimento
        case 38:
            if(player2.dir!=2){
                player2.dir = 3;
            } //seta pra cima
            e.preventDefault();
            break;
        case 39:
            if(player2.dir!=0){
                player2.dir = 1;
            } //direita
            e.preventDefault();
            break;
        case 40:
            if(player2.dir!=3){
                player2.dir = 2;
            } //baixo
            e.preventDefault();
            break;
        case 37:
            if(player2.dir!=1){
                player2.dir = 0;
            } //esquerda
            e.preventDefault();
            break;
        case 87:
            if(player1.dir!=2){
                player1.dir = 3;
            } //seta pra cima
            e.preventDefault();
            break;
        case 68:
            if(player1.dir!=0){
                player1.dir = 1;
            } //direita
            e.preventDefault();
            break;
        case 83:
            if(player1.dir!=3){
                player1.dir = 2;
            } //baixo
            e.preventDefault();
            break;
        case 65:
            if(player1.dir!=1){
                player1.dir = 0;
            } //esquerda
            e.preventDefault();
            break;
    }
}

document.onkeydown = controles;
start();