

const containerHorta = document.getElementById("hortaDOM");

let celulas = []
let x = 0;
let y = 0;
let tamanhoHorta = 2;
let plantasMaximo = tamanhoHorta*2;
let canteirosPlantados = 0;
let estagio = 0;
containerHorta.style.gridTemplateColumns = "repeat(" + tamanhoHorta + ", 50px)";


// cria cada uma das celulas
for (let x = 0; x < tamanhoHorta; x++){

    celulas[x] = [];

    for (let y = 0; y < tamanhoHorta; y++){

        let criarCelula = document.createElement("div");
        containerHorta.appendChild(criarCelula);
        celulas[x][y] = criarCelula;
    }
};

console.log(containerHorta)

// insere algo na celula
function inserirNaCelula(linha, coluna){

    let semente = document.createElement("img");
    semente.src = "assets/sementePlantada.png";
    let planta1 = document.createElement("img");
    planta1.src = "assets/planta1.png";


    if (estagio == 1){
        let imagemAtual = celulas[linha][coluna].querySelector("img");

        if (imagemAtual){
            imagemAtual.remove();
        }
            
            celulas[linha][coluna].appendChild(planta1);
    }
    else celulas[linha][coluna].appendChild(semente);

    



};

export function plantaQuest(){

    conferirEstagio();

    if (x>=tamanhoHorta){
        y++;
        x=0;
    }
    inserirNaCelula(y, x);


    x++;
};

function conferirEstagio(){
    if (canteirosPlantados == plantasMaximo){
        estagio++
        canteirosPlantados = 0
        x = 0;
        y = 0;
    }

    canteirosPlantados++
};