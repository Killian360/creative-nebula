const express = require('express')
const bodyParser = require('body-parser')

const mailer = require('./mailer')

const app = express()

// serve the react app files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.send('Server is working. Please post at "/contact" to submit a message.')
})

app.post('/api/contact', (req, res) => {
  const { email = "", subject = "", message = "" } = req.body
  mailer({ email, subject, text: message }).then(() => {
    return res.json({"validate": "true"});
  }).catch((error) => {
    return res.json({"validate": "false"});
  })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
})
