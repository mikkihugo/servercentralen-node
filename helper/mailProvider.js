/* eslint-disable max-len */
require('dotenv').config();

const domain = 'Mg.servercentralen.net';
const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain });
const logger = require('./logger');

const techSupportEmail = 'ServerCentralen <technical@Mg.servercentralen.net>';

module.exports = {
  sendWelcomeEmail: ({ name, email }) => {
    const emailTemplate = `
      Dear, ${name}, <br /><br />

      Thanks you for signing up woth ServerCentralen! We hope you enjoy your time with us.<br />
      Check your account and update your profile.<br /><br />
      If you have any questions, just reply to this email--we are always happy to help out.<br /><br />

      Cheers,<br />
      Technology Support Team
    `;

    const emailContent = {
      from: techSupportEmail,
      to: email,
      subject: 'Welcome',
      html: emailTemplate,
    };

    mailgun.messages().send(emailContent, (err, body) => {
      if (err) {
        logger.error({
          func: 'POST /api/registration',
          message: 'Send welcome email',
          err,
        });
      }

      if (body) {
        logger.info({
          func: 'POST /api/registration',
          message: body,
        });
      }
    });
  },

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
      from: techSupportEmail,
      to: email,
      subject: 'Reset Password',
      html: emailTemplate,
    };

    await mailgun.messages().send(emailContent);
  },
};
