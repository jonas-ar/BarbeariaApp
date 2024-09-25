const nodemailer = require('nodemailer');

// Função para enviar o e-mail
const sendEmail = async (recipient, subject, message) => {
  try {
    // Configuração do transportador (usando Gmail como exemplo)
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Você pode mudar para outro serviço como o SMTP do seu provedor de e-mail
      auth: {
        user: 'seuemail@gmail.com', // Seu e-mail
        pass: 'suasenha' // Sua senha ou App password se estiver usando autenticação de dois fatores
      }
    });

    // Configuração do e-mail que será enviado
    let mailOptions = {
      from: '"Barbearia" <seuemail@gmail.com>', // Remetente
      to: recipient, // Destinatário
      subject: subject, // Assunto
      text: message, // Texto do e-mail
      html: `<p>${message}</p>` // Formato HTML do e-mail
    };

    // Enviar e-mail
    let info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};

module.exports = sendEmail;
