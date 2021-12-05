const nodemailer = require('nodemailer');

exports.sendMail = (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: 'dunesairlines@gmail.com',
            pass: 'SEIT2.0!',
        },
    })


    // // email content


    // using transporter to send the email
    transporter.sendMail(req.body, function (err, data) {
        if (err) {
            console.log('Error Occurs', err);
            res.send(err);
        }
        else {
            console.log('Email sent');
            res.send('Email Send');
        }
    })

}
