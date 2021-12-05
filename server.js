const nodemailer = require('nodemailer');
async function main(done) {

    var smtpConfig ={
     service: 'smtp.gmail.com',
    port: 587,
    secure: false,
    //ignoreTLS: true,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
        user: 'dunesairlines@gmail.com',
        pass: 'SEIT2.0!',
    },
    tls:{
        rejectUnAuthorized:false,
    }
    };
var mailTransporter = nodemailer.createTransport(smtpConfig);

let mailDetails = {
    from: 'dunesairlines@gmail.com',
    to: 'ayah.salehh2@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};
  
// mailTransporter.sendMail(mailDetails, function(err, data) {
//     if(err) {
//         console.log('Error Occurs',err);
//     } else {
//         console.log('Email sent successfully',data);
//     }
// });
let info = await mailTransporter.sendMail({
    from: 'dunesairlines@gmail.com',
    to: 'ayah.salehh2@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

mailTransporter.close();
main().catch(console.error);