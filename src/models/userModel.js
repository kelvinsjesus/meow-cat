var database = require("../database/config")

function listAll() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listAll()");
    var instrucao = `
        SELECT * FROM User;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function login(email, password) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function login(): ", email, password)
    var instrucao = `
        SELECT * FROM User WHERE email = '${email}' AND password = '${password}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui.    Vá para a var instrucao
function register(id, name, username, email, password) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function register():", name, username, email, password);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO User (id, name, username, email, password) VALUES ('${id}', '${name}', '${username}', '${email}', '${password}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function userByEmail (email) {
	const statementSQL = `
        SELECT * FROM User WHERE email = '${email}';
    `

    console.log("Executando a instrução SQL: \n" + statementSQL);

    return database.executar(statementSQL);
}

function userByToken (token) {
	const statementSQL = `
        SELECT * FROM User WHERE recoveryToken = '${token}';
    `

    console.log("Executando a instrução SQL: \n" + statementSQL);

    return database.executar(statementSQL);
}

function userByUsername(username) {
	const statementSQL = `
        SELECT name, username, createdAt FROM User WHERE username = '${username}';
    `

    console.log("Executando a instrução SQL: \n" + statementSQL);

    return database.executar(statementSQL);
}

function updateRecoveryToken(id, newToken) {
    if (newToken === null) {
        var statementSQL = `
            UPDATE User set recoveryToken = ${newToken} WHERE id = '${id}'
        `;
    } else {
        var statementSQL = `
            UPDATE User set recoveryToken = '${newToken}' WHERE id = '${id}'
        `;
    }

    return database.executar(statementSQL);
}

function updatePassword(id, password, token) {
    if (token == undefined) {
        token = null;
    }

    if (token != null) {
        var statementSQL = `
            UPDATE User set password = '${password}' WHERE id = '${id}' AND recoveryToken = '${token}';
        `;
    } else {
        var statementSQL = `
            UPDATE User set password = '${password}' WHERE id = '${id}';
        `;
    }

    return database.executar(statementSQL);
}

module.exports = {
    login,
    register,
    listAll,
    userByEmail,
    userByToken,
    userByUsername,
    updatePassword,
    updateRecoveryToken
};