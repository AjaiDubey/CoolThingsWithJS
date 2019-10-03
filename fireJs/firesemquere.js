const fireArray = [];
const fireWidth = 40;
const fireHeight = 40;
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];

const pr = document.getElementById("root");

function start(){
    createStructure();
    createFire();
    renderFire();
    //calcFirePropagation();
    setInterval(calcFirePropagation, 50);
    console.log(fireArray)
}

function createStructure(){
    //const numPixels = fireWidth * fireHeight;

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
            if(fireHeight-1>0){
                var decay = Math.floor(Math.random() * 4)
                var rand = fireArray[i+1][j+1] - decay;
                if(rand>=0){
                    if(j+1>0){
                        
                        fireArray[i][fireHeight - (j+1)] = rand;
                    }else{

                        fireArray[i][j] = rand;
                    }
                }else{
                    fireArray[i][j] = 0;
                }
            }
        }
        renderFire();
    }
}
function renderFire(){
    let html = '<table cellpadding=0 cellspacing=0>';
    for(let i = 0; i < fireHeight; i++){
        html += '<tr>';
        for(let j = 0; j < fireWidth; j++){
            html += '<td style="background-color:rgb('+ fireColorsPalette[fireArray[i][j]].r+','+ fireColorsPalette[fireArray[i][j]].g + ','+fireColorsPalette[fireArray[i][j]].b+')">';
            html += '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    //console.log(html)
    //var create = document.createElement(html);

    pr.innerHTML = html;
}
function createFire(){
    for(let j = 0; j < fireWidth; j++){
        fireArray[fireHeight-1][j] = 36;
    }
}

start();