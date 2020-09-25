var containerExibicao = document.querySelector(".exibicao-quizz");
var numeroPerguntas = 0;
var contadorPerguntasExibidas = 0;
var conjuntoPerguntas = [];
var conjuntoNiveis = [];
var quantidadeAcertos = 0;
var perguntasQuizz = document.querySelector(".perguntas-quizz");
var objetoQuizz;
var nivelQuizz;

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
    conjuntoNiveis = objetoQuizz.data.niveis;
    organizarPerguntas();
}

function renderizarNomeQuizz(nomeQuizz){
    var h1 = perguntasQuizz.querySelector("h1");
    h1.innerText = nomeQuizz;
}

function organizarPerguntas(){
    perguntasQuizz.innerHTML = '<h1></h1><h2></h2><div class="linha1"></div><div class="linha2"></div>';
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
        perguntasQuizz.innerHTML = '<h1></h1><h2></h2>';
        renderizarNomeQuizz(objetoQuizz.title);
        tratarAcertos();
        numeroPerguntas = 0;
        contadorPerguntasExibidas = 0;
        quantidadeAcertos = 0;
    }
}

function escolheuResposta(elemento){
    if(elemento.classList.contains("acerto")){
        quantidadeAcertos++;
    }
    var mudarCorFundo = document.querySelectorAll(".campo-resposta");
    for(var i = 0; i < mudarCorFundo.length; i++){
        if(mudarCorFundo[i].classList.contains("acerto")){
            mudarCorFundo[i].style.background ="#efffdb";
        }else if(mudarCorFundo[i].classList.contains("erro")){
            mudarCorFundo[i].style.background ="#ffdedb";
        }
        mudarCorFundo[i].removeAttribute("onclick");
    }
    setTimeout(organizarPerguntas, 2000);
}

function tratarAcertos(){
    var porcentagem = (quantidadeAcertos/numeroPerguntas) * 100;
    porcentagem = Math.round(porcentagem);
    for(var i = 0; i < conjuntoNiveis.length; i++){
        var minimo = parseInt(conjuntoNiveis[i].min);
        var maximo = parseInt(conjuntoNiveis[i].max);
        if(((porcentagem > minimo && porcentagem <= maximo) || (minimo === 0 && minimo === porcentagem))){
            nivelQuizz = conjuntoNiveis[i];
        }
    }
    renderizarResultado(porcentagem);
}

function voltarExibicaoParaListagem(){
    var paginaListagem = document.querySelector(".listagem-quizzes");
    var paginaExibicao = document.querySelector(".exibicao-quizz");
    paginaExibicao.style.display = "none";
    paginaListagem.style.display = "block";
    perguntasQuizz.innerHTML = '<h1></h1><h2></h2><div class="linha1"></div><div class="linha2"></div>';
    containerExibicao.innerHTML = ' <header><p onclick="voltarExibicaoParaListagem()">BuzzQuizz</p></header><div class="perguntas-quizz"></div>'
    containerExibicao.appendChild(perguntasQuizz);
}

function renderizarPerguntaERespostas(perguntaAtual){
    var conjuntoRespostas = perguntaAtual.respostas;
    var tituloPerguntaAtual = perguntasQuizz.querySelector("h2");
    var linhaDeCima = perguntasQuizz.querySelector(".linha1");
    var linhaDeBaixo = perguntasQuizz.querySelector(".linha2");
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

function renderizarResultado(porcentagem){
    perguntasQuizz.querySelector("h1").innerText = objetoQuizz.title;
    perguntasQuizz.querySelector("h2").innerText = "Você acertou " + quantidadeAcertos + " de " + numeroPerguntas + " perguntas! Score: " +  porcentagem + "%";
    
    var containerNivel = document.createElement("div");
    containerNivel.classList.add("container-nivel");
    
    var divTexto = document.createElement("div");
    divTexto.classList.add("div-texto");
    
    var tituloNivel = document.createElement("p");
    tituloNivel.classList.add("titulo-nivel");
    tituloNivel.innerText = nivelQuizz.tituloNivel;
    
    var descricaoNivel = document.createElement("p");
    descricaoNivel.classList.add("descricao-nivel");
    descricaoNivel.innerText = nivelQuizz.descricao;
    
    var imagemNivel = document.createElement("div");
    imagemNivel.classList.add("imagem-nivel");
    imagemNivel.style.backgroundImage = "url(" + nivelQuizz.linkImagem + ")"; 

    divTexto.appendChild(tituloNivel);
    divTexto.appendChild(descricaoNivel);

    containerNivel.appendChild(divTexto);
    containerNivel.appendChild(imagemNivel);

    containerExibicao.appendChild(containerNivel);
}

function randOrd() {
    return (Math.round(Math.random())-0.5);
}
