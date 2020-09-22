var identificadorUsuario;

function verificarLogin(){
    var usuario = {email: "", password: ""};
    var desabilitado = document.querySelector(".entrar");
    usuario.email = document.querySelector(".email").value;
    usuario.password = document.querySelector(".senha").value;
    desabilitado.removeAttribute("onclick");
    if(usuario.email === "" || usuario.password === ""){
        alert("Preencha todos os campos!");
    }else{
        enviarUsuario(usuario);
    }
}

function enviarUsuario(usuario){
    var requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users', usuario);
    requisicao.then(loginSucesso).catch(loginFalha);
}

function loginSucesso(resposta){
    console.log(resposta);
    var paginaLogin = document.querySelector(".pagina-login");
    var paginaListagem = document.querySelector(".listagem-quizzes");
    identificadorUsuario = resposta.data.token;
    paginaLogin.style.display = "none";
    paginaListagem.style.display = "block";
    buscarQuizzes();
}

function loginFalha(resposta){
    console.log(resposta);
    var habilitado = document.querySelector(".entrar");
    alert("Usuário ou senha incorreta. Tente novamente.");
    document.querySelector(".senha").value = "";
    habilitado.setAttribute("onclick", "verificarLogin()");
}