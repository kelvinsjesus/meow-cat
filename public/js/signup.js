const formRegister = document.getElementById('register');
const fullName = document.getElementById('fullName');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

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

function checkEmptyField(input) {
    let fieldValue = input.value.trim();

    if (fieldValue.length > 0) {
        return false
    } else {
        return true
    }
}

function suggestUsername(fullName) {
    let clean = fullName.replaceAll(' ', '_').toLowerCase();

    console.log(clean)
}
suggestUsername('Kelvin Santos de Jesus')

function validateEmail(email) {
    // todo email é composto por um usuário e um domínio,
    // user@domain.com
    // kelvin@gmail.com
    // ou seja o destinatário dos emails sera o kelvin
    // e o domínio é do gmail

    let atPosition = email.indexOf('@');
    let user = email.substring(0, atPosition);
    let domain = email.substring(atPosition + 1, email.length);

    // TODO
}

// let fieldEmail = String(email.value).trim();
// validateEmail(fieldEmail)
formRegister.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('/users/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nameServer: fullName.value,
            usernameServer: username.value,
            emailServer: email.value,
            passwordServer: password.value,
            confirmPasswordServer: confirmPassword.value
        })
    }).then(function (res) {
        console.log("resposta: ", res);
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
})