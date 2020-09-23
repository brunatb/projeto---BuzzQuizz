var contadorPerguntas = 1;
var contadorNivel = 1;
var necessarioCorrecao = 0;

var quizz = {title:"", data: {
    perguntas:[],
    niveis: []}
};

function maisPergunta(){
    contadorPerguntas++;
    var containerPerguntas = document.querySelector(".container-perguntas");
    var novaPergunta = document.createElement("div");
    novaPergunta.classList.add("informacao-pergunta");
    renderizarPerguntas(containerPerguntas, novaPergunta);
}

function maisNivel(){
    contadorNivel++;
    var containerNiveis = document.querySelector(".container-niveis");
    var novoNivel =  document.createElement("div");
    novoNivel.classList.add("informacao-niveis");
    renderizarNivel(containerNiveis, novoNivel);
}

function pegarQuizzes(){
    var todasPerguntas = document.querySelectorAll(".informacao-pergunta");
    var todosNiveis = document.querySelectorAll(".informacao-niveis");

    var tituloQuizz = document.querySelector(".titulo-quizz").value;
    tituloQuizz = tituloQuizz.trim();
    tituloQuizz = primeiraLetraMaiuscula(tituloQuizz);
    quizz.title = tituloQuizz;

    pegarRespostas(todasPerguntas);
    if(necessarioCorrecao === 0){
        pegarNiveis(todosNiveis);
    }
    console.log(quizz);
}

function pegarRespostas(todasPerguntas){
    for(var i = 0; i < todasPerguntas.length; i++){
        var estruturaPerguntas = {tituloPergunta: "", respostas: [], respostaCerta: ""};

        var pergunta = todasPerguntas[i].querySelector(".pergunta").value; 
        pergunta = pergunta.trim();
        pergunta = primeiraLetraMaiuscula(pergunta);
        var ultimoIndicePergunta = pergunta.length - 1;
        var indiceInterrogacao = pergunta.indexOf('?');

        if(indiceInterrogacao === -1 || indiceInterrogacao < ultimoIndicePergunta){
            alert("Corrija a " + todasPerguntas[i].querySelector("p").innerText);
            necessarioCorrecao = 1;
            quizz = {title:"", data: {
                perguntas:[],
                niveis: []}
            };
            return;
        }

        estruturaPerguntas.tituloPergunta = pergunta;

        var respostasEssaPergunta = todasPerguntas[i].querySelectorAll(".resposta");
        var imagensEssaPergunta = todasPerguntas[i].querySelectorAll(".imagem");

        for(var j = 0; j < 4; j++){
            var estruturaRespostas = {texto:"", imagem:""};

            respostasEssaPergunta[j].value = respostasEssaPergunta[j].value.trim()
            respostasEssaPergunta[j].value = primeiraLetraMaiuscula(respostasEssaPergunta[j].value);
            estruturaRespostas.texto = respostasEssaPergunta[j].value;

            imagensEssaPergunta[j].value = imagensEssaPergunta[j].value.trim();
            estruturaRespostas.imagem = imagensEssaPergunta[j].value;

            estruturaPerguntas.respostas.push(estruturaRespostas);
        }
        estruturaPerguntas.respostaCerta = respostasEssaPergunta[0].value;
        quizz.data.perguntas.push(estruturaPerguntas);
    }
    necessarioCorrecao = 0;
}

function pegarNiveis(todosNiveis){
    for(var i = 0; i < todosNiveis.length; i++){

        var estruturaNiveis = {min:"", max:"",tituloNivel:"",linkImagem:"",descricao:""};

        estruturaNiveis.min = todosNiveis[i].querySelector(".minimo").value;
        estruturaNiveis.min = estruturaNiveis.min.trim();

        estruturaNiveis.max = todosNiveis[i].querySelector(".maximo").value;
        estruturaNiveis.max = estruturaNiveis.max.trim();

        estruturaNiveis.tituloNivel = todosNiveis[i].querySelector(".titulo-nivel").value;
        estruturaNiveis.tituloNivel = estruturaNiveis.tituloNivel.trim();
        estruturaNiveis.tituloNivel = primeiraLetraMaiuscula(estruturaNiveis.tituloNivel);

        estruturaNiveis.linkImagem = todosNiveis[i].querySelector(".imagem-nivel").value;
        estruturaNiveis.linkImagem = estruturaNiveis.linkImagem.trim();

        estruturaNiveis.descricao = todosNiveis[i].querySelector(".descricao-nivel").value;
        estruturaNiveis.descricao = estruturaNiveis.descricao.trim();
        estruturaNiveis.descricao = primeiraLetraMaiuscula(estruturaNiveis.descricao);

        quizz.data.niveis.push(estruturaNiveis);
    }    
}

function primeiraLetraMaiuscula(string){
    return ((string.charAt(0)).toUpperCase() + string.slice(1));
}

function renderizarPerguntas(containerPerguntas, novaPergunta){
    novaPergunta.innerHTML = "<p>Pergunta " + contadorPerguntas + "</p>";
    novaPergunta.innerHTML += '<input type="text" placeholder="Digite a pergunta" class="pergunta">';
    novaPergunta.innerHTML += '<div class="conjunto-resposta-imagem"><input type="text" placeholder="Digite a resposta correta"  class="resposta correta"><input type="text" placeholder="Link para imagem correta" class="imagem correta"></div>';
    novaPergunta.innerHTML += '<div class="conjunto-resposta-imagem"><input type="text" placeholder="Digite uma resposta errada 1" class="resposta"><input type="text" placeholder="Link para a imagem errada 1" class="imagem"></div>';
    novaPergunta.innerHTML += '<div class="conjunto-resposta-imagem"><input type="text" placeholder="Digite uma resposta errada 2" class="resposta"><input type="text" placeholder="Link para a imagem errada 2" class="imagem"></div>';
    novaPergunta.innerHTML += '<div class="conjunto-resposta-imagem"><input type="text" placeholder="Digite uma resposta errada 3" class="resposta"><input type="text" placeholder="Link para a imagem errada 3" class="imagem"></div>';
    containerPerguntas.appendChild(novaPergunta);
}

function renderizarNivel(containerNiveis, novoNivel){
    novoNivel.innerHTML = '<p>Nivel ' + contadorNivel + '</p>';
    novoNivel.innerHTML += '<div class="acertos"><input type="text" placeholder="% Mínima de acerto do nível" class="minimo"><input type="text" placeholder="% Máxima de acerto do nível" class="maximo"></div>';
    novoNivel.innerHTML += '<input type="text" placeholder="Título do nível" class="titulo-nivel">';
    novoNivel.innerHTML += '<input type="text" placeholder="Link da imagem do nível" class="imagem-nivel">';
    novoNivel.innerHTML += '<textarea placeholder="Descrição do nível" class="descricao-nivel"></textarea>';
    containerNiveis.appendChild(novoNivel);
}
