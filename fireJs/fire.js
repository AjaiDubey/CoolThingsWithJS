const fireArray = [];
const fireWidth = 80;
const fireHeight = 60;
const fireColorsPalette = {
    0:[{"r":7,"g":7,"b":7},{"r":7,"g":7,"b":31},{"r":7,"g":15,"b":47},{"r":7,"g":15,"b":71},{"r":7,"g":23,"b":87},{"r":7,"g":31,"b":103},{"r":7,"g":31,"b":119},{"r":7,"g":39,"b":143},{"r":7,"g":47,"b":159},{"r":7,"g":63,"b":175},{"r":7,"g":71,"b":191},{"r":7,"g":71,"b":199},{"r":7,"g":79,"b":223},{"r":7,"g":87,"b":223},{"r":7,"g":87,"b":223},{"r":7,"g":95,"b":215},{"r":7,"g":95,"b":215},{"r":15,"g":103,"b":215},{"r":15,"g":111,"b":207},{"r":15,"g":119,"b":207},{"r":15,"g":127,"b":207},{"r":23,"g":135,"b":207},{"r":23,"g":135,"b":199},{"r":23,"g":143,"b":199},{"r":31,"g":151,"b":199},{"r":31,"g":159,"b":191},{"r":31,"g":159,"b":191},{"r":39,"g":167,"b":191},{"r":39,"g":167,"b":191},{"r":47,"g":175,"b":191},{"r":47,"g":175,"b":183},{"r":47,"g":183,"b":183},{"r":55,"g":183,"b":183},{"r":111,"g":207,"b":207},{"r":159,"g":223,"b":223},{"r":199,"g":239,"b":239},{"r":255,"g":255,"b":255}],

    1:[{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}],

    2:[{"r":7,"g":7,"b":7},{"r":7,"g":31,"b":7},{"r":15,"g":47,"b":7},{"r":15,"g":71,"b":7},{"r":23,"g":87,"b":7},{"r":31,"g":103,"b":7},{"r":31,"g":119,"b":7},{"r":39,"g":143,"b":7},{"r":47,"g":159,"b":7},{"r":63,"g":175,"b":7},{"r":71,"g":191,"b":7},{"r":71,"g":199,"b":7},{"r":79,"g":223,"b":7},{"r":87,"g":223,"b":7},{"r":87,"g":223,"b":7},{"r":95,"g":215,"b":7},{"r":135,"g":215,"b":7},{"r":103,"g":215,"b":15},{"r":111,"g":207,"b":15},{"r":119,"g":207,"b":15},{"r":127,"g":207,"b":15},{"r":135,"g":207,"b":23},{"r":135,"g":199,"b":23},{"r":143,"g":199,"b":23},{"r":151,"g":199,"b":31},{"r":159,"g":191,"b":31},{"r":159,"g":191,"b":31},{"r":167,"g":191,"b":39},{"r":167,"g":191,"b":39},{"r":175,"g":191,"b":47},{"r":175,"g":183,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}],
};
var intens = 3;
var wing = 0;
var color = 1;

const pr = document.getElementById("root");

function start(){
    createStructure();
    createFire();
    renderFire();

    setInterval(calcFirePropagation, 50);
}

function createStructure(){
    for(let i=0; i< fireHeight; i++){
        fireArray[i] = []
        for(let j =0; j< fireWidth; j++){
            fireArray[i][j] = 0;
        }
    }
}
function calcFirePropagation(){
    for(let i=0; i < fireHeight; i++){
        for(let j =0; j < fireWidth; j++){
            if(i+1<fireHeight){
                var decay = Math.floor(Math.random() * intens);
                if(wing==0){
                    var rand = fireArray[i+1][j] - decay; 
                }
                if(wing==1){
                    if(j-1>fireHeight){
                        var rand = fireArray[i+1][j-fireHeight] - decay;
                    }else{
                        var rand = fireArray[i+1][j+1] - decay;     
                    }
                }
                if(wing==2){
                    if(j-1<0){
                        var rand = fireArray[i+1][fireHeight-j] - decay;
                    }else{
                        var rand = fireArray[i+1][j-1] - decay;     
                    }
                }
                if(rand>=0){
                    fireArray[i][j] = rand;
                }else{
                    fireArray[i][j] = 0;
                }
            }
        }
    }
    renderFire();
}
function renderFire(){
    let html = '<table cellpadding=0 cellspacing=0>';
    for(let i = 0; i < fireHeight; i++){
        html += '<tr>';
        for(let j = 0; j < fireWidth; j++){
            html += '<td style="background-color:rgb('+ fireColorsPalette[color][fireArray[i][j]].r+','+ fireColorsPalette[color][fireArray[i][j]].g + ','+fireColorsPalette[color][fireArray[i][j]].b+')">';
            html += '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';


    pr.innerHTML = html;
}
function intensity(type){
    if(type == '+'){
        if(intens>2){
            intens--;
        }
    }
    if(type == '-'){
        if(intens<5){
            intens++;
        }
    }
}
function wingChange(type){
    if(type == '>'){
        wing = 2;
    }
    if(type == '|'){
        wing = 0;
    }
    if(type == '<'){
        wing = 1;
    }
}
function colorChange(type){
    if(type == 'red'){
        color = 1;
    }
    if(type == 'green'){
        color = 2;
    }
    if(type == 'blue'){
        color = 0;
    }
}
function createFire(){
    for(let j = 0; j < fireWidth; j++){
        fireArray[fireHeight-1][j] = 36;
    }
}

start();