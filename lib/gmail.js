const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "buetian89",
    pass: process.env.BUETIAN_APP_PASSWORD,
  },
});

export const sendViaGmail = async (to, subject, html, attachments) => {
  var mailOptions = {
    from: '"Burtian 89 NA" <buetian89@gmail.com>',
    to: to,
    subject: subject,
    html: html,
    ...(attachments && {
      attachments: attachments,
    }),
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
