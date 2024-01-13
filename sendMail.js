const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");
const readline = require('readline');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.USER,// sender email
    pass: process.env.APP_PASSWORD,// app password from gmail  address
  },
});

const mailOptions = {
  from: {
    name: 'Codezy',
    address: process.env.USER
  }, // sender address
  to: [process.env.RECEIVER_MAILID], // list of receivers
  subject: "Sent Email using Nodemailer and gmail", // Subject line
  text: "This mail is generated automatically using script", // plain text body
  html: "<b>This mail is generated automatically using script</b>", // html body
  attachments: [
    {
      filename: 'git.pdf',
      path: path.join(__dirname,'git.pdf'),
      contentType: 'application/pdf'
    },
    {
      filename: 'sample.jpeg',
      path: path.join(__dirname,'sample.jpeg'),
      contentType: 'application/jpeg'
    },

  ]
};


const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email has been sent');
  } catch (error) {
    console.error(error);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// // Specify the number of times you want to send the email
rl.question('Enter the NoOfTimes: ', (answer) => {
  // Execute sendMail multiple times
  for (let i = 0; i < answer; i++) {
    sendMail(transporter, mailOptions);
  };
  console.log('You entered:', answer);
  rl.close();
});

//Or just uncmt below code
//sendMail(transporter, mailOptions);