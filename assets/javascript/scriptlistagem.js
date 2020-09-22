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
    console.log(listaQuizzes);
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
    novoQuizz.innerHTML = "<p>Novo Quizz</p><ion-icon name='add-circle' onclick = 'criacaoQuizzes()'></ion-icon>"
    containerQuizzes.appendChild(novoQuizz);
    for(var i = 0; i < listaQuizzes.length; i++){
        var quizzExistente = document.createElement("li");
        quizzExistente.classList.add("quizz");
        quizzExistente.setAttribute("id", listaQuizzes[i].id);
        quizzExistente.innerHTML = " <p>" + listaQuizzes[i].title +"</p>"
        containerQuizzes.appendChild(quizzExistente);
    }
}