const puppeteer = require('puppeteer')

const url = 'https://scheduler.itialb4dmv.com/schAlberta'

const run = async () => {
    const broswer = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })

    const page = await broswer.newPage()

    await page.goto(url, { waitUntil: 'networkidle0' })

    await page.screenshot({ path: 'example.png' })

    await broswer.close()
}

run()