const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'deathdoctor4499@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the it.`
    })
}

const sendCancelationEmail = (email, name) => {
    console.log('dis')
    sgMail.send({
        to: email,
        from: 'deathdoctor4499@gmail.com',
        subject: 'Goodbye!',
        text: `Goodbye ${name}.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}