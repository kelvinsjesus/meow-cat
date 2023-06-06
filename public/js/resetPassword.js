const formResetPassword = document.getElementById('resetPassword');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');

formResetPassword.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get('token');

    // console.log(token)

    if(newPassword.value == confirmPassword.value) {
        fetch(`/users/password-reset/${token}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newPassword: newPassword.value,
            })
        }).then(function (resposta) {
            if(resposta.ok) {
                console.log("ok")
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
    } else {
        console.log('senhas estao diferentes')
    }
})