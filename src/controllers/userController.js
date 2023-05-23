var userModel = require("../models/userModel");
var uid = require("../uniqueId");
var sendEmail = require('../mail');

var sessoes = [];

function test(req, res) {
    console.log("ENTRAMOS NA userController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listAll(req, res) {
    userModel.listAll()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function validateLogin(req, res) {
    var email = req.body.emailServer;
    var password = req.body.passwordServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (password == undefined) {
        res.status(400).send("Sua password está indefinida!");
    } else {
        userModel.login(email, password)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou password inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e password!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function validateRegister(req, res) {
        // base: 16 | maxChars: 12
    var id = uid.uniqueId(16, 12);
    var name = req.body.nameServer;
    var username = req.body.usernameServer;
    var email = req.body.emailServer;
    var password = req.body.passwordServer;
    var confirmPassword = req.body.confirmPasswordServer;
    
    // Faça as validações dos valores
    if (name == undefined) {
        res.status(400).send("Seu name está undefined!");
    } else if(username == undefined) {
        res.status(400).send("Seu nome de usuário está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (password == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if(confirmPassword == undefined) {
        res.status(400).send("Sua senha de confirmação está undefined!");
    } else {
        userModel.register(id, name, username, email, password)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function forgotPassword(req, res) {
    const email = req.body.emailServer;
    const token = uid.uniqueId(16, 64);

    userModel.userByEmail(email).then(function (result){
        if (result.length == 0) {
            res.status(403).send("Email não consta na base de dados");
        } else {
            let user = result[0];

            userModel.updateRecoveryToken(user.id, token)
            .then(function () {
                sendEmail.main(token, email, user.name)
                .then(function(emailPreview) {
                    res.status(200).json(emailPreview);
                });
            }).catch(function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
        }
    })
}

function resetPassword(req, res) {
    const recoveryToken = req.params.token;
    const newPassword = req.body.newPassword;

    userModel.userByToken(recoveryToken).then(function (result) {
        if (result.length == 0) {
            res.status(403).send("Token inválido");
        } else {
            let user = result[0];
            userModel.updatePassword(user.id, newPassword, recoveryToken).then(function() {
                
                // após a recuperação volta pro estado de null
                userModel.updateRecoveryToken(user.id, null);
                res.status(200).send('senha redefinida com sucesso')
            })
        }
    })
}

function findUsername(req, res) {
    let username = req.params.username;

    userModel.userByUsername(username)
        .then(function(result) {
            res.status(200).json(result);
        }).catch(function(erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    validateLogin,
    validateRegister,
    listAll,
    test,
    forgotPassword,
    resetPassword,
    findUsername
}