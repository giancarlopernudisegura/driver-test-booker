const { phone } = require('./user.json')
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
			from: '+12185161699',
			body: msg
		})
		.then(message => console.log(`SMS: ${message}`))
}

module.exports = sms