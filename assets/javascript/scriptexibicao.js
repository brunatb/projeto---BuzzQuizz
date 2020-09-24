var containerExibicao = document.querySelector(".exibicao-quizz");
var numeroPerguntas = 0;
var contadorPerguntasExibidas = 0;
var conjuntoPerguntas = [];
var quantidadeAcertos = 0;
var perguntasQuizz = document.querySelector(".perguntas-quizz");
var objetoQuizz;

function entrarNoQuizz(qualQuizz){
    var paginaListagem = document.querySelector(".listagem-quizzes");
    var paginaExibicao = document.querySelector(".exibicao-quizz");
    paginaListagem.style.display = "none";
    paginaExibicao.style.display = "block";
    buscarNaLista(qualQuizz);
}

function buscarNaLista(idQuizz){
    for(var i = 0; i < listaQuizzes.length; i++){
        if(listaQuizzes[i].id == idQuizz){
            objetoQuizz = listaQuizzes[i];
        }
    }
    conjuntoPerguntas = objetoQuizz.data.perguntas;
    organizarPerguntas();
}

function renderizarNomeQuizz(nomeQuizz){
    var h1 = containerExibicao.querySelector("h1");
    h1.innerText = nomeQuizz;
}

function organizarPerguntas(){
    perguntasQuizz.innerHTML = '<h1></h1><h2></h2><div class="linha1"></div><div class="linha2"></div>'
    renderizarNomeQuizz(objetoQuizz.title);
    if(numeroPerguntas === 0  && conjuntoPerguntas.length > 0){
        if(conjuntoPerguntas[0].tituloPergunta !== ""){
            renderizarPerguntaERespostas(conjuntoPerguntas[0]);
        }
        numeroPerguntas = conjuntoPerguntas.length;
        contadorPerguntasExibidas++;
    }else if(conjuntoPerguntas.length > contadorPerguntasExibidas){
        if(conjuntoPerguntas[contadorPerguntasExibidas].tituloPergunta !== ""){
            renderizarPerguntaERespostas(conjuntoPerguntas[contadorPerguntasExibidas]);
            contadorPerguntasExibidas++;
        }
    }else{
        numeroPerguntas = 0;
        contadorPerguntasExibidas = 0;
    }
}

function escolheuResposta(elemento){
    if(elemento.classList.contains("acerto")){
        quantidadeAcertos++;
    }
    var mudarCorFundo = document.querySelectorAll(".campo-resposta");
    for(var i = 0; i < mudarCorFundo.length; i++){
        if(mudarCorFundo[i].classList.contains("acerto")){
            mudarCorFundo[i].style.background ="#DAFFD9";
        }else if(mudarCorFundo[i].classList.contains("erro")){
            mudarCorFundo[i].style.background ="#FFD9D9";
        }
    }
    setTimeout(organizarPerguntas, 2000);
}


function renderizarPerguntaERespostas(perguntaAtual){
    var conjuntoRespostas = perguntaAtual.respostas;
    var tituloPerguntaAtual = containerExibicao.querySelector("h2");
    var linhaDeCima = containerExibicao.querySelector(".linha1");
    var linhaDeBaixo = containerExibicao.querySelector(".linha2");
    tituloPerguntaAtual.innerText = perguntaAtual.tituloPergunta;
    conjuntoRespostas.sort(randOrd);
    for(var i = 0; i < 4; i++){
        if(i < 2){
            renderizarConjuntoResposta(linhaDeCima, conjuntoRespostas[i], perguntaAtual);
        }
        else{
            renderizarConjuntoResposta(linhaDeBaixo, conjuntoRespostas[i], perguntaAtual);
        }
    }

}

function renderizarConjuntoResposta(pai, conjuntoResposta, perguntaAtual){
    var div = document.createElement("div");
    div.classList.add("campo-resposta");
    div.setAttribute("onclick","escolheuResposta(this)");
    if(conjuntoResposta.texto === perguntaAtual.respostaCerta){
        div.classList.add("acerto");
    }else{
        div.classList.add("erro");
    }
    var imagemResposta = document.createElement("img");
    imagemResposta.setAttribute("src", conjuntoResposta.imagem);
    var textoResposta = document.createElement("p");
    textoResposta.innerText = conjuntoResposta.texto;
    div.appendChild(imagemResposta);
    div.appendChild(textoResposta);
    pai.appendChild(div);

}

function randOrd() {
    return (Math.round(Math.random())-0.5);
}
