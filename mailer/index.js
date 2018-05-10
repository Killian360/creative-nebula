const nodemailer = require('nodemailer')
const config = require('./config')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user : 'jeremy.charras@gmail.com',
    refreshToken : '1/ja_V2HDI5o43eQzYBCk51hIYyKoNM29ByERt-VmojU0',
    accessToken : 'ya29.GlurBWm4gX215ckkcTLLWGgYj1oljmP20iZ4I1GFj_HYUYPBY1qX0f9fGMIy408gbxHgcEtyCSsHHrRhdwzm6mYe5aa9VGpnowyGvbqSegW7vRqdmNiFHtHGfGfy',
    clientId: '618302501082-equ7i8gfapftdnnbq1vpnmcfglq378ga.apps.googleusercontent.com',
    clientSecret :'B1iC8H8GuZipiy1EAPslrXZ9'
  }
});

const send = ({ email, subject, text }) => {
  const from = subject && email ? `${subject} <${email}>` : `${subject || email}`
  const message = {
    from,
    to: 'jeremy.charras@gmail.com',
    subject: `[${subject}] ${email} HeadInTheClouds`,
    text,
    replyTo: from
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

export default send
