var identificadorUsuario;

function verificarLogin(){
    var usuario = {email: "", password: ""};
    var desabilitado = document.querySelector(".entrar");
    usuario.email = document.querySelector(".email").value;
    usuario.password = document.querySelector(".senha").value;
    if(usuario.email === "" || usuario.password === ""){
        alert("Preencha todos os campos!");
    }else{
        desabilitado.removeAttribute("onclick");
        enviarUsuario(usuario);
    }
}

function enviarUsuario(usuario){
    var requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users', usuario);
    requisicao.then(loginSucesso).catch(loginFalha);
}

function loginSucesso(resposta){
    identificadorUsuario = resposta.data;
}

function loginFalha(resposta){
    var habilitado = document.querySelector(".entrar");
    alert("Usuário ou senha incorreta. Tente novamente.");
    document.querySelector(".senha").value = "";
    habilitado.setAttribute("onclick", "verificarLogin()");
}