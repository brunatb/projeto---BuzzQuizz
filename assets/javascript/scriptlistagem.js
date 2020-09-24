var containerQuizzes = document.querySelector(".container-quizzes");
var listaQuizzes;

function buscarQuizzes(){
    var token = {
        headers: {'User-Token': identificadorUsuario}
    };
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes', token);
    requisicao.then(extrairQuizzes).catch(erroCarregarQuizzes);

}

function extrairQuizzes(resposta){
    listaQuizzes = resposta.data;
    console.log(resposta.data);
    renderizarQuizzes();
}

function erroCarregarQuizzes(resposta){
    window.location.reload();
}

function renderizarQuizzes(){
    containerQuizzes.innerHTML = "";
    var novoQuizz = document.createElement("li");
    novoQuizz.classList.add("novo");
    novoQuizz.classList.add("quizz");
    novoQuizz.innerHTML = "<p>Novo Quizz</p><ion-icon name='add-circle' onclick = 'telaCriacaoDeQuizzes()'></ion-icon>"
    containerQuizzes.appendChild(novoQuizz);
    for(var i = 0; i < listaQuizzes.length; i++){
        var quizzExistente = document.createElement("li");
        quizzExistente.classList.add("quizz");
        quizzExistente.setAttribute("id", listaQuizzes[i].id);
        quizzExistente.setAttribute("onclick","entrarNoQuizz(this.id)");
        quizzExistente.innerHTML = " <p>" + listaQuizzes[i].title +"</p>"
        containerQuizzes.appendChild(quizzExistente);
    }
} 

function telaCriacaoDeQuizzes(){
    var paginaListagem = document.querySelector(".listagem-quizzes");
    var paginaCriacao = document.querySelector(".criacao-quizzes");
    paginaListagem.style.display = "none";
    paginaCriacao.style.display = "block";
}