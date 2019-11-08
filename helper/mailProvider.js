/* eslint-disable max-len */
require('dotenv').config();
// const sgMail = require('@sendgrid/mail');
const domain = 'Mg.servercentralen.net';

const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain });

// sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// const sendGridEmail = (msg) => sgMail.send(msg);

module.exports = {
  sendResetPasswordLink: async ({
    email, name, link, token,
  }) => {
    const emailTemplate = `
      Dear, ${name}, <br /><br />

      You recently requested to reset your password for the account.<br /><br />
      Click <a href="http://${link}/reset/${token}">here</a> to reset it.<br /><br />
      If you did not request a password reset, please ignore this email or reply to let us know. The password reset is only valid for the next 30 minutes.<br /><br />
      Thanks,<br />
      Technology Support Team
    `;

    const emailContent = {
      from: 'ServerCentralen<technical@servercentralen.com>',
      to: email,
      subject: 'Reset Password',
      html: emailTemplate,
    };

    await mailgun.messages().send(emailContent);
  },
};
