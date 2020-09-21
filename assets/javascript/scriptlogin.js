function verificarLogin(){
    var usuario = {email: "", password: ""};
    usuario.email = document.querySelector(".email").value;
    usuario.password = document.querySelector(".senha").value;
    if(usuario.email === "" || usuario.password === ""){
        alert("Preencha todos os campos!");
    }
}