var containerExibicao = document.querySelector(".exibicao-quizz");
var numeroPerguntas = 0;
var contadorPerguntasExibidas = 0;
var conjuntoPerguntas = [];

function entrarNoQuizz(qualQuizz){
    var paginaListagem = document.querySelector(".listagem-quizzes");
    var paginaExibicao = document.querySelector(".exibicao-quizz");
    paginaListagem.style.display = "none";
    paginaExibicao.style.display = "block";
    buscarNaLista(qualQuizz)
}

function buscarNaLista(idQuizz){
    var objetoQuizz;
    for(var i = 0; i < listaQuizzes.length; i++){
        if(listaQuizzes[i].id === idQuizz){
            objetoQuizz = listaQuizzes[i];
        }
    }
    conjuntoPerguntas = objetoQuizz.data.perguntas;
    renderizarNomeQuizz(objetoQuizz.title);
    organizarPerguntas();
}

function renderizarNomeQuizz(nomeQuizz){
    var h1 = containerExibicao.querySelector("h1");
    h1.innerText = nomeQuizz;
}

function organizarPerguntas(){
    if(numeroPerguntas === 0  && conjuntoPerguntas.length > 0){
        if(conjuntoPerguntas[0].tituloPergunta !== ""){
            renderizarPerguntaERespostas(conjuntoPerguntas[0]);
        }
        numeroPerguntas = conjuntoPerguntas.length;
        contadorPerguntasExibidas++;
    }else if(conjuntoPerguntas.length > Exibidas){
        if(conjuntoPerguntas[contadorPerguntasExibidas].tituloPergunta !== ""){
            renderizarPerguntaERespostas(conjuntoPerguntas[contadorPerguntasExibidas]);
        }
    }else{
        numeroPerguntas = 0;
        contadorPerguntasExibidas = 0;
    }
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
