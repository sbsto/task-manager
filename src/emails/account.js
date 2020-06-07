const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendEmail = async (msg) => {
    try {
        await sgMail.send(msg)
    } catch (e) {
        console.log('error:', e)
    }
}

const sendWelcomeEmail = (email, name) => {
    sendEmail({
        to: email,
        from: 'sbrownrock@gmail.com',
        subject: 'Thanks for signing up.',
        text: `Welcome to the app, ${name}`
    })
}

const sendCancelEmail = (email, name) => {
    sendEmail({
        to: email,
        from: 'sbrownrock@gmail.com',
        subject: "We're sorry to see you go :(",
        text: `We're sorry you're leaving us? What could we have done better?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}