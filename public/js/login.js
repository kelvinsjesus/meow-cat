const formLogin = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email.value,
            passwordServer: password.value
        })
    }).then(function (resposta) {
        if(resposta.ok) {
            console.log("ok")
            console.log(resposta)
        } else {
            console.log("não ok");
            console.log(resposta);
            resposta.text().then(texto => {
                console.error(texto);
            })
        }
    }).catch((error) => {
        console.log(`Erro: ${error}`);
    });
})