const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'subhadeepchowdhury41@gmail.com',
        pass: 'uxizuvoimuqeiykk'
    }
});

exports.sendMail = async (email, message, subject) => {
    var mailOptions = {
        from: 'subhadeepchwdhury41@gmail.com',
        to: 'scofficials2002@gmail.com',
        subject: subject,
        text: message
    }
    transpoter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent' + info.response);
        }
    });
}