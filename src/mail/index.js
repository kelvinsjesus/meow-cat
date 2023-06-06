const nodemailer = require('nodemailer');
const smtp = require('./smtpConfig');

async function main(token, recipientEmail, recipientName) {
    const link = `localhost:3000/reset-password.html?token=${token}`;

    // criar uma conta de teste
    // let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        auth: {
            user: smtp.user,
            pass: smtp.pass
        }
    })

    let info = await transporter.sendMail({
        from: `Freestyle Project <${smtp.user}>`,
        to: [recipientEmail],
        subject: 'Redefinição de senha',
        text: `Olá ${recipientName}, recebemos um pedido para redefinição de senha, clique no link abaixo.`,
        html: `<a href="${link}">Redefinir a sua senha</a>`
    })

    console.log(info);
    console.log("Message sent: %s", info.messageId);
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    return nodemailer.getTestMessageUrl(info);
}

module.exports = {
    main,
}