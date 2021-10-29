import puppeteer from "puppeteer";
import handlers from "handlebars";
import { InvoiceTemplete } from "template/invoice";

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
      const template = handlers.compile(InvoiceTemplete);
      const html = template({
        id,
        donorName,
        date,
        donorEmail,
        projectTitle,
        amount,
        paymentMethod,
      });
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      const pdf = await page.pdf({ format: "A4" });
      await browser.close();
      res.statusCode = 200;
      res.send(pdf);
    } catch (error) {
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
