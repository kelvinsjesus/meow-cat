const formForgotPassword = document.getElementById('forgot-password');
const inputEmail = document.getElementById('email');
const formResponse = document.getElementById('form-response');

formForgotPassword.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = inputEmail.value.trim();
    
    if (email.length > 0 && email.indexOf('@') > -1) {
        fetch('/api/users/forgot-password/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
            })
        }).then(function (resposta) {
            if(resposta.ok) {
                console.log("ok")
                resposta.json().then((emailLink) => {
                    formForgotPassword.innerHTML = `
                        <div id="form-response">
                            <span class="success" style="padding: 1rem; font-size: 20px">Email enviado para ${email}, cheque sua caixa de mensagens<i class="ri-checkbox-circle-line"></i></span>
                        </div
                    `;
                    setTimeout(() => {
                        window.open(emailLink);
                    }, 1000)
                });
            } else {
                console.log("não ok");
                console.log(resposta);
                formResponse.innerHTML = `<span class="danger">Email não existe na base de dados!</span>`;
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            formResponse.innerHTML = `Desculpe ouve um erro ao enviar o email para redefinição de senha sua senha !`;
        });
    } else {
        formResponse.innerHTML = `<span class="danger">Informe um email válido !</span>`;
    }
});