
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");
let x = 0;
let y = 0;
const tamanhoCelula = 50;
const margem = 20;

function desenharGrid(tamanhoCelula, corLinha){
    const largura = 200;
    const altura = 500;

    ctx.strokeStyle = corLinha;

    ctx.lineWidth = 1;

    ctx.translate(0.5, 0.5);
    

    // Desenha linhas verticais
    for (let x = 0; x <= largura; x += tamanhoCelula){
        ctx.beginPath();
        ctx.moveTo(margem + x, margem);
        ctx.lineTo(margem + x, margem + altura);
        ctx.stroke();
    };


    // Desenha linhas horizontais
    for (let y = 0; y <= altura; y += tamanhoCelula){
        ctx.beginPath();
        ctx.moveTo(margem, margem + y);
        ctx.lineTo(margem + largura, margem + y);
        ctx.stroke();
    };

    ctx.translate(-0.5, -0.5);

    ctx.strokeRect(margem, margem, largura, altura)

    let imgTerra = new Image();
    imgTerra.src = "assets/terraFundo.png";

    imgTerra.onload = function() {
        ctx.drawImage(imgTerra, 0, 0);
    };

};

function desenharEntidade(coluna, linha){

    const x = margem + coluna * tamanhoCelula;
    const y = margem + linha * tamanhoCelula;

    //ctx.font = "16 monospace";
    //ctx.fillStyle = "black";
    //ctx.textAlign = "center";
    //ctx.textBaseline = "middle";
    //ctx.fillText(caractere, x, y);

    let imgSemente = new Image();
    imgSemente.src = "assets/semente.png";

    imgSemente.onload = function() {
        ctx.drawImage(imgSemente, x, y, tamanhoCelula, tamanhoCelula);
};
};


export function plantaQuestao(){
    if (x>3){
        y++;
        x = 0;
    }
    console.log(x);
    desenharEntidade(x, y);
    x++;

};

desenharGrid(tamanhoCelula, "#000000");