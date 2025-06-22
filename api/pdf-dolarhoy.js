const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    await page.goto('https://dolarhoy.com/', { waitUntil: 'networkidle2' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="dolarhoy.pdf"');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    if (browser) await browser.close();
    res.status(500).send('Error al generar el PDF: ' + error.message);
  }
};
