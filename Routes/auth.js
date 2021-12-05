const nodemailer = require ('nodemailer');


let transporter= nodemailer.createTransport({
    service: 'gmail',
    
    auth: {
        user: 'dunesairlines@gmail.com',
        pass: 'SEIT2.0!',
      },
})


// // email content
let mailOptions={
  from:'dunesairlines@gmail.com',
  to:"aya_saleh2@yahoo.com",
  subject:'Booking Cancelation',
  text:'hello',
  html:'<p> Your flight reservation has been cancelled upon ypur request.The amount will be refunded to your bank account</p>',
};

// using transporter to send the email
transporter.sendMail(mailOptions,function(err,data){
    if(err){
        console.log('Error Occurs',err);
    }
    else{
        console.log('Email sent');
    }
})
