const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', () => {
  resizeBy.send('welcome');
});

app.post('/api/form', (req, res) => {
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: 'nijarr2020@gmail.com',
      pass: '123',
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

  smtpTransport.sendMail(mailOptions, (error, res) => {
    if (error) {
      res.send(error);
    } else {
      res.send('Success');
    }
  });

  smtpTransport.close();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
