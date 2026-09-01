
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");
let x = 0;
let y = 0;

function desenharGrid(tamanhoCelula, corLinha){
    const largura = canvas.width;
    const altura = canvas.height;

    ctx.strokeStyle = corLinha;

    ctx.lineWidth = 1;

    ctx.translate(0.5, 0.5);
    

    // Desenha linhas verticais
    for (let x = 0; x <= largura; x += tamanhoCelula){
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, altura);
        ctx.stroke();
    };


    // Desenha linhas horizontais
    for (let y = 0; y <= altura; y += tamanhoCelula){
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(largura, y);
        ctx.stroke();
    };

    ctx.translate(-0.5, -0.5);

    ctx.strokeRect(0, 0, largura, altura)

};

function desenharEntidade(coluna, linha, caractere){
    const tamanhoCelula = 50;

    const x = coluna * tamanhoCelula + tamanhoCelula / 2;
    const y = linha * tamanhoCelula + tamanhoCelula / 2;

    ctx.font = "16 monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(caractere, x, y);
};


export function plantaQuestao(){
    if (x>3){
        y++;
        x = 0;
    }
    console.log(x);
    desenharEntidade(x, y, "P");
    x++;

}

desenharGrid(50, "#000000");