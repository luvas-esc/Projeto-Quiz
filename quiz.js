import { plantaQuestao } from "./horta.js";



// Pega o arquivo JSON com as questões
let docQuestoes = await fetch("questoes_etec/questoes_etec.json");

// Converte o arquivo JSON em um objeto JavaScript
let dados = await docQuestoes.json();
let listaQuestoes =  dados.questoes;
let areaConhecimentoElement = document.getElementById("areaConhecimento");


// Variáveis globais
let qtdQuestoes = 0;
let qtdAcertos = 0;
let qtdErros = 0;
let questao = 0;
let botaoQuestao = document.createElement("button");



// Define os elementos do HTML que serão atualizados com as informações das questões
const fonteElement = document.getElementById("fontePergunta");
const idElement = document.getElementById("id_pergunta");
const perguntaElement = document.getElementById("enunciadoPergunta");

const imagemElement = document.getElementById("imagem");

const alternativa1Element = document.getElementById("alternativa1");
const alternativa2Element = document.getElementById("alternativa2");
const alternativa3Element = document.getElementById("alternativa3");
const alternativa4Element = document.getElementById("alternativa4");
const alternativa5Element = document.getElementById("alternativa5");

const acertosElement = document.getElementById("acertos");
const respondidasElement = document.getElementById("respondidas");

const containerProximaQuestao = document.getElementById("botaoProxima");


// Função para exibir a questão atual. Colocando os valores de dados do JSON nos 
// elementos HTML correspondentes.
function exibirQuestao(questao){

    let questaoAtual = listaQuestoes[questao];

    let fonte = questaoAtual.fonte;
    fonteElement.innerHTML = fonte;

    let id = questaoAtual.id;
    idElement.innerHTML = ("Id:"+id);

    let enunciado = questaoAtual.enunciado;
    perguntaElement.innerHTML = enunciado;

    let imagemAtual = questaoAtual.imagem;

    if (imagemAtual) {
    imagemElement.src = imagemAtual;
    imagemElement.style.display = "block";
} else {
    imagemElement.style.display = "none";
}

    let alternativas = questaoAtual.alternativas;
    alternativa1Element.innerHTML = alternativas.A;
    alternativa2Element.innerHTML = alternativas.B;
    alternativa3Element.innerHTML = alternativas.C;
    alternativa4Element.innerHTML = alternativas.D;
    alternativa5Element.innerHTML = alternativas.E;    

    alternativa1Element.onclick = function() { verificarResposta('A', this) };
    alternativa1Element.style.backgroundColor = "";
    alternativa2Element.onclick = function() { verificarResposta('B', this) };
    alternativa2Element.style.backgroundColor = "";
    alternativa3Element.onclick = function() { verificarResposta('C', this) };
    alternativa3Element.style.backgroundColor = "";
    alternativa4Element.onclick = function() { verificarResposta('D', this) };
    alternativa4Element.style.backgroundColor = "";
    alternativa5Element.onclick = function() { verificarResposta('E', this) };
    alternativa5Element.style.backgroundColor = "";

    gerenciadorListaQuestoes(id);
    
};


// Verifica se a alternativa selecionada é a correta. Se for, muda a cor de fundo da 
// alternativa para verde, se for errada, muda para vermelho e mostra a certa.
function verificarResposta(alternativaSelecionada, botao){
    

    if (containerProximaQuestao.querySelector("button") == null) {
        
        let questaoAtual = listaQuestoes[questao];
        let respostaCorreta = questaoAtual.resposta;

        qtdQuestoes++;

        if (alternativaSelecionada === respostaCorreta) {
            plantaQuestao();
            qtdAcertos++;
            botao.style.backgroundColor = "#6ae068";
        }

        else {
            botao.style.backgroundColor = "red";

            qtdErros++;

            // Confere qual botão corresponde a alternativa correta
            let botaoCorreto;

            if (respostaCorreta === 'A') {
                botaoCorreto = alternativa1Element;
            } else if (respostaCorreta === 'B') {
                botaoCorreto = alternativa2Element;
            } else if (respostaCorreta === 'C') {
                botaoCorreto = alternativa3Element;
            } else if (respostaCorreta === 'D') {
                botaoCorreto = alternativa4Element;
            } else if (respostaCorreta === 'E') {
                botaoCorreto = alternativa5Element;
            }

            botaoCorreto.style.backgroundColor = "#6ae068";
        }

    respondidasElement.textContent = "Questões Respondidas: " + qtdQuestoes;
    acertosElement.textContent = "Quantidade de Acertos: " + qtdAcertos;
    }
    
    botaoProximaQuestao();
}


// Muda a lista de questões pelo tema. 
areaConhecimentoElement.onchange = function(){
    if (areaConhecimentoElement.value === "Todos"){
    listaQuestoes = dados.questoes;
    }

    else{
    listaQuestoes = dados.questoes.filter(function(questao){
        
        return questao.tema === areaConhecimentoElement.value;});
    }
    exibirQuestao(0)
    questao = 0
    containerProximaQuestao.removeChild(botaoQuestao)


};

// Retira a questão respondida da lista
function gerenciadorListaQuestoes(idQuestao){
    listaQuestoes = listaQuestoes.filter(function(questao){
        return questao.id !== idQuestao;})

    console.log(listaQuestoes)
};

// Sorteia a questão
function sorteadorQuestao(){
  questao = Math.floor(Math.random() * listaQuestoes.length);
  console.log(questao);
};



// Exibe o botão de ir para a próxima questão caso ele não esteja disponível ainda. 
function botaoProximaQuestao(){    

    if (containerProximaQuestao.querySelector("button") == null) {

        botaoQuestao = document.createElement("button")

        botaoQuestao.textContent = "Próxima Questão"; 
        botaoQuestao.style.margin = "5px";
        botaoQuestao.onclick = function() {
            sorteadorQuestao();
            exibirQuestao(questao); 
            containerProximaQuestao.removeChild(botaoQuestao);
        }
    
    containerProximaQuestao.appendChild(botaoQuestao);

    }
}

function quizLoop(){
    
    exibirQuestao(0);
}

quizLoop();

