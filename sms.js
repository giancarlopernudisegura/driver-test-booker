require('dotenv').config()
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSID, authToken, {
	lazyLoading: true
})

const sms = (msg) => {
	client.messages
		.create({
			to:	phone,
			from: process.env.TWILIO_PHONE,
			body: msg
		})
		.then(message => console.log(`SMS: ${message}`))
}

module.exports = sms