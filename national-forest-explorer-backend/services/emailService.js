const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendInvitationEmail = (to, itinerary) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'You are invited to join an itinerary',
        text: `You have been invited to join the itinerary: ${itinerary.name} from ${itinerary.startDate} to ${itinerary.endDate}.`,
        html: `<p>You have been invited to join the itinerary: <strong>${itinerary.name}</strong> from <strong>${itinerary.startDate}</strong> to <strong>${itinerary.endDate}</strong>.</p>`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendInvitationEmail };
