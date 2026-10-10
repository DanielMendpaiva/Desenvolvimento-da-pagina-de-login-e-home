//efeito do botão voltar ao Topo

//Validação de Login

//Ativar alert no botão cadastrar
function topo() {
    window.scrollTo({
        top: 0,
        left:0,
        behavior: 'smooth'
        }
    );
}

function login(){
    var logado = 0;
    var usuario = document.getElementById("usuario").value; 
    var senha = document.getElementById("senha").value; 
    if(usuario == "admin" && senha == "admin"){
        window.location.href = "index.html";
        logado = 1;
    }
    if(logado == 0){
        alert("Usuário ou senha incorretos!");
    }    
}

function cadastro(){
    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html";
}
