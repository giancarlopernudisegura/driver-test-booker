# Alberta Driver's Test Booker
[![Node Version](https://img.shields.io/node/v/puppeteer)](https://nodejs.org/en/download/)

# Installation
[Fork this repository](https://github.com/giancarlopernudisegura/driver-test-booker/fork) to use the integrated automation.

You'll need a twilio account to use the sms function

## Enviroment Variables
You can create these in a `.env` file or add them to the repository secrets.

| Key                  | Description                      | Format                              | Needed for `.env` |
|----------------------|----------------------------------|-------------------------------------|-------------------|
| `TWILIO_ACCOUNT_SID` | Twilio account string identifier |                                     | true              |
| `TWILIO_AUTH_TOKEN`  | Twilio authentication token      |                                     | true              |
| `USER_FNAME`         | First name                       |                                     | false             |
| `USER_LNAME`         | Last name                        |                                     | false             |
| `USER_MVID`          | MVID on your license             | `xxxxxxxxx`                         | false             |
| `USER_DOB`           | Date of birth                    | `YYYY/MM/DD`                        | false             |
| `USER_EMAIL`         | Email                            | `email@example.com`                 | false             |
| `USER_PHONE`         | Phone number                     | `+1xxxxxxxxx`                       | false             |
| `USER_TEST`          | Test number                      | Class X (Basic\|Advanced) Road Test | false             |
| `USER_RADIUS`        | Search radius                    | 10 \| 25 \| 50 \| 100               | false             |

# Configuration
First, configure a user configuration called `user.json` based on the example file.
```sh
cp user.json.example user.json
```
Now replace the values with your own information.
The search object defines the search parameters.
Notice how the city location is not defined.
The city is passed as a string as an argument.
This is done to make it easy to script for different cities.

# Usage
```sh
node --unhandled-rejections=strict . [-v | --verbose] <location>...
```

```sh
# With multiple cities
node --unhandled-rejections=strict . "Edmonton" "Red Deer" "Leduc" "Ponoka" "Legal"
```

The progam will return `128` status code if no test were found.

If a test is found, it will execute a notification function.
*(not yet implemented)*