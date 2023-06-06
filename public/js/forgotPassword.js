const formForgotPassword = document.getElementById('forgotPassword');
const email = document.getElementById('email');
const password = document.getElementById('password');

formForgotPassword.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("EMAIL: " + email.value);

    fetch('/api/users/forgot-password/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email.value,
        })
    }).then(function (resposta) {
        if(resposta.ok) {
            console.log("ok")
            resposta.json().then((json) => {
                window.open(json)
            });
        } else {
            console.log("não ok");
            console.log(resposta);
            resposta.text().then(texto => {
                console.error(texto);
            })
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
})