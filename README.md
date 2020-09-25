# Alberta Driver's Test Booker
[![Node Version](https://img.shields.io/node/v/puppeteer)](https://nodejs.org/en/download/)

# Installation
```sh
git clone https://github.com/giancarlopernudisegura/driver-test-booker.git
npm i
```

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