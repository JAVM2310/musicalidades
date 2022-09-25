const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:"musicalidadesgrupo6@gmail.com",
        pass:'dadpmmcemgqkxmld',
    },
    tls:{
        rejectUnauthorized: false
    },
})

module.exports = {
    enviarMail: (mailDestino, token) =>{
        let mailOptions = {
            from: "musicalidadesgrupo6@gmail.com",
            to: mailDestino,
            subject: "Restablecer contraseña",
            text: `Hemos recibido un pedido para restablecer tu contraseña, si no fuiste tu, ignora este mail. \n Haz click en este enlace para restablecer tu contraseña: \n http://localhost:3001/restablecerPassword/${token}`,
        }
        
        transporter.sendMail(mailOptions, (err, success)=>{
            if (err){
                console.log(err);
            } else {
                console.log(`mail enviado a ${mailDestino}`);
            }
        })
    }
}