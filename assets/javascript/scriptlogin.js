var identificadorUsuario;

function verificarLogin(){
    var usuario = {email: "", password: ""};
    usuario.email = document.querySelector(".email").value;
    usuario.password = document.querySelector(".senha").value;
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
    identificadorUsuario = resposta.data;
}

function loginFalha(resposta){
    alert("Usuário ou senha incorreta. Tente novamente.");
    document.querySelector(".senha").value = "";
}