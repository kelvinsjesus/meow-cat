const formRegister = document.getElementById('register');
const inputFullName = document.getElementById('full-name');
const inputUsername = document.getElementById('username');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputConfirmPassword = document.getElementById('confirm-password');
const formResponse = document.getElementById('form-response');

const messagesError = {
    nameError: {
        empty: 'Por favor, insira o seu nome'
    },
    usernameError: {
        empty: 'Por favor, insira o seu nome de usuário',
        nospace: 'Nome de usuário não pode conter espaços',
        alreadyExists: 'Nome de usuário já está sendo usado, tente outro'
    },
    emailError: {
        empty: 'Por favor, insira um email',
        invalid: 'Por favor, insira um email válido'
    },
    passwordError: {
        empty: 'Por favor, insira uma senha válida',
        insufficientLength: 'Insira uma senha de pelo menos 8 caracteres',
        notMatch: 'Senhas não coincidem'
    }
}

formRegister.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = inputFullName.value.trim();
    const username = inputUsername.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();
    const confirmPassword = inputConfirmPassword.value.trim();

    if (fullName.length < 1) {
        displayError('Informe seu nome');

    } else if (username.length < 1 || username.indexOf(' ') > -1) {
        displayError('Informe seu nome de usuário. Sem espaços!');

    } else if (email.length < 1 && email.indexOf('@') == -1) {
        displayError('Informe um email válido !');
    } else if (password.length < 8) {
        displayError('A senha deve ter no mínimo 8 caracteres');

    } else if (password !== confirmPassword) {
        displayError('As senhas não coincidem');

    } else {
        fetch('/api/users/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nameServer: fullName,
                usernameServer: username,
                emailServer: email,
                passwordServer: password,
                confirmPasswordServer: confirmPassword
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta)
                formRegister.innerHTML = `
                    <div id="form-response">
                        <span class="success" style="padding: 1rem 0; font-size: 20px">Cadastro realizado com sucesso <i class="ri-checkbox-circle-line"></i></span>
                        <a href="login.html" class="to-login">Fazer Login</a>
                    </div
                `;
            } else {
                resposta.text().then((error) => {
                    formResponse.innerHTML = `
                        <span class="danger" style="padding: 1rem 0; font-size: 20px">${error} <i class="ri-close-circle-line"></i></span>
                    `;
                })
            }
        }).catch(function (error) {
            console.log(`#ERRO: ${error}`);

        });
    }
})

function displayError(message) {
    const spanMessage = `<span class="danger">${message}</span>`
    console.log(spanMessage)

    formResponse.innerHTML = spanMessage;
}
