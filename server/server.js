require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.json({ msg: 'Welcome' }));

app.post('/api/form', (req, res) => {
  let data = req.body;
  console.log('data :', data,process.env.GOOGLE_PASSWORD);
  let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: 'nijarr2020@gmail.com',
      pass: process.env.GOOGLE_PASSWORD,
    },
  });
  let mailOptions = {
    from: data.email,
    to: 'nijarr2020@gmail.com',
    subject: `Message from ${data.name}`,
    html: `
    <h1>Informations</h1>
    <ul>
      <li>Name: ${data.name}</li>
      <li>Lastname: ${data.lastname}</li>
      <li>Email: ${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    `,
  };
  smtpTransport.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('All works fine, congratz!');
    }
  });
  smtpTransport.sendMail(mailOptions, (error, res) => {
    if (error) {
      console.log('ERROR :', error);
    } else {
      res.send(`Email sent Succesfully ! ${res}`);
    }
  });

  smtpTransport.close();
  res.json({
    msg: mailOptions,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
