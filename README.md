# Alberta Driver's Test Booker
[![Node Version](https://img.shields.io/node/v/puppeteer)](https://nodejs.org/en/download/)

# Installation
[Fork this repository](https://github.com/giancarlopernudisegura/driver-test-booker/fork) to use the integrated automation.

You'll need a twilio account to use the sms function.

# Configuration
All the configuration is done through environment variables.
You can create these in a `.env` file or add them to the repository as GitHub secrets.

| Key                  | Description                        | Format                              |
|----------------------|------------------------------------|-------------------------------------|
| `TWILIO_ACCOUNT_SID` | Twilio account string identifier   |                                     |
| `TWILIO_AUTH_TOKEN`  | Twilio authentication token        |                                     |
| `TWILIO_PHONE`       | Twilio phone number *not your own* | `+1xxxxxxxxx`                       |
| `USER_FNAME`         | First name                         |                                     |
| `USER_LNAME`         | Last name                          |                                     |
| `USER_MVID`          | MVID on your license               | `xxxxxxxxx`                         |
| `USER_DOB`           | Date of birth                      | `YYYY/MM/DD`                        |
| `USER_EMAIL`         | Email                              | `email@example.com`                 |
| `USER_PHONE`         | Phone number                       | `+1xxxxxxxxx`                       |
| `USER_TEST`          | Test number                        | Class X (Basic\|Advanced) Road Test |
| `USER_RADIUS`        | Search radius                      | 10 \| 25 \| 50 \| 100               |

Notice how the city location is not defined.
The city is passed as a string as an argument.
This is done to make it easy to script for different cities.

# Usage
```sh
node --unhandled-rejections=strict . <location>... [-v | --verbose]
```

## Example
```sh
node --unhandled-rejections=strict . "Edmonton" "Red Deer" "Leduc" "Ponoka" "Legal"
```

The progam will return `128` status code if no test were found.

If a test is found, it will execute a notification function which sends a text to your cellphone. You can also check a screenshot of the page as an artifact on the workflow.