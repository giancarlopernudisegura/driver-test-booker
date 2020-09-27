require('dotenv').config()
const puppeteer = require('puppeteer')
const sms = require('./sms')
const { argv } = require('yargs')
const info = require('./info.json')

const url = 'https://scheduler.itialb4dmv.com/schAlberta'
const shortTimeout = 500
const longTimeout = 5000

const logger = (msg) => {
    if (argv.v || argv.verbose) console.log(msg + '...')
}

const run = async (locations) => {
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
    await page.type('[name=FirstName]', process.env.USER_FNAME)
    await page.type('[name=LastName]', process.env.USER_LNAME)
    await page.type('[name=MVID]', process.env.USER_MVID)
    await page.type('[name=Birthdate]', process.env.USER_BIRTH)
    await page.type('[name=Email]', process.env.USER_EMAIL)
    await page.click('input[type=checkbox]')
    await page.waitForTimeout(shortTimeout)
    await page.click('[type=submit]')
    await page.waitForNavigation({ timeout: 0 })

    // Fill out Eligibility Criteria
    logger('Filling out eligibility criteria')
    await page.waitForSelector('select')
    await page.select('select#serviceGroupList', info.tests[process.env.USER_TEST])
    await page.waitForTimeout(shortTimeout)
    await page.click('[type=checkbox]')
    await page.waitForTimeout(shortTimeout)
    await page.click('[type=submit]')
    await page.waitForNavigation({ timeout: 0 })

    let allFalse = true
    for (loc of locations) {
        // Find a location
        logger(`Looking for available tests in ${loc}`)
        await page.type('[name=CityName]', loc)
        await page.select('select#citySearchRadius', process.env.USER_RADIUS)
        await page.waitForTimeout(shortTimeout)
        await page.click('button#searchSelectedLocation')
        await page.waitForNavigation({ timeout: 0 })

        // Search results
        logger('Processing response')
        await page.waitForTimeout(longTimeout)
        await page.screenshot({ path: 'result.png' })
        const content = await page.content()
        const testFound = content.indexOf(info.nothing) === -1
        
        console.log(`${loc} (${process.env.USER_RADIUS}km): ${testFound}`)
        
        if (testFound) {
            sms(`Found a test for ${loc} within ${process.env.USER_RADIUS}. 🚙`)
            allFalse = false
        }

        await page.click('[value=BACK]')
    }

    await broswer.close()
    
    if (allFalse) process.exit(128)
}

if (argv._.length === 0) {
    console.error('Error: Location argument missing')
    process.exit(1)
} else if (!info.radii.includes(process.env.USER_RADIUS)) {
    console.error(`Error: Radius ${process.env.USER_RADIUS} not in [${info.radii}]`)
    process.exit(1)
} else {
    for (loc of argv._) {
        if (!info.locations.includes(loc)) {
            console.error(`Error: Location '${loc}' not in list of options`)
            process.exit(1)
        }
    }
}
run(argv._)