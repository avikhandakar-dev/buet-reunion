import handlers from "handlebars";
import { InvoiceTemplate } from "template/Invoice";

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  // running locally.
  puppeteer = require("puppeteer");
}

export default async (req, res) => {
  if (req.method === "POST") {
    const { donation, date } = req.body;
    if (!donation) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid data!",
      });
    }
    const donorName = donation.donorInfo?.name || "-";
    const donorEmail = donation.donorInfo?.email || "-";
    const amount = donation.amount || 0;
    const id = donation.id;
    const paymentMethod = donation.paymentMethod || "-";
    const projectTitle = donation.projectInfo?.projectTitle || "-";
    try {
      const template = handlers.compile(InvoiceTemplate);
      const html = template({
        id,
        donorName,
        date,
        donorEmail,
        projectTitle,
        amount,
        paymentMethod,
      });
      const browser = await puppeteer.launch({
        args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      const pdf = await page.pdf({ format: "A4" });
      await browser.close();
      res.statusCode = 200;
      res.send(pdf);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Something went wrong!",
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
