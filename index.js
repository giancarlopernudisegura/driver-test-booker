const puppeteer = require('puppeteer')
const { argv } = require('yargs')
const user = require('./user.json')
const info = require('./info.json')

const url = 'https://scheduler.itialb4dmv.com/schAlberta'
const shortTimeout = 500
const longTimeout = 5000

const logger = (msg) => {
    if (argv.v || argv.verbose) console.log(msg + '...')
}

const run = async (location) => {
    const broswer = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })

    const page = await broswer.newPage()

    await page.goto(url, { waitUntil: 'networkidle0' })


    // Book an appointment
    await page.click('a#btnBookAppt')
    
    // Buy a road test
    await page.click('button#invalidPermit', {
        visible: true
    })

    // Fill out Driver Information
    logger('Filling out driver information')
    await page.type('[name=FirstName]', user.firstname)
    await page.type('[name=LastName]', user.lastname)
    await page.type('[name=MVID]', user.mvid)
    await page.type('[name=Birthdate]', user.birth)
    await page.type('[name=Email]', user.email)
    await page.click('input[type=checkbox]')
    await page.waitForTimeout(shortTimeout)
    await page.click('[type=submit]')
    await page.waitForNavigation({ timeout: 0 })

    // Fill out Eligibility Criteria
    logger('Filling out eligibility criteria')
    await page.waitForSelector('select')
    await page.select('select#serviceGroupList', info.tests[user.search.test])
    await page.waitForTimeout(shortTimeout)
    await page.click('[type=checkbox]')
    await page.waitForTimeout(shortTimeout)
    await page.click('[type=submit]')
    await page.waitForNavigation({ timeout: 0 })

    // Find a location
    logger(`Looking for available tests in ${location}`)
    await page.type('[name=CityName]', location)
    await page.select('select#citySearchRadius', user.search.radius)
    await page.waitForTimeout(shortTimeout)
    await page.click('button#searchSelectedLocation')
    await page.waitForNavigation({ timeout: 0 })

    // Search results
    logger('Processing response')
    await page.waitForTimeout(longTimeout)
    await page.screenshot({ path: 'result.png' })
    const content = await page.content()
    const testFound = content.indexOf(info.nothing) === -1

    await broswer.close()

    console.log(`${location} (${user.search.radius}km): ${testFound}`)

    if (testFound) {
        // implement notification
    } else {
        process.exit(128)
    }
}

if (argv._.length === 0) {
    console.error('Error: Location argument missing')
    process.exit(1)
} else if (!info.radii.includes(user.search.radius)) {
    console.error(`Error: Radius ${user.search.radius} not in [${info.radii}]`)
    process.exit(1)
} else {
    for (loc of argv._) {
        if (!info.locations.includes(loc)) {
            console.error(`Error: Location '${loc}' not in list of options`)
            process.exit(1)
        } else {
            run(loc)
        }
    }
}